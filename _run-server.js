const http = require('http')
const url = require('url')
const path = require('path')
const fs = require('fs')
const fsProm = fs.promises
const serverImpl = require('./server.js')

const requestListener = function (req, res) {
  if (req.url.indexOf("/api")>=0){
    console.log("api")
    processApiReq(req,res)
  } else {
    console.log("static")
    processStatic(req,res)
  }
}


//serverova implementace databaze
let localStorage={}
// manage persistence - nahrat pri startu a ukladat pravidelne
const storageFile=process.env.STORAGE_FILE||"localStorage"
try {
    fs.readFileSync(storageFile)
    console.log(`nactena databaze ${storageFile}`)
} catch(err){
    console.log(`soubor s databazi nenalezen - zacinam s prazdnou`)
} 

setInterval(()=>{
    fs.writeFileSync(storageFile,JSON.stringify(localStorage,null, "  "))
    //console.log(`dtabaze ulozena ${storageFile}`)
}, 5000)


const dbServer = {
    VyzvSeznamKadernictvi: function () {
        var json = localStorage["SeznamKadernictvi"];
        if (json) {
            var SeznamKadernictvi = JSON.parse(json)
            return SeznamKadernictvi;
        }
        else {
            return {}
        }
    },

    UlozSeznamKadernictvi: function (SeznamKadernictvi) {
        localStorage["SeznamKadernictvi"] = JSON.stringify(SeznamKadernictvi, null, 4);
    }
}

serverImpl.OverrideDb(dbServer)


const server = http.createServer(requestListener);
server.listen(8080);
console.log("listening on 8080")


function processApiReq(req,res){
    const chunks=[]
    req.on("data",(chunk)=>chunks.push(chunk))
    req.on("end",()=>{
        const json = Buffer.concat(chunks).toString("utf-8")
        const command = JSON.parse(json)
        console.log(`command:`,command)
        //dynamicky provolam serverovou fungkci
        const result=serverImpl[command.name].apply(serverImpl,command.args)
        res.writeHead(200);
        res.end(JSON.stringify(result,null,"  "));
    })


}

async function processStatic(req,res){
    if (req.url.indexOf("..")>=0) throw new Error("invalid path")
    const resource = `${__dirname}${req.url}`
    console.log(`${resource}`)
    //res.headers['content-type']=
    try {
        try {
            const stat = await fsProm.stat(resource)
            if (stat.isDirectory) throw new Error("dir")
        }catch (err){
            res.writeHead("301",{"Location":"/index.html"})
            res.end()
            return    
        }
        const type=resolveType(resource)
        const rd=fs.createReadStream(resource)
        res.writeHead("200",{"content-type":type})
        rd.pipe(res)
    } catch (err){
        res.writeHead(500);
        res.end("Error");
        console.log("Error",err)
    } 
}

const typeMap=[
    {
        re: /\.js$/,
        type: "application/javascript"
    },
    {
        re: /\.html$/,
        type: "text/html"
    },
    {
        re: /\.png$/,
        type: "image/png"
    },
    {
        re: /\.ico$/,
        type: "image/icon"
    },
    {
        re: /\.jpg$/,
        type: "image/jpg"
    },
    {
        re: /\.css$/,
        type: "text/css"
    },

    
]
function resolveType(resource){
    for ( const t of typeMap){
        if (t.re.exec(resource)) return t.type
    }
    return "application/octet-stream"
}


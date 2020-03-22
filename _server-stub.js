var serverStub = {}

for(const key of Object.keys(server)){
    const itm = server[key]
    if (typeof(itm)=='function'){
        console.log(`found server function ${key}`)
        serverStub[key]=async function(...args){
            return await dynacall(key,args)
        }
    }
}

async function dynacall(name, args){
    console.log(`dynacall ${name}`)
    const call = {
        name: name,
        args: args
    }
    const wl=window.location
    const callUrl = `${wl.protocol}://${wl.host}/api`
    const resp = await fetch(
        callUrl,
        {
            method:"POST",
            body: JSON.stringify(call,null,"  ")
        })
    const resp = await resp.text()
    let retval 
    try {
        retval = JSON.parse(resp)
    } catch {
        console.log(`vracena hodnota nebyla spravne formatvana: ${resp}`)
    }
    return reval    
}
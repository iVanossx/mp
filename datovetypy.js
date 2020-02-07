class Zakaznik {
    id;             //jednoznačný identifikátor
    email;
    telCislo;
}

class Kadernik {
    id;             //jednoznačný identifikátor
    nazev;
    email;
    telCislo;
    poloha;         //poloha vyjádřená jako geohash např. http://geohash.gofreerange.com/
    adresa;         // textově adresa
    cena;
    heslo;
}

class Zarizeni {
    id;
    constructor(){
        this.id = String (Math.random()) + String (Math.random());
    }
    rezim;
    
    
}

class Server {


}

class DatabazeTelefon {
    //v každém telefonu existuje databáze
    VyzvZarizeni(){
        var json = localStorage["ZaznamZarizeni"];
        if (json){
            var zarizeni = Object.assign(new Zarizeni(), JSON.parse(json))
            return zarizeni;
        }
        else {
            var noveZarizeni =  new Zarizeni();
            this.UlozZarizeni(noveZarizeni);
            return noveZarizeni;
        }
    }

    UlozZarizeni(zarizeni){
        localStorage["ZaznamZarizeni"] = JSON.stringify(zarizeni, null, 4);
    }

}

class DatabazeServer {
    //na serveru existuje jedna databáze
    
}

function ZobrazHTML(html){
    document.querySelector("#obrazovka").innerHTML=html
}

function ObrazovkaRozhodnuti(){
    html = `
    <button onclick='zapniRezimKadernik()'>Jsem kadeřník</button>
    <button onclick='zapniRezimZakaznik()'>Jsem zákazník</button>
    `
    ZobrazHTML(html)    
}

function zapniRezimKadernik() {
    zarizeni.rezim = "kadernik"
    db.UlozZarizeni(zarizeni)
}

function zapniRezimZakaznik() {
    zarizeni.rezim = "zakaznik"
    db.UlozZarizeni(zarizeni)
}

//-----------------------------------------------------------------------------------------------------------------------------------
//spuštění aplikace kadeřníkem
//podívat se do databáze, jestli existují nějaké informace
const db = new DatabazeTelefon();
const zarizeni = db.VyzvZarizeni();
console.log(zarizeni);
if (zarizeni.rezim){
    if(zarizeni.rezim==="kadernik"){
        console.log("rezim kadenik")

    }
    else {
        console.log("rezim zakaznik")
        
    }
}
else{
    console.log("rezmi neurcen");
    ObrazovkaRozhodnuti();
}

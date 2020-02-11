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
    <button onclick='zpracujUdalost("zapniRezimZakaznik")'>Jsem kadeřník</button>
    <button onclick='zpracujUdalost("zapniRezimKadernik")'>Jsem zákazník</button>
    `
    ZobrazHTML(html)    
}

function zapniRezimKadernik() {
    const zarizeni = db.VyzvZarizeni();
    zarizeni.rezim = "kadernik"
    db.UlozZarizeni(zarizeni)
    console.log(zarizeni.rezim)
}

function zapniRezimZakaznik() {
    const zarizeni = db.VyzvZarizeni();
    zarizeni.rezim = "zakaznik"
    db.UlozZarizeni(zarizeni)
    console.log(zarizeni.rezim)
}

// jak pracuje aplikace v prohlizeci
// - trvale ulozeny stav v databazi zarizeni (pretrva mezi zavreni okna)
// - prubezny stav v promennych (nepretrva zavreni okna)
// - zobrazuje se obrazovka podle stavu 
// - do aplikace prichazeji podnety (udalosti) a na jejich zaklade se meni stav
// - udalosti je vsechno, co nejak ovlivnuje aplikaci
//     - spusteni aplikace
//     - operace uzivatele v uzivatelskem rozhrani (kliknuti apod.)
//     - zprava ze serveru
//     - specialni udalost smazaniIdentityZarizeni umozni simulovat vice ruznych uzivatelu i ruzneho typu
// - takze se aplikuje cyklus
//     - vyckej na udalost
//     - vezmi stav aplikace (z uloziste a aktualni)
//     - zpracuj udalost a vytvor novy stav aplikace
//     - zobraz uzivatelske rozhrani
//     - a znovu dokola
// Server
// - pomoci tridy server se simuluje centralni server

const db = new DatabazeTelefon();

function spusteniAplikace(){
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
}

// funkce, ktera zajistuje spravne rozdelovani zpracovani udalosti - rozcestnik
function zpracujUdalost(udalost){
    console.log(`Zpracovacam udalost ${udalost} jdu na to`);
    switch (udalost) {
        case "spusteniAplikace":
            spusteniAplikace();
            break;
        case "zapniRezimKadernik": 
            zapniRezimKadernik();
            break;
        case "zapniRezimZakaznik": 
            zapniRezimZakaznik();
            break;
        default:
            console.warn(`Neznama odalost ${udalost}`);
    }
}

//-----------------------------------------------------------------------------------------------------------------------------------
//spuštění aplikace

zpracujUdalost("spusteniAplikace")

// osoba = {
//    jmeno: "Vit",
//    prijmeni: "Rasekl",
//    vyska: 185,
//    zenaty: false,
//    vysvedceni: {
//        matematika: 3,
//        telocvik: 1 ,
//        ps: "N"
//    }
// }

// osoba.jmeno="ivanosss"


`
<h2>Zakazni</h2>
        <p>Email: ${zakaznik.email}</p>
        <h3>Historie</h3>
        sdfsdfsdfsdf<br>
        sdfsdfsdfsdfsd<br>

`
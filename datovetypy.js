/*
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

*/

function vytvorNoveZarizeni(){
    return {
        id:  String (Math.random()) + String (Math.random()),
    }
}


//---ZÁKAZNÍK---
function ZobrazHTML(html){
    document.querySelector("#obsah").innerHTML=html
    //zobrazi jmeno obrazovky
    document.querySelector("#jmeno-obrazovky").textContent=arguments.callee.caller.name
}

function ObrazovkaHomepageZakaznik(){

    html=`
    <button onclick='zpracujUdalost("ZacitPouzivatZakaznik")'>Začít používat</button>
    <p>Aktivní požadavky</p>
    <p>Historie</p>
    `
    ZobrazHTML(html)
}

function ObrazovkaZadostKlient(){
    html = `
    <div class="Obrazovka" id="ObrazovkaZadostKlient">
    <p>Tel. číslo/E-mail</p>
    <input type="text" id="TelCis">
    <p>Cenové rozmezí</p>
    <input type="number" id="CenRozmez">
    <p>Vzdálenost v m </p>
    <input type="number" id="Vzdalenost">
    <button onclick='zpracujUdalost("VyhledatKadernictvi")'>Vyhledat</button>
    <button onclick='zpracujUdalost("Domu")'>Domů</button>
    <button onclick>Zpět</button>
    </div>
    `
    ZobrazHTML(html)

}


function ObrazovkaOdeslaniZadosti(){
    html=`
    <div class="Obrazovka" id="ObrazovkaOdeslaniZadosti">
    <h3>Nazev kadeřnictví</h3>
    <p>Nazev, cena, atd.</p>
    <p>Požadavek</p>
    <input type="text" id="Pozadavek">
    <p>V kolik</p>
    <input type="time" id="Vkolik">
    <button id="OdeslatZadost">Odeslat žádost</button>
    <button onlick>Domů</button>
    <button onlick>Zpět</button>
    </div>
    `

}

function ObrazovkaPotvzeniZadosti(){
    html=`
    <div class="Obrazovka" id="ObrazovkaPovtzeniZadosti">
    <p>Zpráva o vyřízení nebo zamítnutí žádosti</p>
    <button id="Prijdu">Přijdu</button>
    <button id="Neprijdu">Nepřijdu</button>
    <p>Doba příchodu</p>
    <input type="time" id="DobaPrichodu>
    <button onlick>Domů</button>
    <button onlick>Zpět</button>
    </div>
    `

}

function ObrazovkaHodnoceni(){
    html=`
    <div class="Obrazovka" id="ObrazovkaHodnoceni">
    <h3>Název kadeřnictví</h3>
    <p>Napiš nám recenzi</p>
    <input type="text" id=>
    <p>Ohodnoť hvězdami</p>
    <p>Nejaké hodnotítko</p>
    </div>
    `


}


//----KADEŘNÍK---
function ObrazovkaHomepageKadernik(){

    html=`
    <button onclick='zpracujUdalost("ZacitPouzivatKadernik")'>Začít používat</button>
    <button onclick='zpracujUdalost("DatOSobeVedet")'>Dát o sobě vědět</button>
    <p>Hodnocení</p>
    `
    ZobrazHTML(html)
}

function ObrazovkaRozhodnuti(){
    html = `
    <div class="Obrazovka" id="ObrazovkaRozhodnuti">
    <button onclick='zpracujUdalost("zapniRezimZakaznik")' id="TlacitkoZaznik">Jsem zákazník</button>
    <button onclick='zpracujUdalost("zapniRezimKadernik")' id="TlacitkKadernik">Jsem kadeřník</button> 
    </div>
    `
    ZobrazHTML(html)    
}



function ObrazovkaKadernikRegLog(){
    html=`
    <div class="Obrazovka" id="ObrazovkaKadernikRegLog">
    <button onclick='zpracujUdalost("RegistrovatProvozovnu")' id="Registrovat provozovnu">Registrovat provozovnu</button>
    <button onclick='zpracujUdalost("PripojitSePredchoziRegistrace")' id="PripojitSe">Připojit se předchozí registrace</button>
    <button onclick='zpracujUdalost("Domu")'>Domů</button>
    <button id="Zpet">Zpět</button>  
    </div>
    `
    ZobrazHTML(html)
}


function ObrazovkaRegKadernictvi(){
    html=`
    <div class="Obrazovka" id="ObrazovkaRegKadernictvi">
    <p>E-mail</p>
    <input type="email" id="regEmail">
    <p>Heslo</p>
    <input type="password"  id="regHeslo">
    <p>Heslo znovu</p>
    <input type="password" id="regHesloZnovu">
    <p>Adresa provozovny</p>
    <input type="text" id="regAdresa">
    <p>Název provozovny</p>
    <input type="text" id="regNazevProvoz">
    <button onclick='zpracujUdalost("ZaregistrovatSe")' id="ZaregistrovatSe">Zaregistrovat se</button>
    <button id="Domu">Domů</button>
    <button id="Zpet">Zpět</button>
    </div>
    `
    ZobrazHTML(html)

}


function ObrazovkaLoginKadernictvi(){
    html=`
    <div class="Obrazovka" id="ObrazovkaLoginKadernictvi">
    <p>Email</p>
    <input type="email">
    <p>Heslo</p>
    <input type="password">
    <button id="PrihlasitSe">Přihlísit se</button>
    
    </div>
    `
    ZobrazHTML(html)
}

function ObrazovkaOdpovedZadostKadernik(){
    html=`
    <div class="Obrazovka" id="ObrazovkaOdpovedZadostKadernik">
    <p>Zobrazeni žádosti</p>
    <button id="PrijetiZadosti">Přijmout</button>
    <button id="OdmitnoutZadost">Odmítnout</button>
    <button id="Domu">Domů</button>
    <button id"Zpet">Zpět</button>
    </div>
    `
    ZobrazHTML(html)


}

function ObrazovkaOznameniOVolnu(){
    html=`
    <div class="Obrazovka" id="ObrazovkaOznameniOVolnu">
    <p>Zadejte čas od</p>
    <input type="time">
    <p>Zadejte čas do</p>
    <input type="time">
    <button onclick='zpracujUdalost("OdeslatOznameni")' id="OdeslatOznameni">Odeslat</button>
    <button onclick='zpracujUdalost("Domu")'>Domů</button>
    <button id="Zpet">Zpět</button>
    `
    ZobrazHTML(html)
}






function zapniRezimKadernik() {
    const zarizeni = db.VyzvZarizeni();
    zarizeni.rezim = "kadernik"
    db.UlozZarizeni(zarizeni)
    console.log(zarizeni.rezim)
    ObrazovkaKadernikRegLog()

}

function zapniRezimZakaznik() {
    const zarizeni = db.VyzvZarizeni();
    zarizeni.rezim = "zakaznik"
    db.UlozZarizeni(zarizeni)
    console.log(zarizeni.rezim)
    ObrazovkaZadostKlient()
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

const db = {
    VyzvZarizeni: function (){
        var json = localStorage["ZaznamZarizeni"];
        if (json){
            var zarizeni = JSON.parse(json)
            return zarizeni;
        }
        else {
            var noveZarizeni =  vytvorNoveZarizeni();
            this.UlozZarizeni(noveZarizeni);
            return noveZarizeni;
        }
    },

    UlozZarizeni: function (zarizeni){
        localStorage["ZaznamZarizeni"] = JSON.stringify(zarizeni, null, 4);
    }
   
}

function spusteniAplikace(){
    const zarizeni = db.VyzvZarizeni();
    console.log(zarizeni);
    if (zarizeni.rezim){
        if(zarizeni.rezim==="kadernik"){
            console.log("rezim kadenik")
            ObrazovkaHomepageKadernik()
        }
        else {
            console.log("rezim zakaznik")
            ObrazovkaHomepageZakaznik()
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
    loguj(`Zpracovacam udalost ${udalost} jdu na to`);
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
        case "ZacitPouzivat":
            ZacitPouzivat();
            break;
        case "VyhledatKadernictvi":
            VyhledatKadernictvi();
            break;
        case "Domu":
            Domu();
            break;
        case "ZacitPouzivatZakaznik":
            ZacitPouzivatZakaznik();
            break;
        case "ZacitPouzivatKadernik":
            ZacitPouzivatKadernik();
            break;
        case "RegistrovatProvozovnu":
            RegistrovatProvozovnu();
            break;
        case "PripojitSePredchoziRegistrace":
            PripojitSePredchoziRegistrace()
            break;
        case "ZaregistrovatSe":
            ZaregistrovatSe();
            break;
        case "DatOSobeVedet":
            DatOSobeVedet();
            break;
        default:
            console.warn(`Neznama odalost ${udalost}`);
    }
}

function ZacitPouzivatZakaznik (){

    ObrazovkaZadostKlient()
}

function VyhledatKadernictvi(){

    console.log("Nic tu není")
    const parametryVyhledavani ={
        TelCis1: document.querySelector("#ObrazovkaZadostKlient #TelCis").value,
        TelCis: VezmiHodnotu("ObrazovkaZadostKlient", "TelCis"),
        CenRozmez: Number(VezmiHodnotu("ObrazovkaZadostKlient", "CenRozmez")),
        Vzdalenost: Number(VezmiHodnotu("ObrazovkaZadostKlient", "Vzdalenost")),        
    }
    console.log("parametryVyhledavani:", parametryVyhledavani)
}

function Domu() {

    const zarizeni = db.VyzvZarizeni()
    console.log(zarizeni)
    if (zarizeni.rezim==="zakaznik") {

        ObrazovkaHomepageZakaznik()
    }   
    else {
        ObrazovkaHomepageKadernik()
    }

        
}

function VezmiHodnotu(idObrazovky, idVstupu){
    return document.querySelector(`#${idObrazovky} input#${idVstupu}`).value
}

function loguj(zprava){
    const radek = document.createElement("p")
    radek.textContent = zprava
    document.querySelector("#loguj").appendChild(radek)  
}


function RegistrovatProvozovnu(){

    

    ObrazovkaRegKadernictvi()

}

function ZacitPouzivatKadernik(){

    ObrazovkaKadernikRegLog()
}

function PripojitSePredchoziRegistrace(){

    ObrazovkaLoginKadernictvi()
}

function ZaregistrovatSe(){

    const udajeregistrace = {
        Email: VezmiHodnotu("ObrazovkaRegKadernictvi", "regEmail").value,
        Heslo: VezmiHodnotu("ObrazovkaRegKadernictvi", "regHeslo").value,
        HesloZnovu: VezmiHodnotu("ObrazovkaRegKaderctvi", "regHesloZnovu").value,
        Adresa: VezmiHodnotu("ObrazovkaRegKadernictvi", "regAdresa").value,
        NazevProvozovny: VezmiHodnotu("ObrazovkaKadernikRegLog", "regNazevProvoz").value,}

        console.log("udajeregistrace", udajeregistrace)


    

    ObrazovkaLoginKadernictvi()
}

function DatOSobeVedet(){

    ObrazovkaOznameniOVolnu()    
}


//-----------------------------------------------------------------------------------------------------------------------------------
//spuštění aplikace



// osoba = {
//    jmeno: "Vit",
//    prijmeni: "Rasekl",
//    vyska: 185,
//    zenaty: false,
//    vysvedceni: 
//        matematika: 3,
//        telocvik: 1 ,
//        ps: "N"
//    }
// }


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

function vytvorNoveZarizeni() {
    return {
        id: String(Math.random()) + String(Math.random()),
    }
}


//---ZÁKAZNÍK---
function ZobrazHTML(html) {
    document.querySelector("#obsah").innerHTML = html
    //zobrazi jmeno obrazovky
    document.querySelector("#jmeno-obrazovky").textContent = arguments.callee.caller.name
}

function ObrazovkaHomepageZakaznik() {
    var html
    html = `
    <div class="Obrazovka" id="ObrazovkaHomePageZakaznik">
    <button onclick='zpracujUdalost("ZacitPouzivatZakaznik")'>Začít používat</button>
    <button onclick='zpracujUdalost("SmazZarizeni")'>Smaž zařízení</button>
    <p>Aktivní požadavky</p>
    <p>Historie</p>
    </div>
    `
    ZobrazHTML(html)
}

function ObrazovkaZadostKlient() {
    var html
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
    </div>
    `
    ZobrazHTML(html)

}


function ObrazovkaOdeslaniZadosti(Kadernictvi) {
    var html
    html = `
    <div class="Obrazovka" id="ObrazovkaOdeslaniZadosti">
    <h3>${Kadernictvi.NazevProvozovny}</h3>
    <h3>${Kadernictvi.Adresa}<h3>
    <p>Nazev, cena, atd.</p>
    <p>Požadavek</p>
    <input type="text" id="Pozadavek">
    <p>V kolik</p>
    <input type="time" id="Vkolik">
    <button onclick='zpracujUdalost("OdeslatZadost")' id="OdeslatZadost">Odeslat žádost</button>
    <button onclick='zpracujUdalost("Domu")'>Domů</button>
    </div>
    `
    ZobrazHTML(html)
}

function ObrazovkaVypis(SeznamKadernictvi) {

    var html
    var Seznam = ""
    for (const idKadernictvi of Object.keys(SeznamKadernictvi)) {
        const Kadernictvi = SeznamKadernictvi[idKadernictvi]

        //Seznam = Seznam + " " + "<p>" + Kadernictvi.NazevProvozovny + "</p>\n"
        Seznam = `${Seznam} <p onclick='zpracujUdalost("VybratKadernictvi","${Kadernictvi.id}")'> ${Kadernictvi.NazevProvozovny}, ${Kadernictvi.Adresa} </p>\n`


    }
    console.log(Seznam)
    html = `<div class="Obrazovka">
    <h2>Kadeřnictví</h2>
    ${Seznam}
    </div>`
    ZobrazHTML(html)
}




function ObrazovkaPotvzeniZadosti() {
    var html
    html = `
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
    ZobrazHTML(html)
}

function ObrazovkaHodnoceni() {
    var html
    html = `
    <div class="Obrazovka" id="ObrazovkaHodnoceni">
    <h3>Název kadeřnictví</h3>
    <p>Napiš nám recenzi</p>
    <input type="text" id=>
    <p>Ohodnoť hvězdami</p>
    <p>Nejaké hodnotítko</p>
    </div>
    `
    ZobrazHTML(html)

}


//----KADEŘNÍK---
function ObrazovkaHomepageKadernik() {
    var html
    const zarizeni = db.VyzvZarizeni()
    if (zarizeni.Kadernictvi) {

        console.log("jsem přihlášen")

        html = `
        <div class="Obrazovka" id="ObrazovkaHomepageKadernik">
        <h2>${zarizeni.Kadernictvi.NazevProvozovny}</h2>
        <h4>${zarizeni.Kadernictvi.Adresa}</h4>
        <button onclick='zpracujUdalost("DatOSobeVedet")'>Dát o sobě vědět</button>
        <button onclick='zpracujUdalost("SmazZarizeni")'>Smaž zařízení</button>  
        <p>Hodnocení</p>
        `
    }
    else {
        html = `
        <div class="Obrazovka" id="ObrazovkaHomepageKadernik">
        <button onclick='zpracujUdalost("ZacitPouzivatKadernik")'>Začít používat</button>
        <button onclick='zpracujUdalost("SmazZarizeni")'>Smaž zařízení</button>  
        <p>Hodnocení</p>
        `
        console.log("Nejsem přihlášen")
    }


    ZobrazHTML(html)
}

function ObrazovkaRozhodnuti() {
    var html
    html = `
    <div class="Obrazovka" id="ObrazovkaRozhodnuti">
    <button onclick='zpracujUdalost("zapniRezimZakaznik")' id="TlacitkoZaznik">Jsem zákazník</button>
    <button onclick='zpracujUdalost("zapniRezimKadernik")' id="TlacitkKadernik">Jsem kadeřník</button> 
    </div>
    `
    ZobrazHTML(html)
}



function ObrazovkaKadernikRegLog() {
    var html
    html = `
    <div class="Obrazovka" id="ObrazovkaKadernikRegLog">
    <button onclick='zpracujUdalost("RegistrovatProvozovnu")' id="Registrovat provozovnu">Registrovat provozovnu</button>
    <button onclick='zpracujUdalost("PripojitSePredchoziRegistrace")' id="PripojitSe">Připojit se předchozí registrace</button>
    <button onclick='zpracujUdalost("Domu")'>Domů</button>  
    </div>
    `
    ZobrazHTML(html)
}


function ObrazovkaRegKadernictvi() {
    var html
    html = `
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
    <button onclick='zpracujUdalost("Domu")'>Domů</button>
    </div>
    `
    ZobrazHTML(html)

}


function ObrazovkaLoginKadernictvi() {
    var html
    html = `
    <div class="Obrazovka" id="ObrazovkaLoginKadernictvi">
    <p>Email</p>
    <input type="email" id="PrihlEmail">
    <p>Heslo</p>
    <input type="password" id="PrihlHeslo">
    <button onclick='zpracujUdalost("PrihlasitSe")' id="PrihlasitSe">Přihlásit se</button>
    <button onclick='zpracujUdalost("Domu")'>Domů</button>
    
    </div>
    `
    ZobrazHTML(html)
}

function ObrazovkaOdpovedZadostKadernik() {
    var html
    html = `
    <div class="Obrazovka" id="ObrazovkaOdpovedZadostKadernik">
    <p>Zobrazeni žádosti</p>
    <button onclick='zpracujUdalost("Prijmout")' id="PrijetiZadosti">Přijmout</button>
    <button onclick='zpracujUdalost("Odmitnout") id="OdmitnoutZadost">Odmítnout</button>
    <button onclick='zpracujUdalost("Domu")'>Domů</button>
    </div>
    `
    ZobrazHTML(html)


}

function ObrazovkaOznameniOVolnu() {
    var html
    html = `
    <div class="Obrazovka" id="ObrazovkaOznameniOVolnu">
    <p>Zadejte čas od</p>
    <input type="time" id="CasOd">
    <p>Zadejte čas do</p>
    <input type="time" id="CasDo">
    <p>Cena</p>
    <input type="number" id="CenaOzn">
    <button onclick='zpracujUdalost("OdeslatOznameni")' id="OdeslatOznameni">Odeslat</button>
    <button onclick='zpracujUdalost("Domu")'>Domů</button>
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
    VyzvZarizeni: function () {
        var json = localStorage["ZaznamZarizeni"];
        if (json) {
            var zarizeni = JSON.parse(json)
            return zarizeni;
        }
        else {
            var noveZarizeni = vytvorNoveZarizeni();
            this.UlozZarizeni(noveZarizeni);
            return noveZarizeni;
        }
    },

    UlozZarizeni: function (zarizeni) {
        localStorage["ZaznamZarizeni"] = JSON.stringify(zarizeni, null, 4);
    },
    SmazZarizeni: function () {
        console.log("Mazu zařízení")
        localStorage.removeItem("ZaznamZarizeni");
    },

}


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



function spusteniAplikace() {
    const zarizeni = db.VyzvZarizeni();
    console.log(zarizeni);
    if (zarizeni.rezim) {
        if (zarizeni.rezim === "kadernik") {
            console.log("rezim kadenik")
            ObrazovkaHomepageKadernik()
        }
        else {
            console.log("rezim zakaznik")
            ObrazovkaHomepageZakaznik()
        }
    }
    else {
        console.log("rezmi neurcen");
        ObrazovkaRozhodnuti();
    }
}

// funkce, ktera zajistuje spravne rozdelovani zpracovani udalosti - rozcestnik
function zpracujUdalost(udalost, p1, p2, p3) {
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
        case "OdeslatOznameni":
            OznamitVolno();
            break;
        case "SmazZarizeni":
            SmazZarizeni();
            break;
        case "PrihlasitSe":
            PrihlasitSe();
            break;
        case "VybratKadernictvi":
            VybratKadernictvi(p1);
            break;
        case "OdeslatZadost":
            OdeslatZadost();
            break;

        default:

            console.warn(`Neznama odalost ${udalost}`);

    }
}

function ZacitPouzivatZakaznik() {

    ObrazovkaZadostKlient()
}

//kazda funkce, ktera obsahuje await musi byt oznacena jako async
async function VyhledatKadernictvi() {

    console.log("Nic tu není")
    const parametryVyhledavani = {
        TelCis: VezmiHodnotu("ObrazovkaZadostKlient", "TelCis"),
        CenRozmez: Number(VezmiHodnotu("ObrazovkaZadostKlient", "CenRozmez")),
        Vzdalenost: Number(VezmiHodnotu("ObrazovkaZadostKlient", "Vzdalenost")),
    }

    console.log("parametryVyhledavani:", parametryVyhledavani)


    //pri volani serveru misi vzdy byt predrazeno oznackovani await 
    const vyhledanaKadernictvi = await server.HledejKadernictvi(parametryVyhledavani)
    console.log("Kadernctvi", vyhledanaKadernictvi)
    window.PosledniVyhledanaKadernictvi = vyhledanaKadernictvi
    ObrazovkaVypis(vyhledanaKadernictvi)
}

function SmazZarizeni() {

    db.SmazZarizeni()
    spusteniAplikace()
}



function Domu() {

    const zarizeni = db.VyzvZarizeni()
    console.log(zarizeni)
    if (zarizeni.rezim === "zakaznik") {

        ObrazovkaHomepageZakaznik()
    }
    else {
        ObrazovkaHomepageKadernik()
    }


}

function VezmiHodnotu(idObrazovky, idVstupu) {
    // console.log(`#${idObrazovky} input#${idVstupu}`)
    return document.querySelector(`#${idObrazovky} input#${idVstupu}`).value
}

function loguj(zprava) {
    const radek = document.createElement("p")
    radek.textContent = zprava
    document.querySelector("#loguj").appendChild(radek)
}

function VybratKadernictvi(idKadernictvi) {

    const Kadernictvi = window.PosledniVyhledanaKadernictvi[idKadernictvi]
    console.log(`Vybrano kadeřnictví: ${idKadernictvi}`)
    ObrazovkaOdeslaniZadosti(Kadernictvi)
}


function RegistrovatProvozovnu() {



    ObrazovkaRegKadernictvi()

}

function OdeslatZadost() {


}

function ZacitPouzivatKadernik() {

    ObrazovkaKadernikRegLog()
}

function PripojitSePredchoziRegistrace() {

    ObrazovkaLoginKadernictvi()
}

async function PrihlasitSe() {

    const PrihlasUdaje = {
        Email: VezmiHodnotu("ObrazovkaLoginKadernictvi", "PrihlEmail"),
        Heslo: VezmiHodnotu("ObrazovkaLoginKadernictvi", "PrihlHeslo")
    }

    console.log("PrihlasUdaje", PrihlasUdaje)
    const VysledekPrihlaseni = await server.Prihlaseni(PrihlasUdaje)

    if (VysledekPrihlaseni === null) {

        alert("Přihlášení se nezdařilo")
    }
    else {
        const zarizeni = db.VyzvZarizeni();
        zarizeni.Kadernictvi = VysledekPrihlaseni
        db.UlozZarizeni(zarizeni)
        console.log(zarizeni)
        ObrazovkaHomepageKadernik()


    }



}

async function ZaregistrovatSe() {

    const udajeregistrace = {
        Email: VezmiHodnotu("ObrazovkaRegKadernictvi", "regEmail"),
        Heslo: VezmiHodnotu("ObrazovkaRegKadernictvi", "regHeslo"),
        HesloZnovu: VezmiHodnotu("ObrazovkaRegKadernictvi", "regHesloZnovu"),
        Adresa: VezmiHodnotu("ObrazovkaRegKadernictvi", "regAdresa"),
        NazevProvozovny: VezmiHodnotu("ObrazovkaRegKadernictvi", "regNazevProvoz")
    }
    udajeregistrace.id = String(Math.random()) + String(Math.random())

    await server.RegistraceKadernictvi(udajeregistrace)

    console.log("udajeregistrace", udajeregistrace)




    ObrazovkaLoginKadernictvi()
}

function DatOSobeVedet() {

    ObrazovkaOznameniOVolnu()
}

function OznamitVolno() {

    const Casy = {
        CasOd: VezmiHodnotu("ObrazovkaOznameniOVolnu", "CasOd"),
        CasDo: VezmiHodnotu("ObrazovkaOznameniOVolnu", "CasDo"),
        Cena: Number(VezmiHodnotu("ObrazovkaOznameniOVolnu", "CenaOzn"))


    }
    console.log("Casy", Casy)

    ObrazovkaHomepageKadernik()
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


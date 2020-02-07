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
    constructor(){
        id = String (Math.random()) + String (Math.random());
    }
    id;

}

class Server {


}

class DatabazeTelefon {
    //v každém telefonu existuje databáze
    VyzvZarizeni(){
        var ret = localStorage["ZaznamZarizeni"];
        if (ret){
            return ret;
        }
        else {
            return new Zarizeni;
        }
    }

    UlozZarizeni(zarizeni){
        localStorage["ZaznamZarizeni"] = zarizeni;
    }

}

class DatabazeServer {
    //na serveru existuje jedna databáze
    
}

//spuštění aplikace kadeřníkem
//podívat se do databáze, jestli existují nějaké informace
const db = new DatabazeTelefon();
const zarizeni = db.VyzvZarizeni();
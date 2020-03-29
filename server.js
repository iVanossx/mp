var server = {

    dbServer: typeof (dbServer) == "undefined" ? null : dbServer,

    OverrideDb: function (db) {
        this.dbServer = db
    },

    HledejKadernictvi: function (parametryVyhledavani) {

        const dbKadernictvi = this.dbServer.Vyzvedni("SeznamKadernictvi")
        for (const idKadernictvi of Object.keys(dbKadernictvi)) {
            const Kadernictvi = dbKadernictvi[idKadernictvi]
            OdebratCitliveUdaje(Kadernictvi)
        }
        return dbKadernictvi

    },

    RegistraceKadernictvi: function (udajeregistrace) {
        const dbKadernictvi = this.dbServer.Vyzvedni("SeznamKadernictvi")
        dbKadernictvi[udajeregistrace.id] = udajeregistrace
        this.dbServer.Uloz("SeznamKadernictvi", dbKadernictvi)

    },

    Prihlaseni: function (PrihlasUdaje) {

        const dbKadernictvi = this.dbServer.Vyzvedni("SeznamKadernictvi")
        for (const idKadernictvi of Object.keys(dbKadernictvi)) {

            const Kadernictvi = dbKadernictvi[idKadernictvi]

            console.log(`${PrihlasUdaje.Email} === ${Kadernictvi.Email}`)

            if (PrihlasUdaje.Email === Kadernictvi.Email) {

                if (PrihlasUdaje.Heslo === Kadernictvi.Heslo) {
                    console.log("Kadernictví nalezeno")
                    OdebratCitliveUdaje(Kadernictvi)
                    return Kadernictvi
                }
            }
        }
        console.log("Nenalezene kadeřnictví při přihlašování")
        return null
    },

    UlozeniZadost: function (UdajeZadosti) {

        const dbZadosti = this.dbServer.Vyzvedni("SeznamZadosti")
        dbZadosti[UdajeZadosti.idZarizeni] = UdajeZadosti
        this.dbServer.Uloz("SeznamZadosti", dbZadosti)
        const idZadosti = UdajeZadosti.idZarizeni + UdajeZadosti.idKadernictvi
    },

    ZadostiKadernictvi: function (idKadernictvi) {
        const SeznamNalezenychZadosti = {} 
        const SeznamZadostizDB = this.dbServer.Vyzvedni("SeznamZadosti")
        for(const idZadosti of Object.keys(SeznamZadostizDB)){
            const Zadost = SeznamZadostizDB[idZadosti]
            if(idKadernictvi === Zadost.idKadernictvi){
                SeznamNalezenychZadosti[idZadosti] = Zadost
            }
            
        }
        console.log(SeznamNalezenychZadosti)
        return SeznamNalezenychZadosti

    }


} //server

function OdebratCitliveUdaje(Kadernictvi) {

    delete Kadernictvi.Heslo
    delete Kadernictvi.HesloZnovu
    delete Kadernictvi.Email
}



if (typeof (exports) !== 'undefined') {
    // console.log("binding exports")
    // for ( const fn of Object.keys(server)){
    //     if (typeof(server[fn]) === 'function'){
    //         console.log(`binding & exporting server function ${fn}: ${server[fn]}`)
    //         exports[fn]=server[fn].bind(server)    
    //     }
    // }

    exports.HledejKadernictvi = server.HledejKadernictvi.bind(server)
    exports.RegistraceKadernictvi = server.RegistraceKadernictvi.bind(server)
    exports.Prihlaseni = server.Prihlaseni.bind(server)
    exports.OverrideDb = server.OverrideDb.bind(server)
    exports.ZadostiKadernictvi = server.ZadostiKadernictvi.bind(server)
    exports.UlozeniZadost = server.UlozeniZadost.bind(server)
    // exports. = server..bind(server)

}

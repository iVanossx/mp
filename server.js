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

    OdeslaniZadost: function (UdajeZadosti) {

        const dbZadosti = this.dbServer.Vyzvedni("SeznamZadosti")
        dbZadosti[UdajeZadosti.idZarizeni] = UdajeZadosti
        this.dbServer.Uloz("SeznamZadosti", dbZadosti)
        const Klic = UdajeZadosti.idZarizeni + UdajeZadosti.idKadernictvi
        for (const idKadernictvi of Object.keys(dbKadernictvi)) {
            if (UdajeZadosti.idKadernictvi === dbKadernictvi[idKadernictvi]) {
                
            }
        }



    }


} //server

function OdebratCitliveUdaje(Kadernictvi) {

    delete Kadernictvi.Heslo
    delete Kadernictvi.HesloZnovu
    delete Kadernictvi.Email
}



if (typeof (exports) !== 'undefined') {
    exports.HledejKadernictvi = server.HledejKadernictvi.bind(server)
    exports.RegistraceKadernictvi = server.RegistraceKadernictvi.bind(server)
    exports.Prihlaseni = server.Prihlaseni.bind(server)
    exports.OverrideDb = server.OverrideDb.bind(server)

}

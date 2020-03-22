var server = {

    dbServer: typeof(dbServer)=="undefined" ? null : dbServer,  

    OverrideDb: function(db){
        this.dbServer=db
    },

    HledejKadernictvi: function (parametryVyhledavani) {

        const dbKadernictvi = this.dbServer.VyzvSeznamKadernictvi()
        for (const idKadernictvi of Object.keys(dbKadernictvi)) {
            const Kadernictvi = dbKadernictvi[idKadernictvi]
            OdebratCitliveUdaje(Kadernictvi)
        }
        return dbKadernictvi

    },

    RegistraceKadernictvi: function (udajeregistrace) {
        const dbKadernictvi = this.dbServer.VyzvSeznamKadernictvi()
        dbKadernictvi[udajeregistrace.id] = udajeregistrace
        this.dbServer.UlozSeznamKadernictvi(dbKadernictvi)

    },

    Prihlaseni: function (PrihlasUdaje) {

        const dbKadernictvi = this.dbServer.VyzvSeznamKadernictvi()
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
    }


} //server

function OdebratCitliveUdaje(Kadernictvi) {

    delete Kadernictvi.Heslo
    delete Kadernictvi.HesloZnovu
    delete Kadernictvi.Email
}



if (typeof(exports) !== 'undefined'){
    exports.HledejKadernictvi = server.HledejKadernictvi.bind(server)
    exports.RegistraceKadernictvi = server.RegistraceKadernictvi.bind(server)
    exports.Prihlaseni = server.Prihlaseni.bind(server)
    exports.OverrideDb = server.OverrideDb.bind(server)

}

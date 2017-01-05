module.exports = {
    "directoryRoute": function(dirname, path = '/{param*}') {
        return {
            method: 'GET',
            path: path,
            handler: {
                directory: {
                    path: dirname
                }
            }
        }
    },
    auth(mode = 'required') {
        return { mode: mode, strategy: 'jwt-auth' }
    }
}
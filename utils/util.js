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
        return { mode: 'required', strategy: 'jwt-auth' }
    }
}
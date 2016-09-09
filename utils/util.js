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
    }
}
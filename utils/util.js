module.exports = {
    "directoryRoute": function(dirname) {
        return {
            method: 'GET',
            path: '/{param*}',
            handler: {
                directory: {
                    path: dirname
                }
            }
        }
    }
}
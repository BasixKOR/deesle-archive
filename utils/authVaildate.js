const User = require(`${__dirname}/../utils/schema/User`)
module.exports = function (decoded, request, callback) {
    // do your checks to see if the person is valid 
    User.count({ username: decoded.username }).exec()
        .then(count => {
            if(count > 0) {
                callback(null, true)
            } else {
                callback(null, false)
            }
        })
    
    return;
};
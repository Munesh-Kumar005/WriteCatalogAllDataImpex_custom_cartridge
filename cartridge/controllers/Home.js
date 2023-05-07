'use strict'

var server = require('server');
var page = module.superModule;
server.extend(page);
// server.replace('Show', function (req, res, next) {
//     var test = 'from custom cartridge';
//     res.render('home/homePage', {
//         test: test
//     });
//     next();
// });
server.append('Show', function (req, res, next) {
    var test = 'from custom cartridge';
    res.render('home/homePage', {
        test: test
    });
    next();
})
// server.prepend('Show', function (req, res, next) {
//     var test = 'from custom cartridge';
//     res.render('home/homePage', {
//         test: test
//     });
//     next();
// })

module.exports = server.exports();
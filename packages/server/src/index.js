"use strict";
exports.__esModule = true;
var express_1 = require("express");
var cors_1 = require("cors");
var fs_1 = require("fs");
var routes_1 = require("./routes");
var PORT = process.env.PORT || 3333;
var app = express_1["default"]();
app.use(cors_1["default"]());
app.use(routes_1["default"]);
app.get('/images/:id', function (req, res) {
    var id = req.params.id;
    var file = "../../public/uploads/" + id;
    var type = 'image/jpeg';
    var s = fs_1["default"].createReadStream(file);
    s.on('open', function () {
        res.status(200);
        res.set('Content-Type', type);
        s.pipe(res);
    });
    s.on('error', function () {
        res.set('Content-Type', 'text/plain');
        res.status(404).end('Not found');
    });
});
app.listen(PORT, function () {
    console.log("BACKEND is running on port " + PORT);
});

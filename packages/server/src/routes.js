"use strict";
exports.__esModule = true;
var express_1 = require("express");
var MemeController_1 = require("@controllers/MemeController");
var router = express_1.Router();
router.use(MemeController_1["default"]);
exports["default"] = router;

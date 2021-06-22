"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var express_1 = __importDefault(require("express"));
var controllers_1 = require("./controllers");
var inject_1 = require("@furystack/inject");
var app = express_1.default();
var services = new inject_1.Injector();
app.get('/', function (req, res) {
    var scheduler = services.getInstance(controllers_1.SchedulerController);
    scheduler.start({ req: req, res: res });
    res.send('Well done!');
});
app.get('/list/:id', function (req, res) {
    var scheduler = services.getInstance(controllers_1.SchedulerController);
    scheduler.show({ req: req, res: res });
});
app.listen(3000, function () {
    console.log('The application is listening on port 3000!');
});

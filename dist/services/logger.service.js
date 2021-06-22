"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggerService = void 0;
var inject_1 = require("@furystack/inject");
var LoggerService = (function () {
    function LoggerService() {
    }
    LoggerService.prototype.Log = function (severity, template) {
        var params = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            params[_i - 2] = arguments[_i];
        }
        var str = template;
        if (!!params) {
            var i = 0;
            var namedParameters = params.filter(function (x) { return typeof x === 'object' && !!x.key && !!x.value; });
            var otherParameters = params.filter(function (x) { return typeof x !== 'object' || !x.key || !x.value; });
            while (namedParameters.length > i) {
                str = str.replace("{" + namedParameters[i].key + "}", namedParameters[i++].value.toString());
            }
            i = 0;
            while (/\{([^\}]*)\}/i.test(str) && otherParameters.length > i) {
                str = str.replace(/\{([^\}]*)\}/i, otherParameters[i++].toString());
            }
        }
        console.log("[" + severity + "] " + str);
    };
    LoggerService.prototype.Debug = function (template) {
        var params = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            params[_i - 1] = arguments[_i];
        }
        this.Log.apply(this, __spreadArray(['DEBUG', template], params));
    };
    LoggerService.prototype.Info = function (template) {
        var params = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            params[_i - 1] = arguments[_i];
        }
        this.Log.apply(this, __spreadArray(['INFO', template], params));
    };
    LoggerService.prototype.Warning = function (template) {
        var params = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            params[_i - 1] = arguments[_i];
        }
        this.Log.apply(this, __spreadArray(['WARNING', template], params));
    };
    LoggerService.prototype.Error = function (template) {
        var params = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            params[_i - 1] = arguments[_i];
        }
        this.Log.apply(this, __spreadArray(['ERROR', template], params));
    };
    LoggerService.prototype.Critical = function (template) {
        var params = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            params[_i - 1] = arguments[_i];
        }
        this.Log.apply(this, __spreadArray(['CRITICAL', template], params));
    };
    LoggerService = __decorate([
        inject_1.Injectable({
            lifetime: 'singleton',
        })
    ], LoggerService);
    return LoggerService;
}());
exports.LoggerService = LoggerService;

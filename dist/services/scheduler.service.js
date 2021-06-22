"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchedulerService = void 0;
var inject_1 = require("@furystack/inject");
var uuid_1 = require("uuid");
var logger_service_1 = require("./logger.service");
var SchedulerService = (function () {
    function SchedulerService(logger) {
        this.logger = logger;
        this.jobs = [];
        this.uuid = uuid_1.v4();
    }
    SchedulerService.prototype.AddJob = function (video) {
        this.logger.Debug('[{instance}]: Adding new job to convert video: {video}', video.title, {
            key: 'instance',
            value: this.uuid,
        });
        this.jobs.push({
            film: video,
            id: uuid_1.v4().toString(),
            jobState: 'scheduled',
            name: 'Convert video',
        });
    };
    SchedulerService.prototype.GetJobsByState = function (jobState) {
        return this.FilterJobs(function (x) { return x.jobState == jobState; });
    };
    SchedulerService.prototype.FilterJobs = function (predicate) {
        return this.jobs.filter(predicate);
    };
    SchedulerService = __decorate([
        inject_1.Injectable({
            lifetime: 'singleton',
        }),
        __metadata("design:paramtypes", [logger_service_1.LoggerService])
    ], SchedulerService);
    return SchedulerService;
}());
exports.SchedulerService = SchedulerService;

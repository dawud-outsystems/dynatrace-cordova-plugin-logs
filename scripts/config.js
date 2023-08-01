"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkConfiguration = exports.readConfig = exports.PLATFORM_ANDROID = exports.PLATFORM_IOS = exports.PLATFORM_ALL = exports.defaultConfig = void 0;
var pathConstants = require("./pathsConstants");
var fileOperation = require("./fileOperationHelper");
var logger_1 = require("./logger");
var downloadAgent_1 = require("./downloadAgent");
exports.defaultConfig = {
    cordova: {
        debug: false
    },
    js: {
        url: "",
        mode: 2
    }
};
exports.PLATFORM_ALL = 0;
exports.PLATFORM_IOS = 1;
exports.PLATFORM_ANDROID = 2;
var ERROR_CONFIG_NOT_AVAILABLE = "Couldn't find Configuration!";
function readConfig(pathToConfig) {
    var readConfig;
    try {
        readConfig = require(pathToConfig);
    }
    catch (e) {
        throw new downloadAgent_1.StopBuildError(ERROR_CONFIG_NOT_AVAILABLE);
    }
    if (readConfig === undefined) {
        throw new downloadAgent_1.StopBuildError(ERROR_CONFIG_NOT_AVAILABLE);
    }
    patchIncorrectJSUrl(readConfig);
    return Object.assign(Object.assign({}, exports.defaultConfig), readConfig);
}
exports.readConfig = readConfig;
function patchIncorrectJSUrl(config) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            if (config.js !== undefined && config.js.url !== undefined) {
                config.js.url = config.js.url.replace("ApiToken=", "Api-Token=");
            }
            return [2];
        });
    });
}
function checkConfiguration() {
    return __awaiter(this, void 0, void 0, function () {
        var pathToDynatraceConfig, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    pathToDynatraceConfig = pathConstants.getConfigFilePath();
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 5]);
                    return [4, fileOperation.checkIfFileExists(pathToDynatraceConfig)];
                case 2:
                    _a.sent();
                    return [3, 5];
                case 3:
                    e_1 = _a.sent();
                    return [4, createNewConfiguration(pathToDynatraceConfig)];
                case 4:
                    _a.sent();
                    return [3, 5];
                case 5: return [2];
            }
        });
    });
}
exports.checkConfiguration = checkConfiguration;
function createNewConfiguration(pathToDynatraceConfig) {
    return __awaiter(this, void 0, void 0, function () {
        var defaultConfigContent;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, fileOperation.readTextFromFile(pathConstants.getDefaultConfig())];
                case 1:
                    defaultConfigContent = _a.sent();
                    return [4, fileOperation.writeTextToFile(pathToDynatraceConfig, defaultConfigContent)];
                case 2:
                    _a.sent();
                    logger_1.default.logMessageSync("Created dynatrace.config.js - Please insert your configuration and update the file!", logger_1.default.INFO);
                    return [2];
            }
        });
    });
}

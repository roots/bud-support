"use strict";
exports.__esModule = true;
exports.terminate = void 0;
var terminate = function (bud, options) {
    if (options === void 0) { options = {
        dump: false,
        timeout: 500
    }; }
    var exit = function (code) {
        options.dump ? process.abort() : process.exit(code);
    };
    return function (code) { return function (err) {
        if (err && err instanceof Error) {
            console.log(err.message, err.stack);
        }
        setTimeout(exit, options.timeout).unref();
    }; };
};
exports.terminate = terminate;
//# sourceMappingURL=terminate.js.map
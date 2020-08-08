var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var output = function (bud) { return ({
    bud: bud,
    name: 'webpack.output',
    target: {
        output: {
            path: bud.paths.get('dist'),
            publicPath: bud.paths.get('public'),
            filename: bud.features.enabled('hash')
                ? bud.options.get('filenameTemplate').hashed + ".js"
                : bud.options.get('filenameTemplate')["default"] + ".js"
        }
    },
    make: function () {
        this.target.output.publicPath = this.bud.hooks.filter(this.name + ".publicPath.filter", this.target.output.publicPath);
        this.target.output.path = this.bud.hooks.filter(this.name + ".path.filter", this.target.output.path);
        this.target.output.filename = this.bud.hooks.filter(this.name + ".filename.filter", this.target.output.filename);
        this.target = this.bud.hooks.filter(this.name + ".filter", this.target);
        this.bud.logger.info(__assign({ name: this.name }, this.target), "webpack.output has been generated");
        return this.target;
    }
}); };
export { output };
//# sourceMappingURL=output.js.map
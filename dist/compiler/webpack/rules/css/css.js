import { patterns } from '../util/patterns';
import { usePostCss } from '../use/usePostCss';
import { useResolveUrl } from '../use/useResolveUrl';
import { useCss } from '../use/useCss';
import { useMiniCss } from '../use/useMiniCss';
var css = function (bud) { return ({
    bud: bud,
    name: 'webpack.module.rules.css',
    rule: {
        test: patterns.css,
        use: []
    },
    make: function () {
        this.bud.hooks.call('webpack.rules.css.pre');
        this.rule.use.push(useMiniCss(this.name, this.bud));
        this.rule.use.push(useCss(this.name, this.bud));
        this.rule.use.push(useResolveUrl(this.name, this.bud));
        if (this.bud.features.enabled('postCss')) {
            this.rule.use.push(usePostCss(this.name, this.bud));
        }
        this.rule.use = this.bud.hooks.filter(this.name + ".use", this.rule.use);
        this.rule = this.bud.hooks.filter(this.name, this.rule);
        this.bud.logger.info({ name: this.name, value: this.rule.test.toString() }, "webpack.rules.css.test");
        this.bud.hooks.call('webpack.rules.css.post');
        return this.rule;
    }
}); };
export { css };
//# sourceMappingURL=css.js.map
import type Webpack from 'webpack'

export default function (
  this: Framework.Bud,
): Webpack.RuleSetRule[] {
  return this.hooks
    .filter(
      'build.module.rules.oneOf',
      Object.entries(this.build.rules).reduce(
        (
          rules: Webpack.RuleSetRule[],
          [, rule]: [string, {make: () => Webpack.RuleSetRule}],
        ): Webpack.RuleSetRule[] => [...rules, rule.make()],
        [],
      ),
    )
    .filter(
      ({enforce}) => enforce !== 'pre',
    ) as Webpack.RuleSetRule[]
}

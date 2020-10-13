export const test: Conditional = ({patterns}) =>
  patterns.get('css')

export const exclude: Exclude = ({patterns}) =>
  patterns.get('modules')

export const use: Use = ({build, mode}) => {
  const use: UseItem = item => build.items[item].make()
  const style = mode.is('production')
    ? use('minicss')
    : use('style')

  return [style, use('css'), use('resolveUrl')]
}

declare type Conditional = Build.Rule.Factory<
  Build.Rule.Conditional
>

declare type Exclude = Build.Rule.Factory<Build.Rule.Conditional>

declare type Use = Build.Rule.Factory<Build.Rule.Use>
declare type UseItem = (item: string) => Build.Rule.Generic
export const test: Build.Rule.Factory<Build.Rule.Conditional> = bud =>
  bud.patterns.get('js')

export const exclude: Build.Rule.Factory<Build.Rule.Conditional> = bud =>
  bud.patterns.get('modules')

export const use: Build.Rule.Factory<Build.Rule.Use> = bud => [
  bud.build.items.raw.make(),
]
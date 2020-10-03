import {Config} from '..'

export const copyAll: Config.CopyAll = function (from, to?) {
  this.store['plugins'].set('copy.patterns', [
    ...this.store['plugins'].get('copy.patterns'),
    this.hooks.filter('api.copyAll', {
      from: '**/*',
      context: from,
      to: to
        ? to
        : this.fs.path.join(
            this.store['paths'].get('dist'),
            from,
          ),
      globOptions: {
        ignore: '.*',
      },
      noErrorOnMissing: true,
    }),
  ])

  return this
}
import type {RepositoryDefinition} from '../container'

const patterns: RepositoryDefinition = {
  name: 'patterns',
  register: {
    js: /\.(js|jsx)$/,
    ts: /\.(ts|tsx)$/,
    vue: /\.vue$/,
    scss: /\.scss$/,
    scssModule: /\.module\.scss$/,
    css: /\.css$/,
    cssModule: /\.module\.css$/,
    svg: /\.svg$/,
    font: /\.(ttf|otf|eot|woff2?|png|jpe?g|gif|ico)$/,
    vendor: /node_modules/,
    image: /\.(png|svg|jpg|gif)$/,
  },
}

export {patterns}

const TSDocgenPlugin = require('react-docgen-typescript-webpack-plugin')

module.exports = async ({config: baseConfig}) => {
  baseConfig.resolve = {
    ...baseConfig.resolve,
    ...{
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    modules: ['node_modules', 'src']
  }}
  baseConfig.plugins.push(new TSDocgenPlugin())
  baseConfig.module.rules.push({
    test: /\.(js|jsx)$/,
    exclude: /node_modules/,
    loader: 'babel-loader',
    query: {
      presets: ['@babel/env', '@babel/react'],
      plugins: ['@babel/plugin-proposal-class-properties']
    }
  })
  baseConfig.module.rules.push({
    test: /\.tsx?$/,
    exclude: /node_modules/,
    loader: 'babel-loader',
    query: {
      presets: ['@babel/env', '@babel/react', '@babel/typescript'],
      plugins: ['@babel/plugin-proposal-class-properties']
    }
  })
  baseConfig.module.rules = baseConfig.module.rules.filter(
    rule => rule.test.toString() !== '/\\.css$/'
  )
  baseConfig.module.rules.push({
    test: /\.css$/,
    exclude: /node_modules(?!\/@storybook\/addon-info)/,
    use: ['style-loader', 'css-loader']
  })
  baseConfig.module.rules.push({
    test: /\.scss$/,
    exclude: /(node_modules)/,
    loaders: [
      'style-loader',
      {
        loader: 'css-loader',
        options: {
          modules: true,
          importLoaders: 2,
          localIdentName: '[name]_[local]_[hash:base64:5]'
        }
      },
      {
        loader: 'sass-loader',
        options: {
          includePaths: ['src']
        }
      }
    ]
  })
  baseConfig.module.rules.push({
    test: /\.(svg|png|jpg|gif)$/,
    use: [
      {
        loader: 'file-loader',
        options: {}
      }
    ]
  })

  baseConfig.module.rules = baseConfig.module.rules.map(rule => {
    {
      if (
        String(rule.test) ===
        String(/\.(svg|ico|jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|cur|ani|pdf)(\?.*)?$/)
      ) {
        return {
          ...rule,
          test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|cur|ani|pdf)(\?.*)?$/
        }
      }

      return rule
    }
  })

  return baseConfig
}

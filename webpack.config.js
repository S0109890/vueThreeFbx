const path = require('path')
const { VueLoaderPlugin } = require('vue-loader')

module.exports = {
  //진입점
  entry: {
    app: path.join(__dirname, 'main.js') //웹팩으로 빌드할 파일
  },
  // 결과물에 대한 설정
  output: {
    filename: '[name].js', //app.js 결과물을 담은 파일
    path: path.join(__dirname, 'dist'), // 결과물이 저장될 디렉토리
    publicPath: path.join(__dirname, 'dist') // 결과물이 저장될 디렉토리
  },
  //모듈 rules를 통해 .vue로 끝나는 파일들은 vue-loader를 사용하겠다고 정의 vue->js
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      // 이미지 파일 로더
      {
        test: /\.(png|jpe?g|gif|svg|webp)$/i,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[contenthash].[ext]'
          }
        }
      },
      {
        test: /\.mtl$/,
        loader: 'mtl-loader'
      },
      { test: /\.obj$/, loader: 'file-loader' }
    ]
  },
  //플러그인 vue-loder를 위해 vueloaderplugin 가져옴
  plugins: [new VueLoaderPlugin()]
}

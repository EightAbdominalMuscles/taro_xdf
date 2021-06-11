
const path = require('path')
const config = {
  projectName: 'JRXDF2021P1QWXYY',
  date: '2021-5-6',
  designWidth: 750,
  deviceRatio: {
    '640': 2.34 / 2,
    '750': 1,
    '828': 1.81 / 2
  },
  sourceRoot: 'src',
  outputRoot: 'dist',
  babel: {
    sourceMap: true,
    presets: [
      ['env', {
        modules: false
      }]
    ],
    plugins: [
      'transform-decorators-legacy',
      'transform-class-properties',
      'transform-object-rest-spread',
      ['transform-runtime', {
        'helpers': false,
        'polyfill': false,
        'regenerator': true,
        'moduleName': 'babel-runtime'
      }]
    ]
  },
  /**
   * alias： 别名
   * outputRoot：代码编译后的生产目录--打包h5|小程序...不冲突
   * defineConstants 用来配置一些全局变量供代码中进行使用
   */
  alias: {
    '@': path.resolve(__dirname, '..', 'src'),
    '@@': path.resolve(__dirname, '..', '')
  },
  outputRoot: `dist/${process.env.TARO_ENV}`,
  defineConstants: {
    IS_H5: process.env.TARO_ENV === "h5",
    IS_RN: process.env.TARO_ENV === "rn",
    IS_WEAPP: process.env.TARO_ENV === "weapp"
  },
  plugins: [
    '@tarojs/plugin-sass',
    '@tarojs/plugin-terser'
  ],
  defineConstants: {
  },
  mini: {
    postcss: {
      pxtransform: {
        enable: true,
        config: {}
      },
      url: {
        enable: true,
        config: {
          limit: 10240 // 设定转换尺寸上限
        }
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]'
        }
      }
    },
  },
  h5: {
    staticDirectory: 'static',
    imageUrlLoaderOption: {
      limit: 10485760,
    },
    
    postcss: {
      autoprefixer: {
        enable: true,
        config: {
          browsers: [
            'last 3 versions',
            'Android >= 4.1',
            'ios >= 8'
          ]
        }
      },
      pxtransform: {
        enable: false,
      },
      'postcss-px-to-viewport': {
        enable: true,
        config: {
          unitToConvert: 'px', //需要转换的单位，默认为"px"
          //! 按照高去适配宽,所以宽和高一样    *********** ********** **********"
          viewportWidth: 640, // 视窗的宽度，对应的是我们设计稿的宽度
          viewportHeight: 640, //视窗的高度，根据375设备的宽度来指定，一般指定667，也可以不配置
          unitPrecision: 3, // 指定`px`转换为视窗单位值的小数位数（很多时候无法整除）
          propList: ['*'], // 能转化为vw的属性列表
          viewportUnit: 'vh', // 指定需要转换成的视窗单位，建议使用vw
          fontViewportUnit: 'vh', //字体使用的视口单位
          selectorBlackList: ['.ignore-', '.hairlines', 'am-', 'px-', '.css'], //指定不转换为视窗单位的类，可以自定义，可以无限添加,建议定义一至两个通用的类名
          minPixelValue: 1, // 小于或等于`1px`不转换为视窗单位，你也可以设置为你想要的值
          mediaQuery: false, // 允许在媒体查询中转换`px`
          replace: true, //是否直接更换属性值，而不添加备用属性
          landscape: false, //是否添加根据 landscapeWidth 生成的媒体查询条件 @media (orientation: landscape)
          landscapeUnit: 'vw', //横屏时使用的单位
          landscapeWidth: 1134, //横屏时使用的视口宽度
          exclude: [/\/Stores\/.*.less/, /global.css/, /node_modules/], //忽略某些文件夹下的文件或特定文件，例如 'node_modules' 下的文件
        },
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]'
        }
      },
    }
  }
}

module.exports = function (merge) {
  if (process.env.NODE_ENV === 'development') {
    return merge({}, config, require('./dev'))
  }
  return merge({}, config, require('./prod'))
}

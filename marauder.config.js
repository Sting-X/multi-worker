module.exports = {
  // 控制 js,css 文件名是否添加 MD5 后缀
  hash: false,
  // 出于性能考虑，babel 编译将忽略 node_modules 目录
  // 对于 es6 模块，通过 esm 配置，通知 babel 添加额外支持
  esm: [],
  // 静态资源 CDN 路径
  publicPath: "./",
  // 生成 js 与 css source map
  sourceMap: false,
  //用于描述 组件 工程化相关属性
  pkgConfig: {
    noticeAfterPublish: false, //false,true,用于提示是否在版本发布的邮件提醒相关引用人员.
    noticeLevel: "minor" //patch minor major  分别对应 发小版本，中版本，大版本 以及以上才发，比如 prepatch ，preminor 都不进行触发。 默认为patch
  },
  // ftp 服务器配置
  ftp: {
    host: "",
    port: 0,
    user: "",
    password: "",
    // 上传成功后是否自动打开浏览器预览
    openBrowser: true,
    // 远程路径配置
    remotePath: {
      // 路径中是否包含版本号
      version: true
    }
  }
};

const fs = require('fs')
const globby = require('globby')
// https://github.com/image-size/image-size
const sizeOf = require('image-size')

// img 支持的格式 https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/img
const patterns = ['png', 'jpg', 'jpeg', 'gif', 'ico', 'webp'].map(
  ext => `assets/images/*.${ext}`
)
const TEMPLATE_HTML = './src.html'
const DIST_HTML = './dist.html'
globby(patterns).then(images => {
  const html = fs
    .readFileSync(TEMPLATE_HTML)
    .toString()
    .replace(
      '</body>',
      `  <script type="application/json" id="__images_path__">${JSON.stringify(
        images.map(i => ({
          path: `/${i}`,
          name: i.slice(i.lastIndexOf('/') + 1),
          // http://nodejs.cn/api/fs.html#fs_fs_statsync_path_options
          // http://nodejs.cn/api/fs.html#fs_stats_size
          size: Math.ceil(fs.statSync(i).size / 1024),
          wh: sizeOf(i)
        }))
      )}</script>\n</body>`
    )
  fs.writeFileSync(DIST_HTML, html, { flag: 'w' })
})

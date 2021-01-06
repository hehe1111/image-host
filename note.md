# note

## 原理

TODO:

## 性能分析

```html
<script src="../vendor/vue.min.js" defer="true"></script>
<script src="../assets/main.js" defer="true"></script>
```

`defer` **不会**暂停解析 HTML，所以执行 main.js 时，图片数据一定可以获取到。

**但有 `defer` 属性的脚本会阻止 `DOMContentLoaded` 事件**，直到脚本被**加载并且解析完成**。

- 耗时的加载
  - `./dist/index.html`
  - `./assets/style.css`
  - `./assets/loading.png`
  - `./vendor/vue.min.js`
  - `./assets/main.js`

### 性能优化方法

压缩 html/css/js 文件

## 图片懒加载

[demo/image-lazy-loading-demo](https://github.com/hehe1111/demo/tree/master/image-lazy-loading-demo)

## 点击复制图片链接

[demo/copy-demo](https://github.com/hehe1111/demo/tree/master/copy-demo)

## favicon.svg 根据黑暗模式进行适配

`favicon.svg`

```xml
<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="64px" height="64px" viewBox="0 0 64 64" enable-background="new 0 0 64 64" xml:space="preserve">
  <style>
    rect,polyline,circle {
      fill: #fff;
      stroke: #000;
      stroke-width: 2;
      stroke-miterlimit: 10;
    }
    @media (prefers-color-scheme: dark) {
      rect,polyline,circle {
        fill: #000;
        stroke: #fff;
      }
    }
  </style>
  <g><rect x="1" y="16" width="52" height="40"/></g>
  <polyline  points="10,14 10,8 63,8 63,48 55,48 "/>
  <polyline points="1,46 15,32 29,48 39,42 53,54 "/>
  <circle cx="40" cy="29" r="5"/>
</svg>
```

- [图片来源](https://www.easyicon.net/1182679-picture_multiple_icon.html)
- [Dark Mode Favicons](https://css-tricks.com/dark-mode-favicons/)

## 下载图片

```html
<a
  :href="createImageLink(previewImage.path)"
  :download="createImageLink(previewImage.path)"
  class="download"
  >⬇</a
>
```

注意：**`href` 属性和 `download` 属性同时都需要**

- [`<a>` - MDN](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/a)

`download` 属性值会作为下载完成后的文件名

> `download` 属性仅适用于**同源 URL**。
>
> 此属性对允许的值没有限制，但是 `/` 和 `\` 会被转换为下划线。大多数文件系统限制了文件名中的标点符号，故此，浏览器将相应地调整建议的文件名。
>
> 尽管 HTTP URL 需要位于同一源中，但是可以使用 blob: URL 和 data: URL ，以方便用户下载使用 JavaScript 生成的内容（例如使用在线绘图 Web 应用程序创建的照片）。

## 使用 `<script type="application/json">` 读写数据

- [How can I read a JSON in the script-tag from JavaScript?](https://stackoverflow.com/a/7956249/14449377)

## 使用 husky

- [typicode/husky](https://github.com/typicode/husky/tree/master)
  - Supported hooks: [githooks](https://git-scm.com/docs/githooks)
- 类似的库：`pre-commit`

## 参考链接

- [每个人都需要 github，每个人都需要图床，so，github = 图床](https://juejin.cn/post/6906791889777721352)
  - [MatrixAges/picpic](https://github.com/MatrixAges/picpic)
  - [PicPic](https://matrixage.github.io/picpic_example/)

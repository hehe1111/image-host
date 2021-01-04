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

## 参考链接

- [host github pages from /dist folder in master branch](https://stackoverflow.com/a/42501045/14449377)

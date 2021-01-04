const images = JSON.parse(
  document.getElementById('__images_path__').innerText.trim() || []
)

new Vue({
  el: '#app',
  data: {
    images
  }
})

/* === 懒加载图片 === */

const lazyImages = [].slice.call(document.getElementsByTagName('img'))
const wHeight = window.innerHeight

function lazyLoading() {
  const loadedIndexes = []
  lazyImages.map((i, index) => {
    if (!i) return
    const { top: eTop } = i.getBoundingClientRect()
    if (eTop < wHeight) {
      i.setAttribute('src', i.getAttribute('data-src'))
      loadedIndexes.push(index)
    }
  })

  loadedIndexes.map(i => (lazyImages[i] = undefined))
}

window.onscroll = lazyLoading
lazyLoading()

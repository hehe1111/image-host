const images = JSON.parse(
  document.getElementById('__images_path__').innerText.trim() || []
)

new Vue({
  el: '#app',
  data: {
    images,
    copiedLink: '',
    timerId: '',
    previewImage: null
  },
  mounted() {
    this.handleLazyLoading()
    this.handleCopy()
  },
  methods: {
    handleLazyLoading() {
      const lazyImages = [].slice.call(
        document.querySelectorAll('img.lazy-loading-image')
      )
      const wHeight = window.innerHeight

      const lazyLoading = () => {
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

      window.addEventListener('scroll', lazyLoading)
      this.$once('hook:beforeDestroy', () => {
        window.removeEventListener('scroll', lazyLoading)
      })
      lazyLoading()
    },
    handleCopy() {
      const onCopy = event => {
        event.clipboardData.setData(
          'text/plain',
          this.createImageLink(this.copiedLink)
        )
        event.preventDefault()
      }
      document.addEventListener('copy', onCopy)
      this.$once('hook:beforeDestroy', () => {
        document.removeEventListener('copy', onCopy)
      })
    },
    createImageLink(imagePath) {
      return `${window.location.origin}/image-host${imagePath.slice(2)}`
    },
    copyLink(imagePath) {
      this.copiedLink = imagePath
      document.execCommand('copy')
      const { className, classList } = this.$refs.copySuccess
      if (!className.includes('show')) return this.toggleCopySuccess()
      clearTimeout(this.timerId)
      classList.remove('show')
      setTimeout(this.toggleCopySuccess, 400)
    },
    toggleCopySuccess() {
      const { classList } = this.$refs.copySuccess
      classList.add('show')
      this.timerId = setTimeout(() => classList.remove('show'), 2000)
    },
    onPreview(image) {
      this.previewImage = image
      this.$nextTick(() => {
        /* 解决刷新页面时 defer 脚本导致的 .preview 元素闪现的问题 */
        const { className, classList } = this.$refs.preview
        className.includes('hide') && classList.remove('hide')
      })
    },
    onClosePreview() {
      this.previewImage = null
    }
  }
})

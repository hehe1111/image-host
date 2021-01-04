const images = JSON.parse(
  document.getElementById('__images_path__').innerText.trim() || []
)

new Vue({
  el: '#app',
  data: {
    images,
    copiedLink: '',
    timerId: ''
  },
  mounted() {
    this.handleLazyLoading()
    this.handleCopy()
  },
  methods: {
    handleLazyLoading() {
      const lazyImages = [].slice.call(document.getElementsByTagName('img'))
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
          `${window.location.origin}/image-host${this.copiedLink.slice(2)}`
        )
        event.preventDefault()
      }
      document.addEventListener('copy', onCopy)
      this.$once('hook:beforeDestroy', () => {
        document.removeEventListener('copy', onCopy)
      })
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
    }
  }
})

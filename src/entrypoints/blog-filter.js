if (!customElements.get('blog-grid')) {
  customElements.define(
    'blog-grid',
    class BlogGrid extends HTMLElement {
      constructor() {
        super()

        const blogGrid = document.getElementById('blogGrid')
        if (!blogGrid) return

        this.blogUrl = blogGrid.dataset.url
        this.sectionId = blogGrid.dataset.sectionId
        this.tagInputs = blogGrid.querySelectorAll('input[name="blog_tag"]')

        this.tagInputs.forEach((input) => {
          input.addEventListener('change', () => {
            this.filterByTag(input.value)
          })
        })
      }

      filterByTag(tagValue) {
        const blogGrid = document.getElementById('blogGrid')
        if (!blogGrid) return

        // Build URL
        let fetchUrl
        if (tagValue === 'all') {
          fetchUrl = `${this.blogUrl}?sections=${this.sectionId}`
        } else {
          fetchUrl = `${this.blogUrl}/tagged/${tagValue}?sections=${this.sectionId}`
        }

        // Update browser URL
        let newPageUrl
        if (tagValue === 'all') {
          newPageUrl = this.blogUrl
        } else {
          newPageUrl = `${this.blogUrl}/tagged/${tagValue}`
        }

        // Add loading state
        blogGrid.classList.add('opacity-50')

        // Fetch and replace
        fetch(fetchUrl)
          .then((res) => res.json())
          .then((res) => {
            blogGrid.outerHTML = res[this.sectionId]
            window.history.replaceState({}, '', newPageUrl)
          })
          .catch((error) => {
            console.error('Error:', error)
            blogGrid.classList.remove('opacity-50')
          })
      }
    }
  )
}

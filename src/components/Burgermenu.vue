<template>
  <div id="burgermenu">
    <div ref="sideNav" class="bm-menu">
      <nav class="bm-item-list">
        <slot></slot>
      </nav>
      <span class="bm-cross-button cross-style" @click="closeMenu" :class="{ hidden: !crossIcon }">
        <font-awesome-icon class="icon-size" :icon="['fas','times']"></font-awesome-icon>
      </span>
    </div>
    <div ref="bmBurgerButton" class="bm-burger-button" @click="openMenu" :class="{ hidden: !burgerIcon }">
      <span class="bm-burger-bars line-style" :style="{top:20 * (index * 2) + '%'}" v-for="(x, index) in 3" :key="index"></span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'menubar',
  data () {
    return {
      isSideBarOpen: false
    }
  },
  props: {
    isOpen: {
      type: Boolean,
      required: false
    },
    right: {
      type: Boolean,
      required: false
    },
    width: {
      type: [String],
      required: false,
      default: '300'
    },
    disableEsc: {
      type: Boolean,
      required: false
    },
    noOverlay: {
      type: Boolean,
      required: false
    },
    onStateChange: {
      type: Function,
      required: false
    },
    burgerIcon: {
      type: Boolean,
      required: false,
      default: true
    },
    crossIcon: {
      type: Boolean,
      required: false,
      default: true
    },
    disableOutsideClick: {
      type: Boolean,
      required: false,
      default: false
    },
    closeOnNavigation: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  methods: {
    openMenu () {
      this.$emit('openMenu')
      this.isSideBarOpen = true

      if (!this.noOverlay) {
        document.body.classList.add('bm-overlay')
      }
      if (this.right) {
        this.$refs.sideNav.style.left = 'auto'
        this.$refs.sideNav.style.right = '0px'
      }
      this.$nextTick(function () {
        this.$refs.sideNav.style.width = this.width ? this.width + 'px' : '300px'
      })
    },

    closeMenu () {
      this.$emit('closeMenu')
      this.isSideBarOpen = false
      document.body.classList.remove('bm-overlay')
      this.$refs.sideNav.style.width = '0px'
    },

    closeMenuOnEsc (e) {
      e = e || window.event
      if (e.key === 'Escape' || e.keyCode === 27) {
        this.closeMenu()
      }
    },
    documentClick (e) {
      const element = this.$refs.bmBurgerButton
      let target = null
      if (e && e.target) {
        target = e.target
      }

      if (
        element &&
        element !== target &&
        !element.contains(target) &&
        !this.hasClass(target, 'bm-menu') &&
        this.isSideBarOpen &&
        !this.disableOutsideClick
      ) {
        this.closeMenu()
      } else if (
        element &&
        this.hasClass(target, 'bm-menu') &&
        this.isSideBarOpen &&
        this.closeOnNavigation
      ) {
        this.closeMenu()
      }
    },
    hasClass (element, className) {
      do {
        if (element.classList && element.classList.contains(className)) {
          return true
        }
        element = element.parentNode
      } while (element)
      return false
    }
  },

  mounted () {
    if (!this.disableEsc) {
      document.addEventListener('keyup', this.closeMenuOnEsc)
    }
  },
  created: function () {
    document.addEventListener('click', this.documentClick)
  },
  destroyed: function () {
    document.removeEventListener('keyup', this.closeMenuOnEsc)
    document.removeEventListener('click', this.documentClick)
  },
  watch: {
    isOpen: {
      deep: true,
      immediate: true,
      handler (newValue, oldValue) {
        this.$nextTick(() => {
          if (!oldValue && newValue) {
            this.openMenu()
          }
          if (oldValue && !newValue) {
            this.closeMenu()
          }
        })
      }
    },
    right: {
      deep: true,
      immediate: true,
      handler (oldValue, newValue) {
        if (oldValue) {
          this.$nextTick(() => {
            this.$refs.bmBurgerButton.style.left = 'auto'
            this.$refs.bmBurgerButton.style.right = '36px'
            this.$refs.sideNav.style.left = 'auto'
            this.$refs.sideNav.style.right = '0px'
            document.querySelector('.bm-burger-button').style.left = 'auto'
            document.querySelector('.bm-burger-button').style.right = '36px'
            document.querySelector('.bm-menu').style.left = 'auto'
            document.querySelector('.bm-menu').style.right = '0px'
            document.querySelector('.cross-style').style.right = '250px'
          })
        }
        if (newValue) {
          if (
            this.$refs.bmBurgerButton.hasAttribute('style')
          ) {
            this.$refs.bmBurgerButton.removeAttribute('style')
            this.$refs.sideNav.style.right = 'auto'
            document
              .querySelector('.bm-burger-button')
              .removeAttribute('style')
            document.getElementById('sideNav').style.right = 'auto'
            document.querySelector('.cross-style').style.right = '0px'
          }
        }
      }
    }
  }
}
</script>

import Vue from 'vue'

Vue.directive('focus', {
  inserted (el) {
    // Focus the element
    el.focus()
  }
})

Vue.directive('click-outside', {
  bind (el, binding, vNode) {
    el.clickOutsideEvent = (event) => {
      // here I check that click was outside the el and his children
      if (!(el === event.target || el.contains(event.target))) {
        // and if it did, call method provided in attribute value
        vNode.context[binding.expression](event)
      }
    }
    document.body.addEventListener('click', el.clickOutsideEvent)
  },
  unbind (el) {
    document.body.removeEventListener('click', el.clickOutsideEvent)
  }
})

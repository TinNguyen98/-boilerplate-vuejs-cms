
export default {
  methods: {
    /**
     * Submit Action
     */
    onSuccess (mess, des) {
      this.$notification.success({
        message: mess,
        description: des
      })
    },

    /**
     * Submit Error
     */
    onError (mess, des) {
      this.$notification.error({
        message: mess,
        description: des
      })
    }
  }
}

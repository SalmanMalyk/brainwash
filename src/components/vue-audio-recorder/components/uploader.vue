<style lang="scss">
  @import '../scss/icons';
</style>

      <template>
        <icon-button name="save" class="ar-icon ar-icon__xs ar-icon--no-border" @click.native="upload"/>
                </template>

                <script>
        import IconButton from './icon-button'
        import UploaderPropsMixin from '../mixins/uploader-props'

        export default {
          mixins: [UploaderPropsMixin],
          props: {
            record: { type: Object }
          },
          components: {
            IconButton
          },
          methods: {
            async upload () {
              this.$eventBus.$emit('start-upload')
              const reader = new FileReader();
              let convertedBlobString = ''
              reader.readAsDataURL(this.record.blob);
              const vm = this;
              reader.onloadend = await function() {
                convertedBlobString = reader.result;
                const saveData = {
                  cardType: vm.record.cardType,
                  cardNumber: vm.record.cardNumber,
                  recordData: convertedBlobString
                }
                vm.$store.commit('setRecord', saveData)
                vm.$eventBus.$emit('end-upload', { status: 'success', response: 'resp' })
              }
        //       const convertedBlobString = await (new Response(this.record.blob)).text();
        // const saveData = {
        //   cardType: this.record.cardType,
        //   cardNumber: this.record.cardNumber,
        //   recordData: this.record.blob
        // }
        // console.log(saveData)
        // this.$store.commit('setRecord', saveData)
        // this.$eventBus.$emit('end-upload', { status: 'success', response: 'resp' })
        // this.$eventBus.$emit('end-upload', { status: 'fail', response: 'error' })
      }
    }
  }
</script>

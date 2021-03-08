<template>
    <VueRecordAudio v-if="mimeType !== null" @result="storeRecord" :mimeType="mimeType" @stream="stream"/>
    <VueRecordAudio v-else @result="storeRecord" @stream="stream"/>
</template>

<script>
    import Bowser from "bowser";
    import VueRecordAudio from '../../components/vue-record-master/src/components/VueRecordAudio'
    export default {
        name: "audio-recorder-hold",
        props: [
            'cardType',
            'cardNumber',
            'mimeType',
        ],
        components: {
          VueRecordAudio
        },
        methods: {
            stream (data) {
                // data.mimeType = 'audio/webm'
                // data.type = 'audio/webm'
              // console.log(data.mimeType)
            },
            async storeRecord(data) {
                const reader = new FileReader();
                let convertedBlobString = ''
                if (data.type === '') {
                    data = data.slice(0, data.size, 'audio/wav')
                }
                if (data.type === 'audio/wave') {
                    data = data.slice(0, data.size, 'audio/wav')
                }
                reader.readAsDataURL(data);
                const vm = this;
                reader.onloadend = await function() {
                    convertedBlobString = reader.result;
                    const saveData = {
                        cardType: vm.cardType,
                        cardNumber: vm.cardNumber,
                        recordData: convertedBlobString
                    }
                    vm.$store.commit('setRecord', saveData)
                }
            },
        },
    }
</script>

<style scoped>

</style>

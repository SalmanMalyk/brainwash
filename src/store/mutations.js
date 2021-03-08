const mutations = {
    setRecord (state, { cardType, cardNumber, recordData }) {
        state.voiceData[cardType][cardNumber] = recordData;
    },
    setUser (state, data) {
        state.user = data
    },
    setFakeScreen (state, data) {
        state.fakeScreen = data
    },
    setMarginTop (state, data) {
        state.marginTop = data
    },
}

export default mutations

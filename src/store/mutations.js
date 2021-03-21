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
    setTop (state, data) {
        state.top = data
    },
    setLeft (state, data) {
        state.left = data
    },
}

export default mutations

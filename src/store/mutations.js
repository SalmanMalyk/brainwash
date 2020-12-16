const mutations = {
    setRecord (state, { cardType, cardNumber, recordData }) {
        state.voiceData[cardType][cardNumber] = recordData;
    },
    setUser (state, data) {
        state.user = data
    },
}

export default mutations

const mutations = {
    setRecord (state, { cardType, cardNumber, recordData }) {
        state.voiceData[cardType][cardNumber] = recordData;
    },
}

export default mutations

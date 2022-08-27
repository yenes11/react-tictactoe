const reducer = (state, action) => {
    switch(action.type) {
        case 'X_WON':
            return {
                ...state,
                scores: state.scores = {...state.scores, x: state.scores.x + 1}
            }
        case 'Y_WON':
            return {
                ...state,
                scores: state.scores = {...state.scores, y: state.scores.y + 1}
            }
        default:
            return state;
    }
}

export default reducer;
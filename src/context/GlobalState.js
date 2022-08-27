import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";

const initialState = {
    scores: {x: 0, y: 0}
}

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({children}) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);

    function xWon() {
        dispatch({
            type: 'X_WON'
        });
    }

    function yWon(transaction) {
        dispatch({
            type: 'Y_WON'
        });
    }

    return (<GlobalContext.Provider value={{ scores: state.scores, xWon, yWon }}>
        {children}
    </GlobalContext.Provider>)
}
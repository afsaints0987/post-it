/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import {ReactNode, createContext, useReducer} from "react";

interface StateProps {
    username: string,
    email: string,
    isAuthenticated?: boolean
}

const initialState = {
    username: "",
    email:"",
    isAuthenticated: false
}

export interface UserContextProps {
    state :StateProps,
    dispatch: React.Dispatch<{type: string; payload: any}>
}

export const UserContext = createContext<UserContextProps | any>(undefined)

const reducer = (state: StateProps, action: { type: string; payload: any; }) => {
    switch (action.type){
        case 'LOGIN':
            return {
                ...state,
            }
        case 'LOGOUT':
            return initialState;
        default:
            return state
    }
};

export const UserProvider = ({children}: {children: ReactNode}) => {
    const userData = JSON.parse(localStorage.getItem("userInfo") || "{}")
    const [state, dispatch] = useReducer(reducer, {...initialState, ...userData})

    return (
        <UserContext.Provider value={{state, dispatch}}>
            {children}
        </UserContext.Provider>
    )
}


/* eslint-disable @typescript-eslint/no-explicit-any */
import {ReactNode, createContext, useReducer} from "react";

interface StateProps {
    email: string,
    password: string,
    isAuthenticated?: boolean
}

const initialState = {
    email: "",
    password:"",
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
                isAuthenticated: true
            }
        case 'LOGOUT':
            return initialState;
        default:
            return state
    }
};

export const UserProvider = ({children}: {children: ReactNode}) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    return (
        <UserContext.Provider value={{state, dispatch}}>
            {children}
        </UserContext.Provider>
    )
}


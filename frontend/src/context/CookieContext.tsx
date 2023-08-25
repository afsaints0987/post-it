/* eslint-disable @typescript-eslint/no-explicit-any */
import {ReactNode, createContext} from 'react'
import {useCookies} from 'react-cookie'

export const CookieContext = createContext<any>(undefined)

export const CookieProvider = ({children}: {children: ReactNode}) => {
    const [cookies] = useCookies(['jwt'])

    console.log(cookies)

    return (
        <CookieContext.Provider value={[cookies]}>
            {children}
        </CookieContext.Provider>
    )
}
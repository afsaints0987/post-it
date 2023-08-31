/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import {UserContext, UserContextProps} from '../context/UserContext'
import { http } from '../config/axios'
import {AxiosError} from 'axios'

interface UserProps {
    email: string,
    password: string
}

export const useLogin = () => {
    const [error, setError] = React.useState("")
    const {dispatch} = React.useContext<UserContextProps>(UserContext)
    const login = async (user: UserProps) => {

        try {
            const response = await http.post('users/login', user, {
                withCredentials: true
            })
            const userData = await response.data
            
            const userInfo = {
                username: userData.username,
                email: userData.email,
                isAuthenticated: true
            }
            
            localStorage.setItem('userInfo', JSON.stringify(userInfo))
            dispatch({type: 'LOGIN', payload: userInfo})
            window.location.replace("/")

        } catch (err) {
            const axiosError = err as AxiosError<any>
            if(axiosError) {
                console.log(axiosError.response?.data.message)
                setError(axiosError.response?.data.message)

                setTimeout(() => {
                    setError("")
                }, 2500)
            } else {
                console.error('An error occured')
            }
        }
    }

    return {login, error, dispatch}
}


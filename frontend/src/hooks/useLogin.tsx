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
    const [success, setSuccess] = React.useState("")
    const {dispatch} = React.useContext<UserContextProps>(UserContext)

    const login = async (user: UserProps) => {

        try {
            const response = await http.post('users/login', user)
            const userData = await response.data
            console.log(userData)

            dispatch({type: 'LOGIN', payload: userData})

            setSuccess(userData.message)

            setTimeout(() => {
                setSuccess("")
            }, 2500)
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

    return {login, error, success}
}


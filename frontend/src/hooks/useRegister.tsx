/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { http } from '../config/axios'
import {AxiosError} from 'axios'
import {useNavigate} from "react-router-dom"


interface RegisterProps {
    username: string
    email: string,
    password: string
}

export const useRegister = () => {
    const [error, setError] = React.useState("")
    const navigate = useNavigate()
    const register = async (user: RegisterProps) => {

        try {
            const response = await http.post('users', user)
            const registerData = await response.data
            console.log(registerData)
            navigate('/login')

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

    return {register, error}
}


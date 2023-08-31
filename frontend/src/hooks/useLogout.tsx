import React from 'react';
import { UserContext, UserContextProps } from '../context/UserContext';
import { http } from '../config/axios';

export const useLogout = () => {
    const { dispatch } = React.useContext<UserContextProps>(UserContext);

    const logout = async () => {
        try {
            await http.post('users/logout', null, {
                withCredentials: true
            });

            dispatch({
                type: 'LOGOUT',
                payload: undefined
            });
            
            localStorage.removeItem('userInfo')
        } catch (err) {
            console.error('An error occurred', err);
        }
    };

    return { logout };
};

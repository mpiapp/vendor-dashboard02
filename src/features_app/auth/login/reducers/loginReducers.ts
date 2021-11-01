import { createAsyncThunk } from '@reduxjs/toolkit';
import crypto from 'crypto-js'; 
import Axios from 'axios'
import {
    InputState
} from '../loginTypes'

export const loginAction = createAsyncThunk(
    'auth/login',
    async (value : InputState , { rejectWithValue }) => {

        const body = {
            email : value.email,
            password : value.password,
        }
        try {
            const response : any = await Axios.post(`${process.env.REACT_APP_API_URL_STAGING}/admin/login`, body)
            if(response) {
                let headers = {
                    'Content-Type': 'application/json',
                    'token': response.data.access_token
                }
                try {
                    const profil : any = await Axios.post(`${process.env.REACT_APP_API_URL_STAGING}/admin/user-access`, {}, {
                        headers: headers
                    })
                    let data = {
                        access_token : response.data.access_token,
                        id_token : response.data.id_token, 
                        expires_in : response.data.expires_in,
                        email : profil.data.profile_user.email,
                        fullname : profil.data.profile_user.name, 
                        role : profil.data.profile_user.role, 
                        avatar : profil.data.avatar,
                        auth_id : profil.data.auth_id,
                        login: true
                    }
                    const saveToLocalStorage = crypto.AES.encrypt(JSON.stringify(data), `${process.env.REACT_APP_CRYPTO_SECRET}`).toString();
                    localStorage.setItem('_?credentials', saveToLocalStorage)
                    return data

                } catch (err : any) {
                    if (!err.profil) {
                        throw err
                    }
                    return rejectWithValue(err.profil.data)
                }
            }
          } catch (err : any) {
            if (!err.response) {
              throw err
            }
            return rejectWithValue(err.response.data)
        }
    }
  );

/* istanbul ignore file */

import { createAsyncThunk } from '@reduxjs/toolkit';
// import { userCredentials } from '../../../../utilities/config';
import axios from 'axios';
import { userCredentials } from '../../../../utilities/config';

export const getPurchaseOrdersData = createAsyncThunk(
    'purchase-orders/get',
    async (_, { rejectWithValue }) => { 
        try {
            const response : any = await axios.get(`${process.env.REACT_APP_API_HOST}/fulfillment`, {
                params : {
                    id : "idheany121"
                }
            })
            if(response.data.errors === null) {
                localStorage.setItem('orders_fullfilment', JSON.stringify(response.data.data))
                return {data : response.data.data, message : response.data.message}
            } else {
                return rejectWithValue(response.data.message)
            }
          } catch (err : any) {
            if (!err.response) {
              throw err
            }
            return rejectWithValue(err.response)
        }
    }
);

export const getPurchaseOrdersWaitingDP = createAsyncThunk(
    'purchase-orders/get-dp',
    async (_, { rejectWithValue }) => { 
        try {
            const response : any = await axios.get(`${process.env.REACT_APP_API_HOST}/fulfillment/Orders`, {
                params : {
                    id : "idheany121"
                }
            })
            if(response.data.errors === null) {
                return {data : response.data.data, message : response.data.message}
            } else {
                return rejectWithValue(response.data.message)
            }
          } catch (err : any) {
            if (!err.response) {
              throw err
            }
            return rejectWithValue(err.response)
        }
    }
);


export const postPickPurchaseOrders = createAsyncThunk(
    'purchase-orders/pick',
    async (value : any, { rejectWithValue }) => { 
        try {
            const response : any = await axios.post(`${process.env.REACT_APP_API_HOST}/fulfillment/Pick`, value)
            if(response.data.errors === null) {
                return {data : true, message : response.data.message}
            } else {
                return rejectWithValue(response.data.message)
            }
          } catch (err : any) {
            if (!err.response) {
              throw err
            }
            return rejectWithValue(err.response)
        }
    }
);

export const postPackPurchaseOrders = createAsyncThunk(
    'purchase-orders/pack',
    async (value : any, { rejectWithValue }) => { 
        try {
            const response : any = await axios.post(`${process.env.REACT_APP_API_HOST}/fulfillment/Pack`, value)
            if(response.data.errors === null) {
                return {data : true, message : response.data.message}
            } else {
                return rejectWithValue(response.data.message)
            }
          } catch (err : any) {
            if (!err.response) {
              throw err
            }
            return rejectWithValue(err.response)
        }
    }
);

export const postDeliveryNotePurchaseOrders = createAsyncThunk(
    'purchase-orders/delivery-note',
    async (value : any, { rejectWithValue }) => { 
        try {
            const response : any = await axios.post(`${process.env.REACT_APP_API_HOST}/delivery-note`, value)
            if(response.data.errors === null) {
                return {data : true, message : response.data.message}
            } else {
                return rejectWithValue(response.data.message)
            }
          } catch (err : any) {
            if (!err.response) {
              throw err
            }
            return rejectWithValue(err.response)
        }
    }
);

export const postConfirmationDP = createAsyncThunk(
    'purchase-orders/confirm-dp',
    async (value : any, { rejectWithValue }) => { 
        try {
            const body = {
                "id": value.id,
                "nominal": value.nominal,
                "name": userCredentials.fullname
            }
            const response : any = await axios.post(`${process.env.REACT_APP_API_HOST}/fulfillment/Approval`, body)
            if(response.data.errors === null) {
                return {data : true, message : response.data.message}
            } else {
                return rejectWithValue(response.data.message)
            }
          } catch (err : any) {
            if (!err.response) {
              throw err
            }
            return rejectWithValue(err.response)
        }
    }
);


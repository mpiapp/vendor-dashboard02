import { createSlice } from '@reduxjs/toolkit';
import swal from 'sweetalert'
// import {
//   IStatePurchaseOrders
// } from './purchaseOrdersTypes'
import { getPurchaseOrdersData, getPurchaseOrdersWaitingDP, postConfirmationDP, postDeliveryNotePurchaseOrders, postPackPurchaseOrders, postPickPurchaseOrders } from './reducers/purchaseOrdersReducers';


const initialState: any = {
  data: [], 
  data_dp : [],
  loading : true,
  loading_pick : false,
  loading_pack : false,
  loading_dp : true,
  pick : false,
  pack : false,
  delivery : false,
  error : null,
  error_pick : null,
  error_pack : null,
  loading_delivery : null,
  error_dp : null,
  confirm : false,
  loading_confirm : false,
  error_confirm : null,
  error_delivery : null,

};

export const getPurchaseOrders = createSlice({
  name: 'purchase-orders',
  initialState, 
  reducers: {},
  extraReducers: (builder) => {
    builder
      // get purchase orders from db
      .addCase(getPurchaseOrdersData.pending, (state) => {
        state.loading = true;
      })
      .addCase(getPurchaseOrdersData.fulfilled, (state, action:any) => {
        state.loading = false;
        state.data = action.payload.data;
      })
      .addCase(getPurchaseOrdersData.rejected, (state, action : any) => {
        state.loading = false;
        state.error = action.payload; 
        swal("Error", `${action.payload}`, 'error')
      })
      // post pick purchase request
      .addCase(postPickPurchaseOrders.pending, (state) => {
        state.loading_pick = true;
      })
      .addCase(postPickPurchaseOrders.fulfilled, (state, action:any) => {
        state.loading_pick = false;
        state.pick = action.payload.data;
      })
      .addCase(postPickPurchaseOrders.rejected, (state, action : any) => {
        state.loading_pick = false;
        state.error_pick = action.payload; 
        swal("Error", `${action.payload}`, 'error')
      })
      // post pack purchase request
      .addCase(postPackPurchaseOrders.pending, (state) => {
        state.loading_pack = true;
      })
      .addCase(postPackPurchaseOrders.fulfilled, (state, action:any) => {
        state.loading_pack = false;
        state.pack = action.payload.data;
      })
      .addCase(postPackPurchaseOrders.rejected, (state, action : any) => {
        state.loading_pack = false;
        state.error_pack = action.payload; 
        swal("Error", `${action.payload}`, 'error')
      })
      // post delivery note purchase request
      .addCase(postDeliveryNotePurchaseOrders.pending, (state) => {
        state.loading_delivery = true;
      })
      .addCase(postDeliveryNotePurchaseOrders.fulfilled, (state, action:any) => {
        state.loading_delivery = false;
        state.delivery = action.payload.data;
      })
      .addCase(postDeliveryNotePurchaseOrders.rejected, (state, action : any) => {
        state.loading_delivery = false;
        state.error_delivery = action.payload; 
        swal("Error", `${action.payload}`, 'error')
      })
      // get all waiting dp
      .addCase(getPurchaseOrdersWaitingDP.pending, (state) => {
        state.loading_dp = true;
      })
      .addCase(getPurchaseOrdersWaitingDP.fulfilled, (state, action:any) => {
        state.loading_dp = false;
        state.data_dp = action.payload.data;
      })
      .addCase(getPurchaseOrdersWaitingDP.rejected, (state, action : any) => {
        state.loading_dp = false;
        state.error_dp = action.payload; 
        swal("Error", `${action.payload}`, 'error')
      })
      // confirmation dp
      .addCase(postConfirmationDP.pending, (state) => {
        state.loading_confirm = true;
      })
      .addCase(postConfirmationDP.fulfilled, (state, action:any) => {
        state.loading_confirm = false;
        state.confirm = action.payload.data;
      })
      .addCase(postConfirmationDP.rejected, (state, action : any) => {
        state.loading_confirm = false;
        state.error_confirm= action.payload; 
        swal("Error", `${action.payload}`, 'error')
      })
      
  },
});

export default getPurchaseOrders.reducer;

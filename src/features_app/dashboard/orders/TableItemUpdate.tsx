import React, { useEffect } from 'react';
import { 
    Table,
    TableBody,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TableCell,
    Box,
    Button,
    TextField,
    Stack,
    CircularProgress
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { postPickPurchaseOrders } from './reducers/purchaseOrdersReducers';
import { RootState } from '../../../app/store';
import swal from 'sweetalert';


const TableItemUpdate : React.FC<any> = ({ data, onChangeQuantity, vendorId, code_po, code_package, id_package, onChangePrice }) => {

  const dispatch = useDispatch()

  const store_purchaseorders = useSelector((state : RootState) => state.purchase_orders)

  const onChangeQty = (row : any, qty : any) => {
    let copy_array = [...data]
    if(qty >= "1" ) {
      const newData = copy_array.map((obj : any) => {
        if(obj._id === row._id)
           return {
             ...obj,
             quantity: parseInt(qty),
             sub_total: qty * row.discount_price
           }
        return obj
      });
      onChangeQuantity(newData, code_package)
    }
  }

  const onChangePriceUpdate = (row : any, price : any) => {
    let copy_array = [...data]
    let discount = row.discount / 100
    let discout_price = discount * parseInt(price)
    if(price >= "0" ) {
      const newData = copy_array.map((obj : any) => {
        if(obj._id === row._id)
           return {
             ...obj,
             retail_price: price,
             discount_price: (price - discout_price),
             sub_total: row.quantity * (price - discout_price)
           }
        return obj
      });
      onChangePrice(newData, code_package)
    }
  }

  const onSubmitPickPack = () => {
    const data_send = {
      code_po : code_po,
      vendorId : vendorId,
      id : id_package,
      items : data
    }
    dispatch(postPickPurchaseOrders(data_send))
  }

  useEffect(() => {
    if(store_purchaseorders.pick) {
        swal('Success', "Success created Pick Package", 'success')
        setTimeout(() => {
            window.location.reload()
        }, 1500);
    }
  }, [store_purchaseorders.pick]);

  return (
    <Box>
        <TableContainer component={Paper}>
          <Table aria-label="simple table"  > 
              <TableHead>
                <TableRow >
                    <TableCell style={{fontWeight: 700, }}>SKU</TableCell>
                    <TableCell style={{fontWeight: 700, }}>NAME</TableCell>
                    <TableCell style={{fontWeight: 700,}}>RETAIL PRICE</TableCell>
                    <TableCell style={{fontWeight: 700, width: "150px"}}>DISCOUNT</TableCell>
                    <TableCell style={{fontWeight: 700, }}>PRICE AFTER DISCOUNT</TableCell>
                    <TableCell style={{fontWeight: 700, width: "150px"}}>QTY</TableCell>
                    <TableCell style={{fontWeight: 700,}}>SUB TOTAL</TableCell>
                </TableRow>
              </TableHead>
              <TableBody >
              { data.map((row :any, i : any) => (
                <TableRow key={i} >
                  <TableCell component="th" scope="row">
                    {row.sku}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <TextField
                      label="Price"
                      value={row.retail_price}
                      onChange={(e) => onChangePriceUpdate(row, e.target.value)}
                      type="number"
                      size="small"
                    />
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row.discount}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    RP. {row.discount_price.toLocaleString()}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <TextField
                      label="Quantity"
                      value={row.quantity}
                      onChange={(e) => onChangeQty(row, e.target.value)}
                      type="number"
                      size="small"
                    />
                  </TableCell>
                  <TableCell component="th" scope="row">
                    RP. {row.sub_total.toLocaleString()}
                  </TableCell>
                </TableRow>
              ))}
              </TableBody>
          </Table>
        </TableContainer>
        <Stack flexDirection="row" justifyContent="flex-end" >
          <Box mt={2}>
            <Button variant="contained" color="primary" onClick={() => onSubmitPickPack()}>
              { store_purchaseorders.loading_pick ? 
                  <div>Loading.. <CircularProgress size={20} color="inherit"/> </div> :
                  "Submit"
              }
            </Button>
          </Box>
        </Stack>
    </Box>
  );
}

export default TableItemUpdate
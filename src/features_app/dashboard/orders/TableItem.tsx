import React from 'react';
import { 
    Table,
    TableBody,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TableCell,
    Box
} from '@mui/material';


const TableItem : React.FC<any> = ({ data }) => {

  return (
    <Box>
        <TableContainer component={Paper}>
          <Table aria-label="simple table"  > 
              <TableHead>
                <TableRow >
                    <TableCell style={{fontWeight: 700, }}>SKU</TableCell>
                    <TableCell style={{fontWeight: 700, }}>NAME</TableCell>
                    <TableCell style={{fontWeight: 700,}}>RETAIL PRICE</TableCell>
                    <TableCell style={{fontWeight: 700}}>DISCOUNT</TableCell>
                    <TableCell style={{fontWeight: 700, }}>DISCOUNT PRICE</TableCell>
                    <TableCell style={{fontWeight: 700}}>QTY</TableCell>
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
                    RP. {row.retail_price.toLocaleString()}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row.discount}%
                  </TableCell>
                  <TableCell component="th" scope="row">
                    RP. {row.discount_price.toLocaleString()}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row.quantity}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    RP. {row.sub_total.toLocaleString()}
                  </TableCell>
                </TableRow>
              ))}
              </TableBody>
          </Table>
        </TableContainer>
    </Box>
  );
}

export default TableItem
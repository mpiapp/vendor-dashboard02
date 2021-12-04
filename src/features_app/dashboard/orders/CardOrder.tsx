import React, { useEffect } from 'react'
import { 
    Box, 
    Paper, 
    Grid, 
    Button,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Stack,
    CircularProgress
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TableItem from './TableItem';
import moment from 'moment'
import TableItemUpdate from './TableItemUpdate';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../app/store';
import { postDeliveryNotePurchaseOrders, postPackPurchaseOrders } from './reducers/purchaseOrdersReducers';
import swal from 'sweetalert';
import { userCredentials } from '../../../utilities/config';


const CardOrder : React.FC<any> = ({ 
    data, 
    functionChangeUpdate,
    functionChangeQuantity, 
    functionChangePrice
}) => {

    const dispatch = useDispatch()

    const store_purchaseorders = useSelector((state : RootState) => state.purchase_orders)

    const onChangeQuantity = (newData:any, id_package : string) => {
        functionChangeQuantity(newData, id_package)
    }

    const onChangePrice = (newData:any, id_package : string) => {
        functionChangePrice(newData, id_package)
    }

    const changeTableUpdate = (id_package : string, update : string, items : any) => {
        functionChangeUpdate(id_package, update, items)
    }


    const onClickCreatePack = (items : any, ) => {
        const data_send = {
            code_po : items.code_po,
            vendorId : items.vendorId,
            id : items._id,
            items : items.items
        }
        dispatch(postPackPurchaseOrders(data_send))
    }

    const onClickCreateRTS = (items : any, ) => {
        const data_send = {
            code_po : items.code_po,
            vendorId : items.vendorId,
            buyerId : items.buyerId,
            addressId : items.addressId,
            packageId : items._id,
            orderId : "null",
            date: new Date(),
            createdBy : userCredentials.fullname,
            items : items.items,
            vendor_name : items.vendor_name
        }
        dispatch(postDeliveryNotePurchaseOrders(data_send))
    }

    useEffect(() => {
        if(store_purchaseorders.pack) {
            swal('Success', "Success created pack Package", 'success')
            setTimeout(() => {
                window.location.reload()
            }, 1500);
        }
      }, [store_purchaseorders.pack]);

      useEffect(() => {
        if(store_purchaseorders.delivery) {
            swal('Success', "Success created delivery note", 'success')
            setTimeout(() => {
                window.location.reload()
            }, 1500);
        }
      }, [store_purchaseorders.delivery]);

    return (
    <Stack>
        <div>
            { data?.map((val : any, i : any) => (
                <Box mb={4} mt={4} key={i} >
                    <Paper elevation={2}>
                        <Paper>
                            <Grid container spacing={2} justifyContent="space-between">
                                <Grid item>
                                    <Box fontWeight="bold" pl={2}> Order ID : {val.code_po}</Box>
                                    <Box fontWeight="normal" pl={2} pb={1} fontSize={13}> Date : {moment(val.date).format('ll')}</Box>
                                </Grid>
                            </Grid>
                        </Paper>
                        <Box p={2}>
                            <Grid container spacing={3} >
                                <Grid item xl={6} lg={6} md={6} sm={6} xs={12}>
                                    <Box pt={2} fontWeight="bold" style={{display:'flex'}}>
                                        <Box pr={1}>{val.buyerId} </Box>
                                        <Button size="small" color="primary" variant="outlined">
                                            Message
                                        </Button>
                                    </Box> 
                                    <Box pt={2} fontWeight="normal" fontSize={14}>
                                        <Box style={{width: '80%'}}>{val.addressId}</Box>
                                    </Box>
                                </Grid>
                                <Grid item xl={6} lg={6} md={6} sm={6} xs={12}>
                                    <Box fontWeight="bold" pt={1}> 
                                        Total Price : Rp. {(val.grand_total).toLocaleString()}
                                    </Box>
                                    <Box fontWeight="bold" pt={1}> Payment Terms : {val?.payment_terms}</Box>
                                    <Box fontWeight="bold" pt={1}> Package ID : {val?.code_package}</Box>
                                </Grid>
                            </Grid>
                            
                        </Box>

                        <Box pt={2} >
                            <Paper elevation={3}>
                                <Accordion>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                    >
                                        <Stack flexDirection="row" justifyContent="space-between">
                                            <Box fontWeight="bold">
                                                Detail All Items ({val.items?.length})
                                            </Box>
                                        </Stack>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Stack flexDirection="row" sx={{ mb:2 }}>
                                            <Box>
                                                { val.lastStatus === "Open" ? 
                                                <Button 
                                                    size="small" 
                                                    color={val.update === "true" ? "error" : "success"}
                                                    variant="contained"
                                                    onClick={() => changeTableUpdate(val.code_package, val.update, val.items)}
                                                >
                                                    { val.update === "false" ? "Create Pick & Pack" : "Cancel" }
                                                </Button> :
                                                val.lastStatus === "Pick" ?
                                                <Button 
                                                    size="small" 
                                                    color={"primary"}
                                                    variant="contained"
                                                    onClick={() => onClickCreatePack(val)}
                                                >
                                                    { store_purchaseorders.loading_pack ? 
                                                        <div>Loading.. <CircularProgress size={20} color="inherit"/> </div> :
                                                        "Create Pack"
                                                    }
                                                </Button>
                                                : val.lastStatus === "Ready to Ship" ?
                                                <Button 
                                                    size="small" 
                                                    color={"primary"}
                                                    variant="contained"
                                                    onClick={() => onClickCreateRTS(val)}
                                                >
                                                    { store_purchaseorders.loading_delivery ? 
                                                        <div>Loading.. <CircularProgress size={20} color="inherit"/> </div> :
                                                        "Create Delivery Note"
                                                    }
                                                </Button>
                                                : null
                                                }
                                            </Box>
                                            <Box ml={2}>
                                            { val.lastStatus !== "Open" ? null :
                                                <Button size="small" color="primary" variant="outlined">
                                                    Print Pick List
                                                </Button> 
                                            }
                                            </Box>
                                        </Stack>
                                        <Box>
                                            {  val.update === "false" ? 
                                            <TableItem 
                                                data={val.items} 
                                            /> 
                                            :
                                            <TableItemUpdate 
                                                data={val.items}
                                                onChangeQuantity={onChangeQuantity}
                                                code_package={val.code_package}
                                                code_po={val.code_po}
                                                id_package={val._id}
                                                onChangePrice={onChangePrice}
                                                vendorId={val.vendorId}
                                            />
                                            }
                                        </Box>
                                    </AccordionDetails>
                                </Accordion>
                            </Paper>
                        </Box>

                    </Paper>
                </Box>
            ))
            }
        </div>
    </Stack>
    )
}

export default CardOrder

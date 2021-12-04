import React, { useState, useEffect } from 'react'
import { 
    Box, 
    Paper, 
    Grid, 
    Button,
    Stack,
    TextField,
    Dialog, 
    DialogActions,
    DialogContent,
    DialogTitle,
    CircularProgress 
} from '@mui/material'
import moment from 'moment'
import { postConfirmationDP } from './reducers/purchaseOrdersReducers';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../app/store';
import swal from 'sweetalert';


const CardOrderDP : React.FC<any> = ({ 
    data, 
}) => {

    const dispatch = useDispatch()

    const store_purchaseorders = useSelector((state : RootState) => state.purchase_orders)

    const [open, setOpen] = useState(false);
    const [nominalDP, setNominalDP] = useState("");
    const [dataFile, setDataFile] = useState<any>([]);
    const [dataID, setDataID] = useState<any>("");

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setNominalDP("")
    };

    useEffect(() => {
        if(store_purchaseorders.confirm) {
            swal('Success', "Success confirm down payment", 'success')
            setTimeout(() => {
                window.location.reload()
            }, 1500);
        }
    }, [store_purchaseorders.confirm]);
    // console.log(dataFile, 'data dataFile dp')

    const onClickSubmit = () => {
        if(nominalDP !== "") {
            const body = {
                "id": dataID,
                "nominal": nominalDP,
            }
            dispatch(postConfirmationDP(body))
        }
    }

    return (
    <Stack>
        <div>
            { data?.map((val : any, i : any) => (
            <Box mb={2} mt={2}>
                <Paper elevation={2} sx={{mt:2}} key={i}>
                <Paper>
                    <Grid container spacing={2} justifyContent="space-between">
                        <Grid item>
                            <Box fontWeight="bold" pl={2}> Order ID : {val.code_po}</Box>
                            <Box fontWeight="normal" pl={2} pb={1} fontSize={13}> Date : {moment(val.date).format('ll')}</Box>
                        </Grid>
                        <Grid item>
                           <Box pr={2}>
                            <Button 
                                size="small" color="error" variant="outlined"
                                onClick={() => {
                                    handleClickOpen()
                                    setNominalDP(val.down_payment)
                                    setDataFile(val.proof_of_advance_payment)
                                    setDataID(val._id)
                                }}
                            >
                                Confirmation DP
                            </Button>
                           </Box>
                        </Grid>
                    </Grid>
                </Paper>
                <Box p={2}>
                    <Grid container spacing={3} >
                        <Grid item xl={6} lg={6} md={6} sm={6} xs={12}>
                            <Box pt={2} fontWeight="bold" style={{display:'flex'}}>
                                <Box pr={1}>{val.buyerId}</Box>
                            </Box> 
                            <Box pt={2} fontWeight="normal" fontSize={14}>
                                <Box style={{width: '80%'}}>{val.addressId}</Box>
                            </Box>
                        </Grid>
                        <Grid item xl={6} lg={6} md={6} sm={6} xs={12}>
                            <Box fontWeight="bold" pt={1}> 
                                Total Price : Rp. {(12000000).toLocaleString()}
                            </Box>
                            <Box fontWeight="bold" pt={1}> 
                                Down Payment : Rp. {(val.down_payment).toLocaleString()}
                            </Box>
                            {/* <Box pt={2}>
                              <Button size="small" color="success" variant="outlined">
                                  Check Payment
                              </Button>
                            </Box> */}
                        </Grid>
                    </Grid>
                    
                </Box>
            </Paper>
            </Box>
            ))}
        </div>
        {/* DIALOG CONFIRMATION */}
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            fullWidth={true}
            maxWidth="sm"
        >
            <DialogTitle id="alert-dialog-title">
                {"Confirmation Down Payment"}
            </DialogTitle>
            <DialogContent>
                { dataFile.length === 0 ? 
                <Box pt={1}>Buyer not yet paid down payment</Box>
                :
                <Stack sx={{ pt:1 }} flexDirection="column" alignContent="center">
                    <Box pb={1}>
                        <Box pb={1}>Proof of payment </Box>
                        <img src={dataFile.file.url} alt="file" width="200px" />
                    </Box>
                    <TextField
                        label="Nominal Down Payment"
                        defaultValue={nominalDP}
                        onChange={(e) => setNominalDP(e.target.value)}
                        type="number"
                        size="small"
                        fullWidth
                    />
                </Stack>
                }
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} variant="outlined" color="error">Close</Button>
                <Button 
                    onClick={() => onClickSubmit()} 
                    variant="contained" color="primary"
                >
                    { store_purchaseorders.loading_confirm ? 
                        <div>Loading.. <CircularProgress size={20} color="inherit"/> </div> :
                        "Confirm"
                    }
                </Button>
            </DialogActions>
        </Dialog>
    </Stack>
    )
}

export default CardOrderDP

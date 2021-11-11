import React, { useState, useEffect } from 'react'
import {
    Paper,
    Button,
    Grid,
    Box,
    TextField,
    Backdrop,
    CircularProgress 
} from '@mui/material';
import { useForm } from "react-hook-form";
import Select from 'react-select'
import { useDispatch, useSelector } from 'react-redux'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { UserFormSubmit } from '../stepRegisterTypes'
import { ISelectOption } from '../../globalTypes'
import { changeStep } from '../stepRegisterSlice';

const legal_document = [
    {
        id: "sdfa",
        title: "Nomor Pokok Wajib Pajak",
        short_title : "NPWP"
    },
    {
        id: "asqwr",
        title: "Surat Ijin Usaha Perusahaan",
        short_title : "SIUP"
    }
]

const FormLegalDocument : React.FC<any> = ({
    profile
}) => {

      
    const dispatch = useDispatch()

    const [loading, setLoading] = useState(false);


    // const onSubmit = (data: UserFormSubmit): void => {
    //     console.log(data, 'data')
    //     dispatch(changeStep(2))
    // }

    const onClickNext = () => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
            dispatch(changeStep(2))
        }, 2000);
    }


    return (
        <div>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            { profile ? null :
            <Box mt={2} pl={2} pb={2}>
                <h2>Legal Document Company </h2>
            </Box> }
           <div className="section-form-company-detail">
                <Box pl={2}>
                        <Grid container spacing={4}>
                            <Grid item xl={6} lg={6} xs={12}>
                                <Grid container >
                                    <Grid item xl={3} lg={4} xs={12}>
                                        <Box pt={2}><h4>NPWP Number</h4></Box>
                                    </Grid>
                                    <Grid item xl={9} lg={8} xs={12}>
                                        <TextField
                                            margin="dense"
                                            fullWidth
                                            id="npqp"
                                            label="NPWP Number"
                                            name="npqp"
                                            size="small"
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xl={6} lg={6} xs={12}>
                                <Grid container >
                                    <Grid item xl={3} lg={4} xs={12}>
                                        <Box pt={2}><h4>Upload NPWP</h4></Box>
                                    </Grid>
                                    <Grid item xl={9} lg={8} xs={12}>
                                        <TextField
                                            margin="dense"
                                            fullWidth
                                            type="file"
                                            id="uploadfile"
                                            name="uploadfile"
                                            size="small"
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        { profile ? 
                        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 4, pb: 2 }}>
                            <Box sx={{ flex: '1 1 auto' }} />
                            <Button 
                                variant="contained"
                                type="submit"
                            >
                                Save Change
                            </Button>
                        </Box> : 
                        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 4, pb: 2 }}>
                            <Button
                                variant="contained"
                                color="inherit"
                                onClick={() => dispatch(changeStep(0))}
                                sx={{ mr: 1 }}
                            >
                                Back
                            </Button>
                            <Box sx={{ flex: '1 1 auto' }} />
                            <Button 
                                variant="contained"
                                type="submit"
                                onClick={() => onClickNext()}
                            >
                                Next
                            </Button>
                        </Box> }
                </Box>
           </div>
        </div>
    )
}

export default FormLegalDocument

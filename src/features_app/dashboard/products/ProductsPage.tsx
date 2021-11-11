import { Box } from '@mui/system'
import React from 'react'
import BreadCrumbs from '../../../components/BreadCrumbs'
// import {userCredentials} from './../../../utilities/config'

function ProductsPage() {

    // console.log(userCredentials, 'userrr')

    return (
        <Box sx={{pt:2, pl:3, pr:3}}>
            <BreadCrumbs 
                isPage={false}
                current="Products Page"
            />
           <Box sx={{pt:2}}>
                <h2>Products page is cooming soon...</h2>
           </Box>
        </Box>
    )
}

export default ProductsPage

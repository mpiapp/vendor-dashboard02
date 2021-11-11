// import { Grid, Paper } from '@mui/material'
import { Box } from '@mui/system'
// import React from 'react'
// import {userCredentials} from './../../../utilities/config'

function HomeDashboard() {

    // console.log(userCredentials, 'userrr')

    return (
        <Box sx={{pl:3, pr:3}}>
           <h2>Welcome back, {localStorage.getItem('legalname')}</h2>

            
           {/* <Box sx={{pt:2, display: 'flex', justifyContent: 'space-between'}}>
                {[1,2,3,4,5].map((value, i) => (
                    <Box key={i} className="box-div">
                        <Paper elevation={2} className="paper-box">
                            {value}
                        </Paper>
                    </Box>
                ))}
           </Box> */}
        </Box>
    )
}

export default HomeDashboard

import { Box } from '@mui/system'
import BreadCrumbs from '../../../components/BreadCrumbs'
// import {userCredentials} from './../../../utilities/config'

function CustomRole() {

    // console.log(userCredentials, 'userrr')

    return (
        <Box sx={{pt:2, pl:3, pr:3}}>
            <BreadCrumbs 
                isPage={false}
                current="Custom Role"
            />
           <Box sx={{pt:2}}>
                <h2>Custom Role page is cooming soon...</h2>
           </Box>
        </Box>
    )
}

export default CustomRole

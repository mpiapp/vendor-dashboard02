import { 
    AppBar,
    Toolbar,
} from '@mui/material';
import logo from '../assets/img/logo.png'

const Navbar = () => {
    return (
    <div>
        <AppBar
            position="static"
            color="default"
            elevation={0}
            sx={{ 
                borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
                backgroundColor: '#0091d6'
            }}
        >
            <Toolbar sx={{ flexWrap: 'wrap'}}>
            <div className="logo-mpi-main">
                <a href="/">
                    <img 
                        alt="logo mpi" 
                        src={logo}
                    />
                </a>
            </div>
            </Toolbar>
        </AppBar>
    </div>
    )
}

export default Navbar

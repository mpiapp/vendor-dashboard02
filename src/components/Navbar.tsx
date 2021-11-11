import { 
    AppBar,
    Toolbar,
} from '@mui/material';

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
            <div className="logo-mpi">
                <a href="/">
                    <img 
                        alt="logo mpi" 
                        src="https://www.wilsonfamilychiropracticcenter.net/wp-content/uploads/2018/12/placeholder-logo-2.png"
                    />
                </a>
            </div>
            </Toolbar>
        </AppBar>
    </div>
    )
}

export default Navbar

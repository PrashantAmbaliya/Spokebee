import { AppBar, Toolbar, Typography, Button, Stack } from '@mui/material';
import { NavLink } from 'react-router-dom';


function Navbar() {
    return (
        <AppBar position="static" sx={{ backgroundColor: '#f29c2c' }}> 
            <Toolbar>
                <Typography variant="h6"  component={NavLink} to="" sx={{ flexGrow: 1 }}>
                    <span style={{ fontWeight: 'bold', fontSize: '2rem', color: '#fff' }}>SpokeBee</span>
                </Typography>
                <Stack direction='row' spacing={2}>
                    <Button color='inherit' style={{ fontWeight: 'bold' }} >Home</Button>
                    <Button color='inherit' style={{ fontWeight: 'bold' }} >About</Button>
                </Stack>
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;

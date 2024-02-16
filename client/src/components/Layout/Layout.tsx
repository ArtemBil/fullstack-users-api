import React from 'react';
import NavHeader from '../Header';
import {ThemeProvider} from '@mui/material';
import { Outlet } from 'react-router-dom';
import Box from '@mui/material/Box';

const theme = {}
const Layout = () => {
    return (
        <ThemeProvider theme={theme}>
            <div className="App">
                <header className="App-header">
                    <NavHeader/>
                </header>
                <main>
                    <Outlet />
                </main>
                <Box component="footer" sx={{mt: 10, mb: 3}}>
                    Footer
                </Box>
            </div>
        </ThemeProvider>
    );
};

export default Layout;
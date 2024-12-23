import React from 'react';
import './App.css';
import Header from './components/Navbar';
import Footer from './components/Footer';
import Routes from './routes/Routes';
import Box from '@mui/material/Box';
import { useEffect } from 'react';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import siteTheme from './theme';
import { CssBaseline } from '@mui/material';


function App() {
	
	useEffect(() => {
        document.title = 'Apex Construction';
    }, []);

    const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(siteTheme(mode)), [mode]);
	
  return (
    <Box>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header/>
      <Routes/>
      <Footer/>
      </ThemeProvider>
    </Box>
  );
}

export default App;
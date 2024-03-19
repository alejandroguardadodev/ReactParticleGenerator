import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Provider } from 'react-redux'

import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline';

import theme from './theme'
import store from './store';

import DashboardLayout from './layouts/DashboardLayout';

import TestPages from './pages/TestPages';
import MainPage from './pages/MainPage';

import './App.css'

function App() {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Provider store={store}>
          <Routes>
            <Route path='/' element={<DashboardLayout />}>
              <Route index element={<MainPage />} />
            </Route>
          </Routes>
        </Provider>
      </ThemeProvider>
    </Router>
  )
}

export default App

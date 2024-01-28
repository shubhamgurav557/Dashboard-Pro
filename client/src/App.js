import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from '@mui/material/styles'
import { useMemo, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { themeSettings } from "theme";
import Layout from "scenes/layouts/Layout";
import Dashboard from "scenes/dashboard/Dashboard";
import Products from "scenes/products/Products";
import Customers from "scenes/customers/Customers";
import Transactions from "scenes/transactions/Transactions";
import Landing from "scenes/landing/Landing";
import Login from "scenes/login/Login";
import Register from "scenes/register/Register";
import Geography from "scenes/geography/Geography";
import Overview from "scenes/overview/Overview";
import Daily from "scenes/daily/Daily";
import Monthly from "scenes/monthly/Monthly";
import Admins from "scenes/admins/Admins";
import { getCookies } from "state/functions";

function App() {
  //const navigate = useNavigate();
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const [token, setToken] = useState(null);

  // Asynchronously fetch cookies when the component mounts
  useEffect(() => {
    const fetchCookies = async () => {
      const cookies = await getCookies();
      setToken(cookies.token);
    };

    fetchCookies();
  }, []);

  // Log the token whenever it changes
  useEffect(() => {
    console.log('Token Added', token);
  }, [token]);

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/" element={<Navigate to="/landing" replace />} />
            <Route path="/landing" element={<Landing />} />
            <Route path="/login" element={<Login onLoginSuccess={(newToken) => setToken(newToken)} />} />
            <Route path="/register" element={<Register />} />
            <Route element={
              token ? <Layout /> : <Navigate to="/login" replace />
            }>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/products" element={<Products />} />
              <Route path="/customers" element={<Customers />} />
              <Route path="/transactions" element={<Transactions />} />
              <Route path='/geography' element={<Geography />} />
              <Route path="/overview" element={<Overview />} />
              <Route path="/daily" element={<Daily />} />
              <Route path="/monthly" element={<Monthly />} />
              <Route path="/admins" element={<Admins />} />
            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;

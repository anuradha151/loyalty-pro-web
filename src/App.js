import './App.css';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import {
    Routes,
    Route,
    Navigate,
} from "react-router-dom";

import Home from './pages/Home';
import Customer from './pages/Customer';
import CustomerView from './pages/CustomerView';
import CustomerEdit from './pages/CustomerEdit';
import { Container } from '@mui/material';
import AppHeader from './components/AppHeader';

function App() {
    return (
        <>
            <AppHeader />
            <Container>
                <Routes>
                    <Route
                        exact
                        path="/"
                        element={<Home />}
                    />
                    <Route
                        path="/customer"
                        element={<Customer />}
                    />
                    <Route
                        path="*"
                        element={<Navigate to="/" />}
                    />
                    <Route
                        path="/customer-view/:uuid"
                        element={<CustomerView />}
                    />
                    <Route
                        path="/customer-edit/:uuid"
                        element={<CustomerEdit />}
                    />
                </Routes>
            </Container>
        </>
    );
}
export default App;

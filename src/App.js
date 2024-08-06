import './App.css';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Home from './pages/Home';
import Customer from './pages/Customer';
import CustomerView from './pages/CustomerView';
import CustomerEdit from './pages/CustomerEdit';


function App() {
  return (
      <>

          <Router>
              <Routes>
                  <Route
                      exact
                      path="/"
                      element={<Customer />}
                  />
                  <Route
                      path="/home"
                      element={<Home />}
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
          </Router>
      </>
  );
}
export default App;

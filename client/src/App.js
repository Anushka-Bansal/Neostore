import './App.css';
import {BrowserRouter as Router, Routes,Route } from 'react-router-dom';
import Home from './Components/dashboard/home';
import Login from './Components/user/Login';
import Registration from './Components/user/Registration';
import Banner from './Components/dashboard/Banner';
import ForgotPassword from './Components/user/ForgotPassword';
import PasswordForm from './Components/user/PasswordForm';
import Products from './Components/products/Products'
import ProductsDetails from './Components/products/ProductsDetails';
import Header from './Components/common/Headers';
import Footers from './Components/common/Footers';
import Profile from './Components/profile/Profile';
import EditProfile from './Components/profile/EditProfile';
import ChangePassword from './Components/profile/ChangePassword';
import Addresses from './Components/profile/Addresses'
import Cart from './Components/products/Cart';
import CheckoutPage from './Components/products/CheckoutPage';
import Orders from './Components/products/Orders'
import OrderDetails from './Components/profile/OrderDetails';
import Invoice from './Components/profile/Invoice';


function App() {
  return (
    <div className="App">
      
      <Router>
      <Header />
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/banner" exact element={<Banner />} />
          <Route path="/login" exact element={<Login />} />
          <Route path="/register" exact element={<Registration/>} />
          <Route path="/forgotpassword" exact element={<ForgotPassword />} />
          <Route path ="/passwordform" exact element={<PasswordForm />} /> 
          <Route path="/products" exact element={<Products/>} />
          <Route path="/productDetails/:id" exact element={<ProductsDetails />} />
          <Route path="/profile" exact element={<Profile />} />
          <Route path="/edit-profile" exact element={<EditProfile />} />
          <Route path="/change-password" exact element={<ChangePassword />} />
          <Route path="/addresses" exact element={<Addresses />} />
          <Route path="/cart" exact element={<Cart/>} />
          <Route path="/checkout" exact element={<CheckoutPage />} />
          <Route path="/orders" exact element={<Orders/>} />
          <Route path="/order-details" exact element={<OrderDetails />} />
          <Route path="/invoice/:id" exact element={<Invoice />} />
        </Routes>
        <Footers />
      </Router>
    </div>
  );
}

export default App;

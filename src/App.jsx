import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Auth from './components/Auth'
import ForgotPassword from './components/ForgotPassword'
import About from './components/About'
import Footer from './components/Footer'
import Offers from './components/Offers'
import Shop from './components/Shop'
import ProductDetails from './components/ProductDetails'
import Checkout from './components/Checkout'
import PaymentStatus from './components/PaymentStatus'
import { ProductProvider } from './context/ProductContext'
import { AuthProvider } from './context/AuthContext'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Layout = ({ children }) => {
  const location = useLocation();
  const hideFooter = location.pathname === '/auth' || location.pathname === '/forgot-password';

  return (
    <>
      <Navbar />
      <main className="pt-16">
        {children}
      </main>
      {!hideFooter && <Footer />}
    </>
  );
};

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ProductProvider>
          <Layout>
            <ToastContainer position="top-center" autoClose={3000} />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/about" element={<About />} />
              <Route path="/offers" element={<Offers />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/checkout/:id" element={<Checkout />} />
              <Route path="/payment-status" element={<PaymentStatus />} />
            </Routes>
          </Layout>
        </ProductProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}


export default App

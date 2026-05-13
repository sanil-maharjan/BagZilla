import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Auth from './components/Auth'
import ForgotPassword from './components/ForgotPassword'
import About from './components/About'
import Footer from './components/Footer'
import { ProductProvider } from './context/ProductContext'
import { AuthProvider } from './context/AuthContext'

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
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </Layout>
        </ProductProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App

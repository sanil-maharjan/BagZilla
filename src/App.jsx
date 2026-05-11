import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './components/Home'
import { ProductProvider } from './context/ProductContext'

function App() {
  return (
    <BrowserRouter>
      <ProductProvider>
        <Navbar />
        <main className="pt-16">
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </main>
      </ProductProvider>
    </BrowserRouter>
  )
}

export default App

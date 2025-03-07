import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import theme from './Theme';

// Importing pages
import HomePage from './Home';
import NFTGallery from './NFTGallery';
import NFTDetailPage from './NFTDetailPage';
import SignIn from './SignIn';
import SignUp from './SignUp';
import AddNFTPage from './AddNFTPage';
import Cart from './Cart';
import TradeHistory from './TradeHistory';

// Import Header and Footer
import ResponsiveAppBar from './Header';
import Footer from './Footer';
import { ThemeProvider, CssBaseline } from '@mui/material';

function Layout() {
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false); // State to track if user is authenticated
  const [nfts, setNfts] = useState([
    { "id": 1, "name": "Cool NFT", "image": "/images/cool-nft.png", "price": "0.5", "status": "Available", "seller": "A", "date": "17/02/2020", "description": "A stylish and modern NFT with a unique digital art design." },
    { "id": 2, "name": "Rare NFT", "image": "/images/rare-nft.jpg", "price": "1.2", "status": "Available", "seller": "B", "date": "23/03/2021", "description": "A highly sought-after NFT with limited edition artwork." },
    { "id": 3, "name": "Legendary NFT", "image": "/images/legendary-nft.jpg", "price": "2.5", "status": "Out of Stock", "seller": "C", "date": "17/05/2020", "description": "An exclusive NFT with legendary status in the digital art world." },
    { "id": 4, "name": "Dog NFT", "image": "/images/dog-nft.jpg", "price": "3.0", "status": "Available", "seller": "D", "date": "30/01/2023", "description": "A charming and playful NFT featuring an adorable dog." },
    { "id": 5, "name": "Cat NFT", "image": "/images/cat-nft.png", "price": "6.0", "status": "Available", "seller": "E", "date": "01/12/2024", "description": "A mysterious and elegant NFT capturing the beauty of a cat." },
    { "id": 6, "name": "Duck NFT", "image": "/images/duck-nft.jpg", "price": "4.2", "status": "Available", "seller": "F", "date": "13/12/2025", "description": "A quirky and fun NFT featuring a digital duck in a creative pose." },
    { "id": 7, "name": "Mouse NFT", "image": "/images/mouse-nft.png", "price": "0.2", "status": "Available", "seller": "G", "date": "27/09/2025", "description": "A small but charming NFT showcasing a tiny, adventurous mouse." },
    { "id": 8, "name": "T-rex NFT", "image": "/images/trex-nft.jpg", "price": "3.2", "status": "Available", "seller": "H", "date": "21/01/2022", "description": "A fierce and powerful NFT featuring a mighty T-rex in action." }
    // NFT data here
  ]);
  const [tradeHistory, setTradeHistory] = useState([]); // State to track trade history
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    const userId = localStorage.getItem('user_id');
    if (userId) {
      setIsAuthenticated(true); // Set authentication state if user ID is found in local storage
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart)); // Save cart to local storage whenever it changes
  }, [cart]);

  const handlePurchaseSuccess = (purchasedNftId) => { // Change NFT status to sold
    setNfts((prevNfts) =>
      prevNfts.map((nft) =>
        nft.id === purchasedNftId ? { ...nft, status: "Out of Stock" } : nft
      )
    );

    const purchasedNft = nfts.find((nft) => nft.id === purchasedNftId); // Add NFT to trade history
    if (purchasedNft) {
      setTradeHistory((prevHistory) => [...prevHistory, purchasedNft]);
      setCart((prevCart) => prevCart.filter((nft) => nft.id !== purchasedNftId));
    }
  };

  const handleAddToCart = (nft) => { // Add NFT to cart
    setCart((prevCart) => [...prevCart, nft]);
  };

  const showHeaderFooter = isAuthenticated && !['/signin', '/signup'].includes(location.pathname); // Show header and footer conditionally

  return (
    <>
      {showHeaderFooter && <ResponsiveAppBar />}
      <Routes>
        <Route path="/" element={isAuthenticated ? <HomePage nfts={nfts} /> : <Navigate to="/signin" />} />
        <Route path="/gallery" element={isAuthenticated ? <NFTGallery nfts={nfts} /> : <Navigate to="/signin" />} />
        <Route path="/signin" element={<SignIn setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/add-nft" element={<AddNFTPage />} />
        <Route path="/cart" element={<Cart cart={cart} onPurchaseSuccess={handlePurchaseSuccess} />} />
        <Route path="/history" element={isAuthenticated ? <TradeHistory tradeHistory={tradeHistory} /> : <Navigate to="/signin" />} />
        <Route path="/nft/:id" element={isAuthenticated ? <NFTDetailPage onAddToCart={handleAddToCart} cart={cart} /> : <Navigate to="/signin" />} />
      </Routes>
      {showHeaderFooter && <Footer />}
    </>
  );
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Layout />
      </Router>
    </ThemeProvider>
  );
}

export default App;
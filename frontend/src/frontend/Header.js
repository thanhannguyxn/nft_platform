// Header.js
import React, { useState, useEffect } from 'react';
import { AppBar, Box, Toolbar, IconButton, Typography, Menu, Container, Avatar, Button, Tooltip, MenuItem, Badge, Paper, Divider } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import WalletIcon from '@mui/icons-material/AccountBalanceWallet';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ethers } from 'ethers';
import { useWallet } from './WalletContext';
import handleLogout from './LogOut';

// Array of page names for the navigation menu
const pages = ['Home', 'NFT Gallery', 'Trade history'];
// Array of settings options for the user menu
const settings = ['Add a new NFT', 'Logout'];

function ResponsiveAppBar() {
  // Accessing wallet information and functions from the WalletContext
  const { account, balance, setAccount, updateBalance } = useWallet();
  // State for the mobile navigation menu anchor
  const [anchorElNav, setAnchorElNav] = useState(null);
  // State for the user menu anchor
  const [anchorElUser, setAnchorElUser] = useState(null);
  // State for controlling the visibility of the wallet popup
  const [walletOpen, setWalletOpen] = useState(false);
  // State for the number of items in the shopping cart
  const [cartItemCount, setCartItemCount] = useState(0);
  // State to track if the user is connected to the wallet
  const [isConnected, setIsConnected] = useState(false);
  // Hook for navigation
  const navigate = useNavigate();
  // Hook for getting the current location
  const location = useLocation();

  // Function to open the mobile navigation menu
  const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget);
  // Function to open the user settings menu
  const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
  // Function to close the mobile navigation menu
  const handleCloseNavMenu = () => setAnchorElNav(null);
  // Function to close the user settings menu
  const handleCloseUserMenu = () => setAnchorElUser(null);

  // Function to toggle the visibility of the wallet popup
  const toggleWalletPopup = (event) => {
    event.stopPropagation(); // Prevent click from propagating to the document
    setWalletOpen((prev) => !prev);
  };

  // Function to connect to the user's wallet
  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        // Request access to the user's accounts
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const account = accounts[0];
        setAccount(account);
        setIsConnected(true);
        getBalance(account);
      } catch (error) {
        console.error("Error connecting to wallet:", error);
      }
    } else {
      alert('Please install MetaMask!');
    }
  };

  // Function to get the user's ETH balance
  const getBalance = async (address) => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const balance = await provider.getBalance(address);
      const balanceInEther = ethers.utils.formatEther(balance);
      updateBalance(balanceInEther);
    } catch (error) {
      console.error("Error getting balance:", error);
      updateBalance('0');
    }
  };

  // useEffect hook to handle changes in the user's accounts
  useEffect(() => {
    if (window.ethereum) {
      const handleAccountsChanged = (accounts) => {
        if (accounts.length > 0) {
          const account = accounts[0];
          setAccount(account);
          updateBalance(account);
        } else {
          setAccount('');
          updateBalance('0');
          setIsConnected(false);
        }
      };

      // Listen for changes in the user's accounts
      window.ethereum.on('accountsChanged', handleAccountsChanged);

      // Clean up the listener when the component unmounts
      return () => {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
      };
    }
  }, [setAccount, updateBalance]);

  // Function to shorten an address for display
  const shortenAddress = (address) => {
    if (!address) return '';
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  // useEffect hook to handle clicks outside the wallet popup
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.wallet-popup') && !event.target.closest('.wallet-icon')) {
        setWalletOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <>
      <AppBar position="fixed" sx={{ backgroundColor: '#000000', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.5)' }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            {/* Menu Icon */}
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton onClick={handleOpenNavMenu} color="inherit">
                <MenuIcon />
              </IconButton>
              <Menu anchorEl={anchorElNav} open={Boolean(anchorElNav)} onClose={handleCloseNavMenu}>
                {pages.map((page) => (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Link to={`/${page.toLowerCase().replace(' ', '-')}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                      {page}
                    </Link>
                  </MenuItem>
                ))}
              </Menu>
            </Box>

            <Typography
              variant="h4"
              component={Link}
              to="/"
              sx={{
                display: 'flex',
                alignItems: 'center',
                textDecoration: 'none',
                color: '#ffcc00',
                fontWeight: 'bold',
                height: '64px',
                flexGrow: 0,
                justifyContent: 'flex-start',
                pr: { xs: '210px', md: 1 }
              }}
            >
              NFTs.
            </Typography>

            <Box sx={{ display: { xs: 'none', md: 'flex' }, flexGrow: 1, alignItems: 'center' }}>
              {/* Home Page */}
              <Button component={Link} to="/" sx={{ color: location.pathname === '/' ? '#ffcc00' : 'white', ml: 1 }}>
                Home
              </Button>

              {/* NFT Gallery Page */}
              <Button component={Link} to="/gallery" sx={{ color: location.pathname === '/gallery' ? '#ffcc00' : 'white', ml: 1 }}>
                NFT Gallery
              </Button>

              {/* Trade History Page */}
              <Button component={Link} to="/history" sx={{ color: location.pathname === '/history' ? '#ffcc00' : 'white', ml: 1 }}>
                Trade history
              </Button>
            </Box>

            <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
              {/* Wallet Icon */}
              <IconButton className="wallet-icon" color="inherit" sx={{ ml: 1 }} onClick={toggleWalletPopup}>
                <WalletIcon />
              </IconButton>

              {walletOpen && (
                <Paper className="wallet-popup" elevation={3} sx={{ position: 'absolute', right: '70px', top: '70px', width: '250px', padding: '16px', zIndex: 10 }}>
                  <Typography variant="h6" gutterBottom>Your Balance</Typography>
                  <Typography variant="body1" sx={{ mb: 2 }}>Balance: {balance} ETH</Typography>
                  <Typography variant="body1" sx={{ mb: 2 }}>Account: {account ? shortenAddress(account) : 'Not connected'}</Typography>
                  <Divider />
                  {!isConnected ? (
                    <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }} onClick={connectWallet}>
                      Connect Wallet
                    </Button>
                  ) : (
                    <Button variant="outlined" fullWidth sx={{ mt: 1 }} onClick={handleLogout}>
                      Disconnect
                    </Button>
                  )}
                </Paper>
              )}
                {/*Cart Icon for handle cart items*/}
                <IconButton color="inherit" sx={{ ml: 1 }} component={Link} to="/cart">
                <Badge badgeContent={cartItemCount > 0 ? cartItemCount : 0} color="secondary">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>

            {/*User Menu for handle user settings*/}
              <Box sx={{ flexGrow: 0, ml: 1 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt="User " src="/static/images/avatar/2.jpg" sx={{ width: 32, height: 32 }} />
                  </IconButton>
                </Tooltip>
                <Menu anchorEl={anchorElUser } open={Boolean(anchorElUser )} onClose={handleCloseUserMenu} sx={{ mt: '45px' }}>
                  {settings.map((setting) => (
                    <MenuItem key={setting} onClick={() => {
                      handleCloseUserMenu();
                      if (setting === 'Add a new NFT') {
                        navigate('/add-nft');
                      } else if (setting === 'Logout') {
                        handleLogout(navigate);
                      }
                    }}>
                      {setting}
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
}

export default ResponsiveAppBar;

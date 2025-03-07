import React from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { Button, Typography, Box, Container } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const NFTDetailPage = ({ onAddToCart, cart }) => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { nft } = location.state;

  const isInCart = cart.some((item) => item.id === nft.id);

  return (
    <Box
      sx={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Background Image */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: `url(${nft.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(15px) brightness(0.4)', 
          zIndex: -1,
        }}
      />

      <Container
        maxWidth="xl"
        sx={{
          color: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          py: 4,
        }}
      >
        <Box
          display="flex"
          flexDirection={{ xs: 'column', md: 'row' }}
          alignItems="center"
          gap={6}
          width="100%"
          padding={4}
          sx={{
            backgroundColor: 'rgba(0, 0, 0, 0.7)', 
            borderRadius: '10px',
            padding: '20px',
            boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.5)',
          }}
        >
          {/* NFT Image */}
          <Box flex={1} display="flex" justifyContent="center">
            <img
              src={nft.image}
              alt={nft.name}
              style={{ width: '100%', maxWidth: '500px', borderRadius: '10px' }}
            />
          </Box>

          {/* NFT Information */}
          <Box flex={1}>
            <Typography variant="h3" fontWeight="bold" gutterBottom>
              {nft.name}
            </Typography>
            <Typography variant="h5" color="#bbb">
              Price: {nft.price} ETH
            </Typography>
            <Typography variant="h5" color={nft.status === 'Available' ? '#00FF00' : '#FF0000'}>
              Status: {nft.status}
            </Typography>
            <Typography variant="h6">Seller: {nft.seller}</Typography>
            <Typography variant="h6">Date: {nft.date}</Typography>
            <Typography variant="h6">Description: {nft.description}</Typography>

            {/* Back and Add to Cart Buttons */}
            <Box mt={4} display="flex" alignItems="center" gap={2}>
              <Button
                startIcon={<ArrowBackIcon />}
                onClick={() => navigate(-1)}
                variant="contained"
                sx={{
                  backgroundColor: '#000',
                  color: '#fff',
                  fontWeight: 'bold',
                  borderRadius: '8px',
                  transition: 'all 0.3s',
                  '&:hover': {
                    backgroundColor: '#ffcc00',
                    color: '#000',
                  },
                }}
              >
                Back
              </Button>
              {nft.status === 'Available' ? (
                <Button
                  variant="contained"
                  startIcon={<ShoppingCartIcon />}
                  sx={{
                    backgroundColor: isInCart ? '#555' : '#ffcc00',
                    color: isInCart ? '#fff' : '#000',
                    fontWeight: 'bold',
                    borderRadius: '8px',
                    transition: 'all 0.3s',
                    '&:hover': {
                      backgroundColor: isInCart ? '#555' : '#000',
                      color: isInCart ? '#fff' : '#ffcc00',
                    },
                  }}
                  onClick={() => !isInCart && onAddToCart(nft)}
                  disabled={isInCart}
                >
                  {isInCart ? 'In Cart' : 'Add to Cart'}
                </Button>
              ) : (
                <Button
                  variant="contained"
                  disabled
                  sx={{ backgroundColor: '#555', color: '#fff', borderRadius: '8px' }}
                >
                  Out of Stock
                </Button>
              )}
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default NFTDetailPage;

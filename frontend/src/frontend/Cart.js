import React from "react";
import { useNavigate } from "react-router-dom";
import { 
  Button, Typography, Card, CardContent, CardMedia, Dialog, 
  DialogActions, DialogContent, DialogTitle, Box, Grid 
} from "@mui/material";

const Cart = ({ cart, onPurchaseSuccess }) => {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false); // State to manage dialog open/close
  const [selectedNft, setSelectedNft] = React.useState(null); // State to track selected NFT

  const handleConfirmPurchase = (nft) => {
    setSelectedNft(nft); // Set selected NFT
    setOpen(true); // Open confirmation dialog
  };

  const handleClose = () => {
    setOpen(false); // Close confirmation dialog
    if (selectedNft) {
      onPurchaseSuccess(selectedNft.id); // Mark NFT as purchased
      setSelectedNft(null); // Remove item from cart on purchase
    }
  };

  if (cart.length === 0) { // Return empty cart if no items
    return (
      <Box sx={{ bgcolor: "#000000", color: "white", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Typography variant="h6">Your cart is empty.</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ bgcolor: "#121212", color: "white", minHeight: "100vh", py: 4, textAlign: "center" }}>
      <Typography variant="h4" gutterBottom>
        Shopping Cart
      </Typography>
      {cart.map((nft) => (
        <Card key={nft.id} sx={{ maxWidth: 600, mx: "auto", my: 2, p: 3, bgcolor: "#1e1e1e", color: "white", borderRadius: 2, boxShadow: 3 }}>
          <Grid container spacing={2} alignItems="center">
            {/* Left column: NFT information */}
            <Grid item xs={8}>
              <CardContent>
                <Typography variant="h6">{nft.name}</Typography>
                <Typography variant="body1" sx={{ color: "#FFCC00", fontWeight: "bold" }}>
                  Price: {nft.price} ETH
                </Typography>
                <Button
                  variant="contained"
                  sx={{
                    mt: 2,
                    px: 4,
                    py: 1.5,
                    bgcolor: "#FFCC00",
                    color: "black",
                    fontWeight: "bold",
                    "&:hover": {
                      bgcolor: "black",
                      color: "#FFCC00",
                    },
                  }}
                  onClick={() => handleConfirmPurchase(nft)}
                >
                  Purchase
                </Button>
              </CardContent>
            </Grid>

            {/* Right column: NFT image */}
            <Grid item xs={4}>
              <CardMedia
                component="img"
                src={nft.image}
                alt={nft.name}
                sx={{ width: "100%", height: "200px", borderRadius: "10px", objectFit: "cover" }}
              />
            </Grid>
          </Grid>
        </Card>
      ))}

      {/* Confirmation Dialog */}
      <Dialog 
        open={open} 
        onClose={handleClose} 
        PaperProps={{ sx: { bgcolor: "#1e1e1e", color: "white", borderRadius: 2, p: 2 } }}
      >
        <DialogTitle sx={{ fontWeight: "bold", textAlign: "center" }}>Transaction Complete</DialogTitle>
        <DialogContent>
          <Typography>Your purchase was successful!</Typography>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center" }}>
          <Button
            onClick={handleClose}
            sx={{
              bgcolor: "#FFCC00",
              color: "black",
              fontWeight: "bold",
              "&:hover": {
                bgcolor: "black",
                color: "#FFCC00",
              },
            }}
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Cart;
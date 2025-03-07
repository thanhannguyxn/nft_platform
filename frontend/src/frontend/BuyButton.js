import React from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const BuyButton = ({ nft }) => {
  const navigate = useNavigate(); // Initialize navigation

  const handleBuy = () => {
    navigate("/cart", { state: { nft } }); // Send NFT data to Cart page
  };

  return (
    <Button variant="contained" color="primary" onClick={handleBuy}>
      Add to Cart
    </Button>
  );
};

export default BuyButton;

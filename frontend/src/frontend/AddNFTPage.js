import React, { useEffect, useState } from 'react';
import { Container, TextField, Button, Typography, Paper, Box, MenuItem } from '@mui/material';
import axios from 'axios';

const AddNFTPage = () => {
  // State variables to handle form data for adding a new NFT
  const [nftId] = useState(`NFT-${Date.now()}`); // Auto-generate NFT ID
  const [sellerId, setSellerId] = useState(''); // State for seller ID
  const [price, setPrice] = useState(''); // State for price
  const [status, setStatus] = useState('listed'); // State for status
  const [name, setName] = useState(''); // State for name
  const [description, setDescription] = useState(''); // State for description
  const [categoryId, setCategoryId] = useState(''); // State for category ID
  const [imageUrl, setImageUrl] = useState(''); // State for image URL
  const [categories, setCategories] = useState([]); // State for categories
  const [sellers, setSellers] = useState([]); // State for sellers

  // Fetch categories and seller data
  useEffect(() => {
    // Fetch categories from the server
    axios.get('http://localhost:8000/categories')
      .then((response) => setCategories(response.data))
      .catch((error) => console.error('Error fetching categories:', error));

    // Fetch sellers from the server
    axios.get('http://localhost:8000/users')
      .then((response) => setSellers(response.data))
      .catch((error) => console.error('Error fetching sellers:', error));
  }, []);

  // Handle form submission
  const handleAddNFT = async (event) => {
    event.preventDefault(); // Prevent default form submission

    try {
      // Send POST request to add a new NFT
      await axios.post('http://localhost:8000/add_nft', {
        nft_id: nftId,
        seller_id: sellerId,
        price,
        status,
        name,
        description,
        category_id: categoryId,
        image_url: imageUrl
      });
      alert("NFT added successfully!"); // Show success message
    } catch (error) {
      console.error("Error adding NFT:", error);
      alert("Failed to add NFT. Please try again."); // Show error message
    }
  };

  return (
    <Box sx={{ bgcolor: "#000000", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", py: 4 }}>
      <Container maxWidth="sm">
        <Paper elevation={10} sx={{ p: 4, borderRadius: 3, bgcolor: "#1e1e1e", color: "white", boxShadow: "0px 8px 20px rgba(255, 204, 0, 0.5)" }}>
          <Typography variant="h4" align="center" sx={{ mb: 3, fontWeight: "bold", color: "#FFCC00" }}>
            Add New NFT
          </Typography>
          <form onSubmit={handleAddNFT}>
            <TextField
              label="NFT ID"
              fullWidth
              variant="outlined"
              margin="normal"
              value={nftId}
              disabled
              sx={{ input: { color: "gray" } }}
            />
            <TextField
              select
              label="Seller"
              fullWidth
              variant="outlined"
              margin="normal"
              value={sellerId}
              onChange={(e) => setSellerId(e.target.value)}
              required
              sx={{ color: "white", "& .MuiOutlinedInput-root": { borderColor: "gray" } }}
            >
              {sellers.map((seller) => (
                <MenuItem key={seller.id} value={seller.id}>
                  {seller.email}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              label="Price (ETH)"
              fullWidth
              variant="outlined"
              margin="normal"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              sx={{ input: { color: "white" } }}
            />
            <TextField
              select
              label="Status"
              fullWidth
              variant="outlined"
              margin="normal"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              required
            >
              <MenuItem value="listed">Listed</MenuItem>
              <MenuItem value="sold">Sold</MenuItem>
              <MenuItem value="cancelled">Cancelled</MenuItem>
            </TextField>
            <TextField
              label="Name"
              fullWidth
              variant="outlined"
              margin="normal"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <TextField
              label="Description"
              fullWidth
              variant="outlined"
              margin="normal"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              multiline
              rows={3}
            />
            <TextField
              select
              label="Category"
              fullWidth
              variant="outlined"
              margin="normal"
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
            >
              {categories.map((category) => (
                <MenuItem key={category.id} value={category.id}>
                  {category.category_name}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              label="Image URL"
              fullWidth
              variant="outlined"
              margin="normal"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              sx={{
                mt: 3,
                py: 1.5,
                bgcolor: "#FFCC00",
                color: "black",
                fontWeight: "bold",
                "&:hover": {
                  bgcolor: "black",
                  color: "#FFCC00",
                },
              }}
            >
              Add NFT
            </Button>
          </form>
        </Paper>
      </Container>
    </Box>
  );
};

export default AddNFTPage;
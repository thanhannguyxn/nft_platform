import React, { useState } from "react";
import { Card, CardContent, Typography, Grid, Button, Box, Container, TextField, InputAdornment, MenuItem, Select, FormControl, InputLabel } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SearchIcon from "@mui/icons-material/Search";

const NFTGallery = ({ nfts }) => {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("");

  const handleNFTClick = (nft) => {
    navigate(`/nft/${nft.id}`, { state: { nft } });
  };

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  const sortedNFTs = [...nfts].sort((a, b) => {
    if (sortOption === "priceAsc") {
      return a.price - b.price;
    } else if (sortOption === "priceDesc") {
      return b.price - a.price;
    } else if (sortOption === "nameAsc") {
      return a.name.localeCompare(b.name);
    } else if (sortOption === "nameDesc") {
      return b.name.localeCompare(a.name);
    }
    return 0;
  });

  const filteredNFTs = sortedNFTs.filter((nft) =>
    nft.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    nft.id.toString().includes(searchTerm)
  );

  return (
    <div style={{ backgroundColor: "#121212", padding: "20px", minHeight: "100vh" }}>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 20px" }}>
        <Typography variant="h4" style={{ color: "#fff", fontWeight: "bold" }}>
          Latest NFTs
        </Typography>
        <div style={{ display: "flex", alignItems: "center" }}>
          <TextField
            variant="outlined"
            placeholder="Search NFTs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              backgroundColor: "#1e1e1e",
              borderRadius: "10px",
              width: "100%",
              maxWidth: "300px",
              color: "#fff",
              marginRight: "10px",
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon style={{ color: "#fff" }} />
                </InputAdornment>
              ),
              style: { color: "#fff", border: "1px solid #444" }
            }}
          />
          <FormControl variant="outlined" style={{ minWidth: 120, backgroundColor: "#1e1e1e", borderRadius: "10px" }}>
            <InputLabel style={{ color: "#fff" }}>Sort By</InputLabel>
            <Select
              value={sortOption}
              onChange={handleSortChange}
              label="Sort By"
              style={{ color: "#fff", border: "1px solid #444" }}
            >
              <MenuItem value="priceAsc">Price: Low to High</MenuItem>
              <MenuItem value="priceDesc">Price: High to Low</MenuItem>
              <MenuItem value="nameAsc">Name: A to Z</MenuItem>
              <MenuItem value="nameDesc">Name: Z to A</MenuItem>
            </Select>
          </FormControl>
        </div>
      </header>
      <Container>
        <Grid container spacing={3} justifyContent="center" style={{ marginTop: "20px" }}>
          {filteredNFTs.map((nft) => (
            <Grid item key={nft.id} xs={12} sm={6} md={4} lg={3} style={{ display: "flex", justifyContent: "center" }}>
              <Card
                onClick={() => handleNFTClick(nft)}
                style={{
                  backgroundColor: "#1e1e1e",
                  color: "#fff",
                  cursor: "pointer",
                  transition: "transform 0.3s ease-in-out, border 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
                  borderRadius: "15px",
                  overflow: "hidden",
                  border: hovered === nft.id ? "2px solid #aaa" : "1px solid #444",
                  paddingBottom: "10px",
                  position: "relative",
                  width: "100%",
                  maxWidth: "300px",
                  textAlign: "center",
                  boxShadow: hovered === nft.id ? "0px 4px 15px rgba(255, 255, 255, 0.2)" : "none",
                }}
                onMouseEnter={() => setHovered(nft.id)}
                onMouseLeave={() => setHovered(null)}
              >
                <Box style={{ padding: "10px" }}>
                  <img
                    src={nft.image}
                    alt={nft.name}
                    style={{ width: "100%", height: "250px", objectFit: "cover", borderRadius: "10px" }}
                  />
                </Box>
                {hovered === nft.id && nft.status !== "Out of Stock" && (
                  <Button
                    variant="contained"
                    startIcon={<ShoppingCartIcon />}
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      backgroundColor: "#ffcc00",
                      color: "#000",
                      fontWeight: "bold",
                      animation: "fadeIn 0.3s ease-in-out",
                    }}
                  >
                    Buy Now
                  </Button>
                )}
                <CardContent>
                  <Typography variant="h6" style={{ fontWeight: "bold" }}>
                    {nft.name}
                  </Typography>
                  <Typography variant="body2" style={{ color: "#bbb" }}>
                    {nft.creator}
                  </Typography>
                  <Box
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginTop: "10px",
                      backgroundColor: "#222",
                      padding: "10px",
                      borderRadius: "10px",
                    }}
                  >
                    <Typography variant="body2" style={{ color: nft.status === "Available" ? "#4caf50" : "#f44336" }}>
                      ● {nft.status}
                    </Typography>
                    <Typography variant="body2" style={{ color: "#ffcc00" }}>
                      {nft.price} ETH
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
};

export default NFTGallery;

import React, { useState } from "react";
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  Pagination,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward"; 

const ItemList = ({ nfts = [] }) => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1); // State for current page
  const itemsPerPage = 4; // Number of items per page
  const [hoveredCard, setHoveredCard] = useState(null); // State for hovered card

  const handleExploreClick = (nft) => {
    navigate(`/nft/${nft.id}`, { state: { nft } }); // Navigate to NFT detail page
  };

  const getStatusStyle = (status) => ({
    color: status === "Out of Stock" ? "red" : "#00FF00", // Color based on status
    fontWeight: "bold",
  });

  // Calculate start and end index for pagination
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedNFTs = nfts.slice(startIndex, endIndex); // NFTs to display on current page

  return (
    <Box sx={{ py: 4, px: 4, bgcolor: "#000000" }}>
      <Typography variant="h4" fontWeight="bold" color="white">
        Our Feature Tokens <br />
        <br />
      </Typography>
      {/* NFT Grid */}
      <Grid container spacing={3} justifyContent="center">
        {displayedNFTs.map((nft) => (
          <Grid item key={nft.id} xs={12} sm={6} md={4} lg={3}>
            <Card
              sx={{
                bgcolor: "#1e1e1e",
                color: "white",
                borderRadius: 3,
                boxShadow: 3,
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: "0px 8px 20px rgba(255, 255, 0, 0.5)", 
                  cursor: "pointer",
                },
              }}
              onMouseEnter={() => setHoveredCard(nft.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <CardMedia
                component="img"
                height="250"
                src={nft.image}
                alt={nft?.name || "NFT Image"}
              />
              <CardContent sx={{ textAlign: "center", position: "relative" }}>
                <Typography variant="h6">{nft?.name || "Unnamed NFT"}</Typography>
                <Typography variant="body2" color="gray">
                  Seller: {nft?.seller || "Unknown"}
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: "bold", mt: 1 }}>
                  {nft?.price ? `${nft.price} ETH` : "N/A"}
                </Typography>

                <Typography variant="body2" sx={getStatusStyle(nft?.status || "Unknown")}>
                  {nft?.status || "Unknown"}
                </Typography>

                <Box sx={{ mt: 2, display: "flex", justifyContent: "center" }}>
                  <Button
                    variant="outlined"
                    sx={{
                      px: 3,
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: hoveredCard === nft.id ? "black" : "white",
                      borderColor: hoveredCard === nft.id ? "#ffcc00" : "white",
                      backgroundColor: hoveredCard === nft.id ? "#ffcc00" : "transparent",
                      transition: "0.3s",
                      "&:hover": {
                        backgroundColor: "#ffcc00",
                        color: "black",
                        borderColor: "#ffcc00",
                      },
                    }}
                    onClick={() => handleExploreClick(nft)}
                  >
                    <span style={{ position: "relative" }}>
                      Explore Now
                      <ArrowForwardIcon
                        sx={{
                          position: "absolute",
                          right: hoveredCard === nft.id ? -25 : 0,
                          top: "50%",
                          transform: "translateY(-50%)",
                          opacity: hoveredCard === nft.id ? 1 : 0,
                          color: hoveredCard === nft.id ? "black" : "transparent",
                          transition: "opacity 0.3s ease, right 0.3s ease, color 0.3s ease",
                        }}
                      />
                    </span>
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Pagination */}
      <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
        <Pagination
          count={Math.ceil(nfts.length / itemsPerPage)} // Total number of pages
          page={page}
          onChange={(event, value) => setPage(value)}
          color="primary"
          size="large"
          sx={{
            "& .MuiPaginationItem-root": {
              color: "white",
            },
            "& .MuiPaginationItem-page.Mui-selected": {
              backgroundColor: "#ffcc00",
              color: "black",
            },
            "& .MuiPaginationItem-page:hover": {
              backgroundColor: "#d4af37",
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default ItemList;
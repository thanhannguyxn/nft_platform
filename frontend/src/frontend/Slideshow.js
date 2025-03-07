import React from "react";
import Carousel from "react-material-ui-carousel";
import { Box, Typography } from "@mui/material";

const items = [
  {
    name: "Welcome to NFTs.",
    description: "Explore the world of digital collectibles and art.",
    imageUrl: "/images/nft-background1.jpg",
  },
  {
    name: "Discover Unique NFTs",
    description: "Buy, sell, and explore digital assets securely.",
    imageUrl: "/images/nft-background2.jpg",
  },
  {
    name: "The Future of Digital Art",
    description: "Own a piece of history with blockchain technology.",
    imageUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1000&auto=format&fit=crop&q=60",
  },
  {
    name: "Trade with Confidence",
    description: "Your assets are secured with the latest encryption.",
    imageUrl: "/images/nft-background3.jpg",
  },
];

function Slideshow() {
  return (
    <Carousel animation="fade" indicators={false} duration={1500} interval={3000}>
      {items.map((item, i) => (
        <SlideItem key={i} item={item} />
      ))}
    </Carousel>
  );
}

function SlideItem({ item }) {
  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: { xs: "100vh", md: "100dch" },
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Background Image */}
      <Box
        component="img"
        src={item.imageUrl}
        alt={item.name}
        sx={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          position: "absolute",
          top: 0,
          left: 0,
          filter: "brightness(0.5)",
        }}
      />

      {/* Overlay Gradient */}
      <Box
        sx={{
          position: "absolute",
          width: "100%",
          height: "100%",
          background: "linear-gradient(to bottom, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.8))",
        }}
      />

      {/* Overlay Text */}
      <Box
        sx={{
          position: "absolute",
          textAlign: "center",
          color: "white",
          zIndex: 2,
          px: 3,
          animation: "fadeIn 1.5s ease-in-out",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            mb: 1,
            textShadow: "2px 2px 10px rgba(0, 0, 0, 0.5)",
            color: item.name === "Welcome to NFTs." ? "#FFCC00" : "white",
          }}
        >
          {item.name}
        </Typography>
        {item.description && (
          <Typography variant="body1" sx={{ fontSize: "1.2rem" }}>
            {item.description}
          </Typography>
        )}
      </Box>
    </Box>
  );
}

export default Slideshow;


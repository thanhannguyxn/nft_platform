import React from 'react';
import Slideshow from './Slideshow';  
import ItemList from './ItemList';    
import { Box, Typography, Grid, Paper } from "@mui/material";
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';

function HomePage({ nfts }) { 
  // NFT description data
  const nftInfo = [
    { 
      title: "NFTs - The Future of Digital Ownership", 
      content: "Non-Fungible Tokens (NFTs) are unique digital assets that exist on blockchain technology, allowing users to truly own digital art, collectibles, and in-game items."
    },
    { 
      title: "Why Are NFTs Valuable?", 
      content: "Unlike traditional digital files, NFTs come with **proof of ownership and scarcity**. Their value is determined by demand, rarity, and utility in digital ecosystems.",
      highlight: true
    },
    { 
      title: "NFT Marketplaces", 
      content: "Users can trade NFTs on various platforms like **OpenSea, Rarible, and Foundation**, where artists and collectors interact directly."
    },
    { 
      title: "NFTs in Gaming & Metaverse", 
      content: "NFTs are revolutionizing gaming by enabling **players to own in-game assets**, trade virtual land, and participate in the growing metaverse economy."
    },
  ];

  return (
    <div className="HomePage">
      <Slideshow />

      <Box sx={{ p: 4, textAlign: "left", backgroundColor: "#121212", color: "white" }}>
      <RocketLaunchIcon sx={{ color: '#ffcc00', mr: 1 }} />
      <Typography variant="h4" fontWeight="bold" sx={{ color: '#ffcc00' }}>
        Understanding NFTs
      </Typography>
        <Typography variant="body1" sx={{ mt: 1, color: "#aaaaaa" }}>
          Explore the world of NFTs and their impact on digital ownership.
        </Typography>

        <Grid container spacing={3} sx={{ mt: 3 }}>
          {nftInfo.map((info, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Paper
                sx={{
                  p: 3,
                  backgroundColor: info.highlight ? "#002b00" : "#1c1c1c",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: 2,
                  textAlign: "center",
                  minHeight: "200px", 
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center", 
                  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.5)", 
                  transition: "transform 0.3s, box-shadow 0.3s", 
                  '&:hover': {
                    transform: 'translateY(-5px)', 
                    boxShadow: "0 8px 30px rgba(0, 0, 0, 0.7)", 
                  }
                }}
              >
                <Typography variant="subtitle1" sx={{ color: info.highlight ? "#00ff88" : "#aaaaaa" }}>
                  {info.title}
                </Typography>
                <Typography variant="body2" sx={{ mt: 1, color: info.highlight ? "#00ff88" : "white" }}>
                  {info.content}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
      <ItemList nfts={nfts} />
    </div>
  );
}

export default HomePage;
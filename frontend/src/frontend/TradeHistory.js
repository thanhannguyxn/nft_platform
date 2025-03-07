import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Box } from '@mui/material';

const TradeHistory = ({ tradeHistory }) => {
  return (
    <Box 
      style={{ backgroundColor: '#121212', minHeight: '100vh', padding: '40px', color: '#fff' }} 
    >
      <Typography 
        variant="h4" 
        style={{ textAlign: 'left', fontWeight: 'bold', marginBottom: '20px' }} // Page title for the trade history
      >
        Bought NFTs
      </Typography>
      
      <TableContainer 
        component={Paper} 
        style={{ backgroundColor: '#1e1e1e', borderRadius: '10px' }} 
      >
        <Table>
          <TableHead>
            <TableRow style={{ backgroundColor: '#222' }}> {/* Dark header row */}
              <TableCell style={{ color: '#fff', fontWeight: 'bold' }}>NFT ID</TableCell>
              <TableCell style={{ color: '#fff', fontWeight: 'bold' }}>Name</TableCell>
              <TableCell style={{ color: '#fff', fontWeight: 'bold' }}>Price</TableCell>
              <TableCell style={{ color: '#fff', fontWeight: 'bold' }}>Date Bought</TableCell>
              <TableCell style={{ color: '#fff', fontWeight: 'bold' }}>Status</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {tradeHistory.map((nft) => (
              <TableRow 
                key={nft.id} 
                style={{ backgroundColor: '#181818' }} 
              >
                <TableCell style={{ color: '#bbb' }}>{nft.id}</TableCell> {/* NFT ID */}
                <TableCell style={{ color: '#bbb' }}>{nft.name}</TableCell> {/* NFT Name */}
                <TableCell style={{ color: '#ffcc00' }}>{nft.price} ETH</TableCell> {/* Price in ETH */}
                <TableCell style={{ color: '#bbb' }}>{new Date().toLocaleDateString()}</TableCell> {/* Date of purchase */}
                <TableCell 
                  style={{ color: nft.status === 'Available' ? '#4caf50' : '#f44336' }} // Green if successful, red if unsuccessful
                >
                  {nft.status === 'Available' ? 'Successful' : 'Unsuccessful'}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default TradeHistory;

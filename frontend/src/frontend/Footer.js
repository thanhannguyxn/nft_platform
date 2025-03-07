import React from "react";
import { Grid, Box, Typography, Link, Divider, Container } from '@mui/material';
import { Facebook, Instagram, GitHub } from '@mui/icons-material';

const Footer = () => {
    return (
        <>
            {/* White horizontal line placed right above the footer */}
            <Box sx={{ width: "100vw", height: "2px", bgcolor: "white", opacity: 0.3 }} />

            <Box component="footer" sx={{ bgcolor: '#000000', color: 'white', width: '100vw', py: 3 }}>
                <Container>
                    {/* Footer Links */}
                    <Grid container spacing={3}>
                        {/* "For Business" section */}
                        <Grid item xs={12} sm={6} md={2}>
                            <Typography variant="h6" sx={{ fontWeight: 'bold' }} gutterBottom>For Business</Typography>
                            <Box>
                                <Link href="/employer" color="inherit" underline="none">
                                    <Typography variant="body2">Employer</Typography>
                                </Link>
                                <Link href="/healthplan" color="inherit" underline="none">
                                    <Typography variant="body2">Health Plan</Typography>
                                </Link>
                                <Link href="/individual" color="inherit" underline="none">
                                    <Typography variant="body2">Individual</Typography>
                                </Link>
                            </Box>
                        </Grid>
                        
                        {/* "Resources" section */}
                        <Grid item xs={12} sm={6} md={2}>
                            <Typography variant="h6" sx={{ fontWeight: 'bold' }} gutterBottom>Resources</Typography>
                            <Box>
                                <Link href="/resource" color="inherit" underline="none">
                                    <Typography variant="body2">Resource Center</Typography>
                                </Link>
                                <Link href="/resource" color="inherit" underline="none">
                                    <Typography variant="body2">Testimonial</Typography>
                                </Link>
                                <Link href="/resource" color="inherit" underline="none">
                                    <Typography variant="body2">STV</Typography>
                                </Link>
                            </Box>
                        </Grid>
                            
                        {/* "Partner" section */}
                        <Grid item xs={12} sm={6} md={2}>
                            <Typography variant="h6" sx={{ fontWeight: 'bold' }} gutterBottom>Partner</Typography>
                            <Box>
                                <Link href="/partner" color="inherit" underline="none">
                                    <Typography variant="body2">Swinburne Vietnam</Typography>
                                </Link>
                            </Box>
                        </Grid>

                        {/* "Company" section */}
                        <Grid item xs={12} sm={6} md={2}>
                            <Typography variant="h6" sx={{ fontWeight: 'bold' }} gutterBottom>Company</Typography>
                            <Box>
                                <Link href="/about" color="inherit" underline="none">
                                    <Typography variant="body2">About</Typography>
                                </Link>
                                <Link href="/career" color="inherit" underline="none">
                                    <Typography variant="body2">Career</Typography>
                                </Link>
                                <Link href="/contact" color="inherit" underline="none">
                                    <Typography variant="body2">Contact</Typography>
                                </Link>
                            </Box>
                        </Grid>

                        {/* Social media links */}
                        <Grid item xs={12} sm={6} md={4}>
                            <Typography variant="h6" sx={{ fontWeight: 'bold' }} gutterBottom>Follow us</Typography>
                            <Box display="flex" alignItems="center">
                                <Link href="https://facebook.com" target="_blank">
                                    <Facebook sx={{ fontSize: '2rem', color: 'white', mr: 2, "&:hover": { color: "#FFFF00" } }} />
                                </Link>
                                <Link href="https://instagram.com" target="_blank">
                                    <Instagram sx={{ fontSize: '2rem', color: 'white', mr: 2, "&:hover": { color: "#FFFF00" } }} />
                                </Link>
                                <Link href="https://github.com" target="_blank">
                                    <GitHub sx={{ fontSize: '2rem', color: 'white', "&:hover": { color: "#FFFF00" } }} />
                                </Link>
                            </Box>
                        </Grid>
                    </Grid>

                    {/* Divider */}
                    <Divider sx={{ bgcolor: 'rgba(255, 255, 255, 0.3)', my: 3 }} />

                    {/* Footer Bottom */}
                    <Box display="flex" justifyContent="space-between" alignItems="center" flexWrap="wrap">
                        <Typography variant="body2" sx={{ fontSize: '13px', fontWeight: 600 }}>
                            Group 3 @ {new Date().getFullYear()}<br />COS30049 - Computing Technology Innovation Project
                        </Typography>
                        <Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} alignItems={{ xs: 'start', sm: 'center' }}>
                            <Link href="/terms" color="inherit" underline="none" sx={{ ml: { sm: 3 }, my: { xs: 1, sm: 0 }, "&:hover": { color: "#FFFF00" } }}>
                                <Typography variant="body2">Terms & Conditions</Typography>
                            </Link>
                            <Link href="/privacy" color="inherit" underline="none" sx={{ ml: { sm: 3 }, my: { xs: 1, sm: 0 }, "&:hover": { color: "#FFFF00" } }}>
                                <Typography variant="body2">Privacy</Typography>
                            </Link>
                            <Link href="/security" color="inherit" underline="none" sx={{ ml: { sm: 3 }, my: { xs: 1, sm: 0 }, "&:hover": { color: "#FFFF00" } }}>
                                <Typography variant="body2">Security</Typography>
                            </Link>
                            <Link href="/cookie" color="inherit" underline="none" sx={{ ml: { sm: 3 }, my: { xs: 1, sm: 0 }, "&:hover": { color: "#FFFF00" } }}>
                                <Typography variant="body2">Cookie Declaration</Typography>
                            </Link>
                        </Box>
                    </Box>
                </Container>
            </Box>
        </>
    );
}

export default Footer;
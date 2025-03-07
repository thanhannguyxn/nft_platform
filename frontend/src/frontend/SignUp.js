import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Paper, Box, Grid } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [walletAddress, setWalletAddress] = useState('');
    const [idNumber, setIdNumber] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    const handleSignUp = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://localhost:8000/register', {
                name: `${firstName} ${lastName}`,
                email: email,
                wallet_address: walletAddress,
                id_number: idNumber,
                password: password
            });

            setSuccessMessage(response.data.message);
            setErrorMessage('');
            setTimeout(() => navigate('/signin'), 2000);
        } catch (error) {
            if (error.response && error.response.status === 400) {
                setErrorMessage(error.response.data.detail || 'Email already registered');
            } else {
                setErrorMessage('An error occurred. Please try again.');
            }
            setSuccessMessage('');
        }
    };

    return (
        <Container maxWidth="sm" sx={{
            display: 'flex',
            justifyContent: 'center',
            minHeight: '100vh',
            alignItems: 'center',
            color: '#fff'
        }}>
            <Paper elevation={10} sx={{
                padding: 4,
                width: '100%',
                maxWidth: 450,
                bgcolor: '#1e1e1e',
                borderRadius: 3,
                textAlign: 'center'
            }}>
                <Typography variant="h4" fontWeight="bold" sx={{ color: '#FFCC00', mb: 2 }}>
                    Create Account
                </Typography>
                <Typography variant="body1" sx={{ color: '#bbb', mb: 3 }}>
                    Join the NFT marketplace and start trading now.
                </Typography>

                {errorMessage && <Typography sx={{ color: '#ff4d4d', fontWeight: 'bold' }}>{errorMessage}</Typography>}
                {successMessage && <Typography sx={{ color: '#4caf50', fontWeight: 'bold' }}>{successMessage}</Typography>}

                <form onSubmit={handleSignUp}>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="First Name"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                required
                                sx={inputStyle}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Last Name"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                required
                                sx={inputStyle}
                            />
                        </Grid>
                    </Grid>
                    <TextField
                        fullWidth
                        variant="outlined"
                        label="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        sx={inputStyle}
                    />
                    <TextField
                        fullWidth
                        variant="outlined"
                        label="Wallet Address"
                        value={walletAddress}
                        onChange={(e) => setWalletAddress(e.target.value)}
                        required
                        sx={inputStyle}
                    />
                    <TextField
                        fullWidth
                        variant="outlined"
                        label="ID Number"
                        value={idNumber}
                        onChange={(e) => setIdNumber(e.target.value)}
                        required
                        sx={inputStyle}
                    />
                    <TextField
                        fullWidth
                        variant="outlined"
                        label="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        sx={inputStyle}
                    />

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{
                            mt: 3,
                            mb: 2,
                            bgcolor: '#FFCC00',
                            color: '#000',
                            fontWeight: 'bold',
                            '&:hover': { bgcolor: '#d4af37' }
                        }}
                    >
                        Sign Up
                    </Button>
                </form>

                <Typography variant="body2" sx={{ mt: 2, color: '#bbb' }}>
                    Already have an account?{" "}
                    <Typography
                        component="a"
                        href="/signin"
                        sx={{ color: '#FFCC00', fontWeight: 'bold', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
                    >
                        Sign In
                    </Typography>
                </Typography>
            </Paper>
        </Container>
    );
};

// Style for input fields
const inputStyle = {
    mb: 2,
    bgcolor: '#292929',
    borderRadius: '8px',
    input: { color: '#fff' },
    label: { color: '#bbb' },
    fieldset: { borderColor: '#444' },
    '&:hover fieldset': { borderColor: '#FFCC00' },
    '&.Mui-focused fieldset': { borderColor: '#FFCC00' }
};

export default SignUp;


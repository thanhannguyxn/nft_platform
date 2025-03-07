import { createTheme } from '@mui/material/styles';

//This sets a custom theme for every single page in the website (color inspired by GitHub's dark mode).
const theme = createTheme({
  palette: {
    // Set the theme mode to 'dark' for a dark background with light text
    mode: 'dark',
    // Define the default background color for the website and paper elements
    background: {
      // Main background color of the page
      default: '#0d1117',
      // Background color for components like Paper
      paper: '#161b22',
    },
    // Define text colors, making primary text white and secondary text a lighter shade of gray
    text: {
      primary: '#ffffff',
      secondary: '#8b949e',
    },
    // Define the primary color for UI components (like buttons, links, etc.)
    primary: {
      main: '#58a6ff',
    },
  },
  // Custom font for the application, Arial as a fallback sans-serif font
  typography: {
    fontFamily: 'Arial, sans-serif',
  },
});

export default theme;

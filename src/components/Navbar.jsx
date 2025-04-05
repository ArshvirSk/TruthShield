import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import { AppBar, Box, Button, Container, Toolbar, Typography, useTheme } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const Navbar = () => {
  const theme = useTheme();
  
  return (
    <AppBar 
      position="static" 
      sx={{ 
        mb: 4,
        background: `linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Logo and Title */}
          <Box 
            sx={{ 
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              mr: 2 
            }}
          >
            <VerifiedUserIcon 
              sx={{ 
                fontSize: 36, 
                mr: 1,
                filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.2))"
              }} 
            />
            <Typography
              variant="h5"
              noWrap
              component={RouterLink}
              to="/"
              sx={{
                fontWeight: 800,
                letterSpacing: ".05rem",
                color: "white",
                textDecoration: "none",
                textShadow: "0 2px 4px rgba(0,0,0,0.2)",
              }}
            >
              TRUTH SHIELD
            </Typography>
          </Box>

          {/* Mobile Logo */}
          <Box
            sx={{
              display: { xs: "flex", md: "none" },
              alignItems: "center",
              flexGrow: 1,
            }}
          >
            <VerifiedUserIcon sx={{ fontSize: 28, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component={RouterLink}
              to="/"
              sx={{
                fontWeight: 700,
                color: "white",
                textDecoration: "none",
              }}
            >
              TRUTH SHIELD
            </Typography>
          </Box>

          {/* Navigation Links */}
          <Box 
            sx={{ 
              flexGrow: 1, 
              display: "flex", 
              justifyContent: { xs: "flex-end", md: "center" } 
            }}
          >
            <Button
              component={RouterLink}
              to="/deepfake-detection"
              sx={{ 
                mx: 1,
                my: 2, 
                color: "white", 
                display: "block",
                position: "relative",
                "&::after": {
                  content: '""',
                  position: "absolute",
                  width: "0",
                  height: "2px",
                  bottom: "6px",
                  left: "50%",
                  backgroundColor: "white",
                  transition: "all 0.3s ease",
                },
                "&:hover::after": {
                  width: "80%",
                  left: "10%",
                },
              }}
            >
              Deepfake Detection
            </Button>
            <Button
              component={RouterLink}
              to="/fake-news"
              sx={{ 
                mx: 1,
                my: 2, 
                color: "white", 
                display: "block",
                position: "relative",
                "&::after": {
                  content: '""',
                  position: "absolute",
                  width: "0",
                  height: "2px",
                  bottom: "6px",
                  left: "50%",
                  backgroundColor: "white",
                  transition: "all 0.3s ease",
                },
                "&:hover::after": {
                  width: "80%",
                  left: "10%",
                },
              }}
            >
              Fake News Finder
            </Button>
            <Button
              component={RouterLink}
              to="/about"
              sx={{ 
                mx: 1,
                my: 2, 
                color: "white", 
                display: "block",
                position: "relative",
                "&::after": {
                  content: '""',
                  position: "absolute",
                  width: "0",
                  height: "2px",
                  bottom: "6px",
                  left: "50%",
                  backgroundColor: "white",
                  transition: "all 0.3s ease",
                },
                "&:hover::after": {
                  width: "80%",
                  left: "10%",
                },
              }}
            >
              About
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;

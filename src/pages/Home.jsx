import ImageIcon from "@mui/icons-material/Image";
import ArticleIcon from "@mui/icons-material/Article";
import InfoIcon from "@mui/icons-material/Info";
import ShieldIcon from "@mui/icons-material/Shield";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Divider,
  Grid,
  Paper,
  Typography,
  useTheme,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const Home = () => {
  const theme = useTheme();

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 50%, ${theme.palette.secondary.main} 100%)`,
          color: "white",
          py: { xs: 8, md: 12 },
          mb: 6,
          position: "relative",
          overflow: "hidden",
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "20px 20px",
            opacity: 0.3,
          },
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ textAlign: "center", position: "relative", zIndex: 2 }}>
            <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
              <VerifiedUserIcon sx={{ fontSize: 60, filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.3))" }} />
            </Box>
            <Typography
              component="h1"
              variant="h2"
              gutterBottom
              fontWeight="bold"
              sx={{
                textShadow: "0 2px 10px rgba(0,0,0,0.2)",
                letterSpacing: "0.05em",
                mb: 3,
              }}
            >
              TRUTH SHIELD
            </Typography>
            <Typography 
              variant="h5" 
              paragraph
              sx={{
                maxWidth: "800px", 
                mx: "auto",
                mb: 4,
                fontWeight: 300,
                textShadow: "0 2px 4px rgba(0,0,0,0.2)",
              }}
            >
              Your defense against digital deception in the age of AI
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                gap: 2,
                flexWrap: "wrap",
              }}
            >
              <Button
                component={RouterLink}
                to="/deepfake-detection"
                variant="contained"
                size="large"
                sx={{
                  bgcolor: "white",
                  color: theme.palette.primary.main,
                  px: 4,
                  py: 1.5,
                  fontWeight: 600,
                  "&:hover": {
                    bgcolor: "rgba(255,255,255,0.9)",
                  },
                }}
              >
                Detect Deepfakes
              </Button>
              <Button
                component={RouterLink}
                to="/fake-news"
                variant="outlined"
                size="large"
                sx={{
                  borderColor: "white",
                  color: "white",
                  px: 4,
                  py: 1.5,
                  fontWeight: 600,
                  "&:hover": {
                    borderColor: "white",
                    bgcolor: "rgba(255,255,255,0.1)",
                  },
                }}
              >
                Analyze News
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Main Content */}
      <Container maxWidth="lg">
        <Box sx={{ textAlign: "center", mb: 8 }}>
          <Typography
            variant="h4"
            component="h2"
            gutterBottom
            fontWeight="bold"
            color="primary"
          >
            Protect Yourself in the Digital Age
          </Typography>
          <Typography variant="body1" paragraph sx={{ maxWidth: "800px", mx: "auto", mb: 4 }}>
            Truth Shield provides powerful tools to detect deepfake images and analyze 
            news content for credibility, helping you navigate the complex landscape of 
            digital information with confidence.
          </Typography>
          <Divider sx={{ maxWidth: "200px", mx: "auto", mb: 6 }} />
        </Box>

      <Grid container spacing={4} sx={{ mb: 10 }}>
        <Grid item xs={12} md={6} lg={4}>
          <Card
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              transition: "all 0.3s ease",
              borderRadius: 2,
              overflow: "hidden",
              "&:hover": {
                transform: "translateY(-8px)",
                boxShadow: "0 16px 30px rgba(0,0,0,0.12)",
              },
            }}
          >
            <CardMedia
              component="div"
              sx={{
                pt: "56.25%", // 16:9 aspect ratio
                background: `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                overflow: "hidden",
                "&::after": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)",
                  backgroundSize: "15px 15px",
                  opacity: 0.4,
                },
              }}
            >
              <ImageIcon
                sx={{
                  fontSize: 80,
                  color: "white",
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  zIndex: 2,
                  filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.2))",
                }}
              />
            </CardMedia>
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography gutterBottom variant="h5" component="h2">
                Deepfake Detection
              </Typography>
              <Typography>
                Upload images to instantly analyze whether they've been artificially
                generated or manipulated using AI technology. Our advanced model can
                detect subtle signs of manipulation.
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                size="small"
                component={RouterLink}
                to="/deepfake-detection"
                color="primary"
              >
                Try It Now
              </Button>
            </CardActions>
          </Card>
        </Grid>

        <Grid item xs={12} md={6} lg={4}>
          <Card
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              transition: "all 0.3s ease",
              borderRadius: 2,
              overflow: "hidden",
              "&:hover": {
                transform: "translateY(-8px)",
                boxShadow: "0 16px 30px rgba(0,0,0,0.12)",
              },
            }}
          >
            <CardMedia
              component="div"
              sx={{
                pt: "56.25%", // 16:9 aspect ratio
                background: `linear-gradient(135deg, ${theme.palette.secondary.light} 0%, ${theme.palette.secondary.main} 100%)`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                overflow: "hidden",
                "&::after": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)",
                  backgroundSize: "15px 15px",
                  opacity: 0.4,
                },
              }}
            >
              <ArticleIcon
                sx={{
                  fontSize: 80,
                  color: "white",
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  zIndex: 2,
                  filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.2))",
                }}
              />
            </CardMedia>
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography gutterBottom variant="h5" component="h2">
                Fake News Finder
              </Typography>
              <Typography>
                Enter a URL to analyze news articles for credibility. Our system
                evaluates source reputation, cross-references facts, and detects
                potential bias or misleading information.
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                size="small"
                component={RouterLink}
                to="/fake-news"
                color="secondary"
              >
                Try It Now
              </Button>
            </CardActions>
          </Card>
        </Grid>

        <Grid item xs={12} md={6} lg={4}>
          <Card
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              transition: "all 0.3s ease",
              borderRadius: 2,
              overflow: "hidden",
              "&:hover": {
                transform: "translateY(-8px)",
                boxShadow: "0 16px 30px rgba(0,0,0,0.12)",
              },
            }}
          >
            <CardMedia
              component="div"
              sx={{
                pt: "56.25%", // 16:9 aspect ratio
                background: `linear-gradient(135deg, ${theme.palette.info.light} 0%, ${theme.palette.info.main} 100%)`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                overflow: "hidden",
                "&::after": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)",
                  backgroundSize: "15px 15px",
                  opacity: 0.4,
                },
              }}
            >
              <InfoIcon
                sx={{
                  fontSize: 80,
                  color: "white",
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  zIndex: 2,
                  filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.2))",
                }}
              />
            </CardMedia>
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography gutterBottom variant="h5" component="h2">
                About Truth Shield
              </Typography>
              <Typography>
                Learn about the technology behind Truth Shield, how our AI models work,
                and best practices for identifying manipulated media and misleading
                content in your daily digital life.
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                size="small"
                component={RouterLink}
                to="/about"
                color="info"
              >
                Learn More
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
      </Container>

      {/* Footer Section */}
      <Box
        sx={{
          bgcolor: "rgba(0, 0, 0, 0.02)",
          py: 6,
          borderTop: "1px solid rgba(0, 0, 0, 0.05)",
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={12} md={8} textAlign="center">
              <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
                <ShieldIcon sx={{ fontSize: 40, color: theme.palette.primary.main, opacity: 0.8 }} />
              </Box>
              <Typography variant="h6" gutterBottom color="primary.main">
                Stay Informed, Stay Protected
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                As AI technology advances, the ability to detect manipulated media becomes increasingly important.
                Truth Shield is committed to providing cutting-edge tools to help you navigate the digital landscape safely.
              </Typography>
              <Button
                component={RouterLink}
                to="/about"
                variant="outlined"
                color="primary"
                sx={{ mt: 2 }}
              >
                Learn More About Our Mission
              </Button>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;

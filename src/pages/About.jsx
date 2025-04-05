import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  Grid,
  Paper,
  Typography,
  useTheme,
} from "@mui/material";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import SecurityIcon from "@mui/icons-material/Security";
import WarningIcon from "@mui/icons-material/Warning";
import BuildIcon from "@mui/icons-material/Build";
import PsychologyIcon from "@mui/icons-material/Psychology";

const About = () => {
  const theme = useTheme();
  
  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          background: `linear-gradient(135deg, ${theme.palette.info.dark} 0%, ${theme.palette.info.main} 100%)`,
          color: "white",
          py: 8,
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
        <Container maxWidth="md">
          <Box sx={{ textAlign: "center", position: "relative", zIndex: 2 }}>
            <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
              <SecurityIcon sx={{ fontSize: 60, filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.3))" }} />
            </Box>
            <Typography
              variant="h3" 
              component="h1" 
              gutterBottom 
              sx={{
                fontWeight: "bold",
                textShadow: "0 2px 10px rgba(0,0,0,0.2)",
              }}
            >
              About Truth Shield
            </Typography>
            <Typography 
              variant="h6" 
              sx={{
                maxWidth: "800px", 
                mx: "auto",
                fontWeight: 300,
                textShadow: "0 2px 4px rgba(0,0,0,0.2)",
                mb: 2,
              }}
            >
              Empowering you with tools to navigate the digital landscape safely
            </Typography>
          </Box>
        </Container>
      </Box>
      
      <Container maxWidth="md">
        <Box sx={{ mb: 8 }}>
        
        <Grid container spacing={4} sx={{ mb: 6 }}>
          <Grid item xs={12} md={6}>
            <Card sx={{ height: "100%", borderRadius: 2, boxShadow: "0 8px 24px rgba(0,0,0,0.08)" }}>
              <CardContent>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <VerifiedUserIcon sx={{ color: theme.palette.primary.main, mr: 1, fontSize: 28 }} />
                  <Typography variant="h5" component="h2" color="primary.main">
                    Our Mission
                  </Typography>
                </Box>
                <Typography paragraph>
                  Truth Shield was created to empower people with tools to identify manipulated media and misleading information in an era where AI-generated content is becoming increasingly sophisticated and prevalent.
                </Typography>
                <Typography paragraph>
                  We believe that by providing accessible technology to verify digital content, we can help maintain trust in our information ecosystem and protect individuals from deception.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Card sx={{ height: "100%", borderRadius: 2, boxShadow: "0 8px 24px rgba(0,0,0,0.08)" }}>
              <CardContent>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <BuildIcon sx={{ color: theme.palette.secondary.main, mr: 1, fontSize: 28 }} />
                  <Typography variant="h5" component="h2" color="secondary.main">
                    Our Technology
                  </Typography>
                </Box>
                <Typography paragraph>
                  <strong>Deepfake Detection:</strong> Our image analysis system uses advanced machine learning models from Hugging Face to detect signs of artificial manipulation in images.
                </Typography>
                <Typography paragraph>
                  <strong>Fake News Analysis:</strong> Our text analysis tools examine multiple factors including source credibility, factual consistency, and writing style to determine the likelihood that content is misleading.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        
        <Paper 
          elevation={0} 
          sx={{ 
            p: 4, 
            mt: 4, 
            borderRadius: 2,
            background: `linear-gradient(to right, rgba(255,255,255,0.9), rgba(255,255,255,0.95))`,
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(0,0,0,0.05)",
            boxShadow: "0 10px 30px rgba(0,0,0,0.05)"
          }}>
          <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
            <PsychologyIcon sx={{ color: theme.palette.info.main, mr: 1, fontSize: 30 }} />
            <Typography variant="h5" component="h2" color="info.main" fontWeight="medium">
              How to Protect Yourself
            </Typography>
          </Box>
          
          <Typography variant="subtitle1" gutterBottom fontWeight="bold">
            Tips for identifying potentially fake content:
          </Typography>
          
          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid item xs={12} md={6}>
              <Box sx={{ 
                p: 2, 
                borderRadius: 1, 
                bgcolor: "rgba(0,0,0,0.02)",
                border: "1px solid rgba(0,0,0,0.05)",
                height: "100%"
              }}>
                <Typography component="div">
                  <ul>
                    <li>Check multiple reliable sources before believing sensational news</li>
                    <li>Look for unusual artifacts in images, especially around faces and edges</li>
                    <li>Be wary of content that triggers strong emotional reactions</li>
                  </ul>
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ 
                p: 2, 
                borderRadius: 1, 
                bgcolor: "rgba(0,0,0,0.02)",
                border: "1px solid rgba(0,0,0,0.05)",
                height: "100%"
              }}>
                <Typography component="div">
                  <ul>
                    <li>Verify the original source of images and articles</li>
                    <li>Use tools like Truth Shield to assist your evaluation</li>
                    <li>Consider the context and whether the content seems plausible</li>
                  </ul>
                </Typography>
              </Box>
            </Grid>
          </Grid>

          <Divider sx={{ my: 4 }} />

          <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
            <WarningIcon sx={{ color: theme.palette.warning.main, mr: 1, fontSize: 30 }} />
            <Typography variant="h5" component="h2" color="warning.main" fontWeight="medium">
              Limitations
            </Typography>
          </Box>
          
          <Box sx={{ 
            p: 3, 
            borderRadius: 2, 
            bgcolor: "rgba(255, 244, 229, 0.5)",
            border: "1px solid rgba(255, 167, 38, 0.2)",
            mb: 4
          }}>
            <Typography paragraph>
              While our technology is constantly improving, no detection system is perfect. AI-generated content is becoming increasingly sophisticated, and detection technologies must evolve alongside them. Our tools provide a probability assessment rather than absolute certainty.
            </Typography>
            <Typography paragraph sx={{ mb: 0 }}>
              We recommend using Truth Shield as one component of a critical thinking approach to digital media consumption, not as the sole arbiter of truth.
            </Typography>
          </Box>

          <Box sx={{ 
            p: 3, 
            borderRadius: 2, 
            bgcolor: "rgba(236, 239, 241, 0.5)",
            border: "1px solid rgba(0,0,0,0.05)",
          }}>
            <Typography variant="body2" color="text.secondary" sx={{ fontStyle: "italic", mb: 0 }}>
              Truth Shield is a demonstration project created for educational purposes. The technology is based on current research in deepfake detection and misinformation analysis.
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Container>
    </Box>
  );
};

export default About;

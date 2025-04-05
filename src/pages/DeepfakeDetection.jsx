import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Container,
  Divider,
  Grid,
  LinearProgress,
  Paper,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import ImageIcon from "@mui/icons-material/Image";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { useState } from "react";

const DeepfakeDetection = ({ serverStatus, serverPort }) => {
  const theme = useTheme();
  const [selectedFile, setSelectedFile] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      if (selectedFile) {
        URL.revokeObjectURL(URL.createObjectURL(selectedFile));
      }
      setSelectedFile(file);
      setResult(null);
      setError(null);
      setUploadProgress(0);
    } else {
      alert("Please upload a valid image file");
    }
  };

  const analyzeFile = async () => {
    if (serverStatus !== "running") {
      setError(
        'Server is not running. Please start the server with "npm run server"'
      );
      return;
    }

    // Basic file validation
    if (!selectedFile) {
      setError("Please select an image to analyze");
      return;
    }

    // Check file size
    if (selectedFile.size > 5 * 1024 * 1024) { // 5MB limit
      setError("File size too large. Please select an image under 5MB.");
      return;
    }

    setIsAnalyzing(true);
    setError(null);
    setUploadProgress(0);

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 300000); // 5 minute timeout

      console.log(`Sending image for analysis: ${selectedFile.name}`);
      
      // Show progress indicator
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          // Simulate progress up to 90% (the last 10% will be when we get the response)
          if (prev < 90) return prev + 5;
          return prev;
        });
      }, 500);

      const response = await fetch(
        `http://localhost:${serverPort}/api/analyze`,
        {
          method: "POST",
          body: formData,
          signal: controller.signal,
        }
      );

      clearTimeout(timeoutId);
      clearInterval(progressInterval);
      setUploadProgress(100); // Set to 100% when done

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Analysis failed");
      }

      const data = await response.json();
      console.log("Analysis result:", data);
      setResult(data);
    } catch (err) {
      if (err.name === "AbortError") {
        setError(
          "Request timed out. Please try again with a smaller file or check your connection."
        );
      } else {
        setError(err.message || "Failed to analyze file. Please try again.");
      }
      console.error("Error:", err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
          color: "white",
          py: { xs: 6, md: 8 },
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
              <ImageIcon sx={{ fontSize: 50, filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.3))" }} />
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
              Deepfake Image Detection
            </Typography>
            <Typography 
              variant="h6" 
              paragraph
              sx={{
                maxWidth: "800px", 
                mx: "auto",
                mb: 3,
                fontWeight: 300,
                textShadow: "0 2px 4px rgba(0,0,0,0.2)",
              }}
            >
              Upload an image to detect if it's been artificially generated or manipulated
            </Typography>
            <Typography 
              variant="body2" 
              sx={{
                maxWidth: "700px", 
                mx: "auto",
                opacity: 0.9,
              }}
            >
              Powered by Hugging Face's deepfake detection model, our AI can identify subtle signs of manipulation in images
            </Typography>
          </Box>
        </Container>
      </Box>
      
      <Container maxWidth="md">
        <Box sx={{ mb: 8 }}>

        <Paper
          elevation={0}
          sx={{
            p: 4,
            mt: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 3,
            borderRadius: 2,
            border: "1px solid rgba(0,0,0,0.05)",
            boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
          }}
        >
          {error && (
            <Alert severity="error" sx={{ width: "100%" }}>
              {error}
            </Alert>
          )}

          <Box 
            sx={{ 
              width: "100%", 
              textAlign: "center",
              border: "2px dashed rgba(0,0,0,0.1)",
              borderRadius: 2,
              py: 5,
              px: 2,
              bgcolor: "rgba(0,0,0,0.01)",
              transition: "all 0.2s ease",
              '&:hover': {
                bgcolor: "rgba(0,0,0,0.02)",
                borderColor: theme.palette.primary.main,
              },
            }}
          >
            <input
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              id="upload-button"
              onChange={handleFileUpload}
            />
            <label htmlFor="upload-button">
              <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <CloudUploadIcon sx={{ fontSize: 60, color: theme.palette.primary.main, mb: 2, opacity: 0.8 }} />
                <Typography variant="h6" gutterBottom>
                  Drag & drop an image or click to browse
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3, maxWidth: "450px" }}>
                  Supported formats: JPG, PNG, GIF, BMP (max 5MB)
                </Typography>
                <Tooltip title="Upload an image to check if it's a deepfake">
                  <Button
                    variant="contained"
                    component="span"
                    startIcon={<CloudUploadIcon />}
                    disabled={serverStatus !== "running"}
                    size="large"
                    sx={{ 
                      px: 3, 
                      py: 1,
                      borderRadius: 2,
                      fontWeight: 500,
                    }}
                  >
                    Upload Image
                  </Button>
                </Tooltip>
              </Box>
            </label>
          </Box>

          {selectedFile && (
            <Box sx={{ width: "100%", mt: 3 }}>
              <Divider sx={{ mb: 3 }} />
              
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Card sx={{ height: "100%", borderRadius: 2, overflow: "hidden" }}>
                    <img
                      src={URL.createObjectURL(selectedFile)}
                      alt="Preview"
                      style={{ width: "100%", height: "auto", display: "block" }}
                    />
                  </Card>
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <Card sx={{ height: "100%", borderRadius: 2 }}>
                    <CardContent>
                      <Typography variant="h6" gutterBottom color="text.primary">
                        Image Details
                      </Typography>
                      
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                          Filename:
                        </Typography>
                        <Typography variant="body2" sx={{ wordBreak: "break-all" }}>
                          {selectedFile.name}
                        </Typography>
                      </Box>
                      
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                          Type:
                        </Typography>
                        <Typography variant="body2">
                          {selectedFile.type}
                        </Typography>
                      </Box>
                      
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                          Size:
                        </Typography>
                        <Typography variant="body2">
                          {(selectedFile.size / 1024).toFixed(2)} KB
                        </Typography>
                      </Box>
                      
                      <Box sx={{ mt: 3 }}>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={analyzeFile}
                          disabled={isAnalyzing || serverStatus !== "running"}
                          fullWidth
                          size="large"
                          sx={{ 
                            py: 1.2,
                            borderRadius: 2,
                            fontWeight: 600,
                          }}
                        >
                          {isAnalyzing ? (
                            <>
                              <CircularProgress size={24} color="inherit" sx={{ mr: 1 }} />
                              Analyzing...
                            </>
                          ) : "Analyze Image"}
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>

              {isAnalyzing && (
                <Box sx={{ width: "100%", mt: 3 }}>
                  {uploadProgress > 0 ? (
                    <>
                      <LinearProgress
                        variant="determinate"
                        value={uploadProgress}
                        sx={{ 
                          height: 8, 
                          borderRadius: 4,
                          mb: 1,
                        }}
                      />
                      <Typography variant="body2" color="text.secondary">
                        Upload Progress: {uploadProgress}%
                      </Typography>
                    </>
                  ) : (
                    <>
                      <LinearProgress 
                        sx={{ 
                          height: 8, 
                          borderRadius: 4,
                          mb: 1,
                        }}
                      />
                      <Typography variant="body2" color="text.secondary">
                        Analyzing image for signs of manipulation...
                      </Typography>
                    </>
                  )}
                </Box>
              )}
            </Box>
          )}

          {result && (
            <Box sx={{ mt: 4, width: "100%" }}>
              <Divider sx={{ mb: 4 }} />
              
              <Box 
                sx={{ 
                  display: "flex", 
                  alignItems: "center", 
                  justifyContent: "center",
                  mb: 4,
                }}
              >
                <Box 
                  sx={{ 
                    display: "flex", 
                    alignItems: "center", 
                    justifyContent: "center",
                    p: 1.5,
                    borderRadius: "50%",
                    bgcolor: result.isDeepfake ? "error.lighter" : "success.lighter",
                    mr: 2,
                  }}
                >
                  {result.isDeepfake ? (
                    <WarningAmberIcon 
                      sx={{ 
                        fontSize: 40, 
                        color: "error.main",
                      }} 
                    />
                  ) : (
                    <CheckCircleIcon 
                      sx={{ 
                        fontSize: 40, 
                        color: "success.main",
                      }} 
                    />
                  )}
                </Box>
                <Box>
                  <Typography
                    variant="h5"
                    color={result.isDeepfake ? "error.main" : "success.main"}
                    fontWeight="medium"
                  >
                    {result.isDeepfake
                      ? "Deepfake Detected!"
                      : "Image Appears Authentic"}
                  </Typography>
                  <Typography color="text.secondary">
                    Analysis confidence: <strong>{result.confidence}%</strong>
                  </Typography>
                </Box>
              </Box>
              
              {result.details && (
                <Card 
                  sx={{ 
                    borderRadius: 2,
                    mb: 3,
                    border: result.isDeepfake ? 
                      `1px solid ${theme.palette.error.light}` : 
                      `1px solid ${theme.palette.success.light}`,
                  }}
                >
                  <CardContent>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                      <Typography variant="h6" color="text.primary">
                        Detailed Analysis
                      </Typography>
                      <Tooltip title="These scores show the probability that the image is real or fake based on our AI analysis">
                        <HelpOutlineIcon sx={{ ml: 1, color: "text.secondary", fontSize: 18 }} />
                      </Tooltip>
                    </Box>
                    
                    <Grid container spacing={3}>
                      <Grid item xs={12} md={6}>
                        <Box sx={{ mb: { xs: 2, md: 0 } }}>
                          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
                            <Typography variant="body2">Fake probability:</Typography>
                            <Typography variant="body2" fontWeight="medium">
                              {Math.floor(result.details.fakeScore * 100)}%
                            </Typography>
                          </Box>
                          <LinearProgress 
                            variant="determinate" 
                            value={result.details.fakeScore * 100} 
                            sx={{ 
                              height: 8, 
                              borderRadius: 4,
                              bgcolor: "rgba(0,0,0,0.05)",
                              '& .MuiLinearProgress-bar': {
                                bgcolor: "error.main",
                              }
                            }}
                          />
                        </Box>
                      </Grid>
                      
                      <Grid item xs={12} md={6}>
                        <Box>
                          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
                            <Typography variant="body2">Real probability:</Typography>
                            <Typography variant="body2" fontWeight="medium">
                              {Math.floor(result.details.realScore * 100)}%
                            </Typography>
                          </Box>
                          <LinearProgress 
                            variant="determinate" 
                            value={result.details.realScore * 100} 
                            sx={{ 
                              height: 8, 
                              borderRadius: 4,
                              bgcolor: "rgba(0,0,0,0.05)",
                              '& .MuiLinearProgress-bar': {
                                bgcolor: "success.main",
                              }
                            }}
                          />
                        </Box>
                      </Grid>
                    </Grid>
                    
                    <Box sx={{ mt: 3, p: 2, bgcolor: "rgba(0,0,0,0.02)", borderRadius: 1 }}>
                      <Typography variant="body2" color="text.secondary">
                        {result.isDeepfake ? (
                          "This image shows signs of artificial manipulation or generation. It may have been created or modified using AI tools."
                        ) : (
                          "This image appears to be authentic with no significant signs of manipulation detected by our AI model."
                        )}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              )}
              
              <Typography variant="body2" color="text.secondary" sx={{ fontStyle: "italic", textAlign: "center" }}>
                Note: While our AI model is highly accurate, it's not perfect. Always use critical thinking when evaluating digital content.
              </Typography>
            </Box>
          )}
        </Paper>
      </Box>
    </Container>
    </Box>
  );
};

export default DeepfakeDetection;

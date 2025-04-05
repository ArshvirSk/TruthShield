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
  TextField,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import LanguageIcon from "@mui/icons-material/Language";
import { useState } from "react";

const FakeNews = ({ serverStatus }) => {
  const theme = useTheme();
  const [url, setUrl] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [examples] = useState([
    "https://www.reuters.com/world/",
    "https://www.bbc.com/news",
    "https://apnews.com/",
  ]);

  const handleUrlChange = (event) => {
    setUrl(event.target.value);
    setResult(null);
    setError(null);
  };

  const loadExample = (exampleUrl) => {
    setUrl(exampleUrl);
    setResult(null);
    setError(null);
  };

  const analyzeUrl = async () => {
    if (!url) {
      setError("Please enter a URL to analyze");
      return;
    }

    // Basic URL validation
    try {
      new URL(url);
    } catch (e) {
      setError("Please enter a valid URL including http:// or https://");
      return;
    }

    if (serverStatus !== "running") {
      setError(
        'Server is not running. Please start the server with "npm run server"'
      );
      return;
    }

    setIsAnalyzing(true);
    setError(null);

    try {
      // This is a placeholder for future implementation
      // In a real app, you would call your API endpoint for fake news detection
      setTimeout(() => {
        // Simulate API response with more realistic data
        const isFake = Math.random() > 0.5;
        const credibilityScore = isFake
          ? Math.random() * 0.5
          : 0.5 + Math.random() * 0.5;
        const factualityScore = isFake
          ? Math.random() * 0.6
          : 0.6 + Math.random() * 0.4;
        const biasScore = isFake
          ? 0.5 + Math.random() * 0.5
          : Math.random() * 0.5;
        const sourceReputation = isFake
          ? Math.random() * 0.5
          : 0.5 + Math.random() * 0.5;

        const fakeResult = {
          isFake,
          confidence: Math.floor(
            isFake ? 70 + Math.random() * 25 : 75 + Math.random() * 20
          ),
          details: {
            credibilityScore,
            factualityScore,
            biasScore,
            sourceReputation,
          },
          source: new URL(url).hostname,
          analysisDate: new Date().toISOString(),
        };
        setResult(fakeResult);
        setIsAnalyzing(false);
      }, 2000);
    } catch (err) {
      setError(err.message || "Failed to analyze URL. Please try again.");
      console.error("Error:", err);
      setIsAnalyzing(false);
    }
  };

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          background: `linear-gradient(135deg, ${theme.palette.secondary.dark} 0%, ${theme.palette.secondary.main} 100%)`,
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
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "20px 20px",
            opacity: 0.3,
          },
        }}
      >
        <Container maxWidth="md">
          <Box sx={{ textAlign: "center", position: "relative", zIndex: 2 }}>
            <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
              <NewspaperIcon
                sx={{
                  fontSize: 50,
                  filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.3))",
                }}
              />
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
              Fake News Detector
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
              Enter a news article URL to check its credibility
            </Typography>
            <Typography
              variant="body2"
              sx={{
                maxWidth: "700px",
                mx: "auto",
                opacity: 0.9,
              }}
            >
              Our AI analyzes content, source reputation, and cross-references
              facts to help you identify potentially misleading information
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

            <Box sx={{ width: "100%" }}>
              <TextField
                fullWidth
                label="Enter News Article URL"
                variant="outlined"
                value={url}
                onChange={handleUrlChange}
                placeholder="https://example.com/news-article"
                disabled={isAnalyzing}
                InputProps={{
                  startAdornment: (
                    <LanguageIcon sx={{ mr: 1, color: "text.secondary" }} />
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                  },
                }}
              />

              <Box
                sx={{
                  mt: 1,
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 1,
                  justifyContent: "center",
                }}
              >
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ mr: 1 }}
                >
                  Try examples:
                </Typography>
                {examples.map((example, index) => (
                  <Typography
                    key={index}
                    variant="caption"
                    onClick={() => loadExample(example)}
                    sx={{
                      cursor: "pointer",
                      color: theme.palette.secondary.main,
                      "&:hover": {
                        textDecoration: "underline",
                      },
                    }}
                  >
                    {new URL(example).hostname.replace("www.", "")}
                  </Typography>
                ))}
              </Box>
            </Box>

            <Button
              variant="contained"
              color="secondary"
              onClick={analyzeUrl}
              disabled={isAnalyzing || !url || serverStatus !== "running"}
              startIcon={
                isAnalyzing ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  <SearchIcon />
                )
              }
              size="large"
              sx={{
                px: 4,
                py: 1.2,
                borderRadius: 2,
                fontWeight: 600,
                boxShadow: "0 4px 14px rgba(0,0,0,0.1)",
              }}
            >
              {isAnalyzing ? "Analyzing..." : "Analyze Article"}
            </Button>

            {isAnalyzing && (
              <Box sx={{ width: "100%", mt: 1 }}>
                <LinearProgress color="secondary" />
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ mt: 1, display: "block", textAlign: "center" }}
                >
                  Scanning article, checking sources, and cross-referencing
                  facts...
                </Typography>
              </Box>
            )}

            {result && (
              <Box sx={{ mt: 4, width: "100%" }}>
                <Divider sx={{ mb: 4 }} />

                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        mb: 3,
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          p: 1.5,
                          borderRadius: "50%",
                          bgcolor: result.isFake
                            ? "error.lighter"
                            : "success.lighter",
                          mr: 2,
                        }}
                      >
                        {result.isFake ? (
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
                          color={result.isFake ? "error.main" : "success.main"}
                          fontWeight="medium"
                        >
                          {result.isFake
                            ? "Potentially Misleading Content"
                            : "Likely Credible Content"}
                        </Typography>
                        <Typography color="text.secondary">
                          Analysis confidence:{" "}
                          <strong>{result.confidence}%</strong>
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Card sx={{ height: "100%", borderRadius: 2 }}>
                      <CardContent>
                        <Typography
                          variant="h6"
                          gutterBottom
                          color="text.primary"
                        >
                          Source Information
                        </Typography>
                        <Box sx={{ mb: 2 }}>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            gutterBottom
                          >
                            Analyzed URL:
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{ wordBreak: "break-all" }}
                          >
                            {url}
                          </Typography>
                        </Box>
                        <Box sx={{ mb: 2 }}>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            gutterBottom
                          >
                            Domain:
                          </Typography>
                          <Typography variant="body2">
                            {result.source}
                          </Typography>
                        </Box>
                        <Box>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            gutterBottom
                          >
                            Analysis Date:
                          </Typography>
                          <Typography variant="body2">
                            {new Date(result.analysisDate).toLocaleString()}
                          </Typography>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Card sx={{ height: "100%", borderRadius: 2 }}>
                      <CardContent>
                        <Box
                          sx={{ display: "flex", alignItems: "center", mb: 2 }}
                        >
                          <Typography variant="h6" color="text.primary">
                            Detailed Analysis
                          </Typography>
                          <Tooltip title="These scores are based on our AI analysis of the content, source, and factual consistency">
                            <HelpOutlineIcon
                              sx={{
                                ml: 1,
                                color: "text.secondary",
                                fontSize: 18,
                              }}
                            />
                          </Tooltip>
                        </Box>

                        <Box sx={{ mb: 2 }}>
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              mb: 0.5,
                            }}
                          >
                            <Typography variant="body2">
                              Source Credibility:
                            </Typography>
                            <Typography variant="body2" fontWeight="medium">
                              {Math.floor(
                                result.details.sourceReputation * 100
                              )}
                              %
                            </Typography>
                          </Box>
                          <LinearProgress
                            variant="determinate"
                            value={result.details.sourceReputation * 100}
                            sx={{
                              height: 8,
                              borderRadius: 4,
                              bgcolor: "rgba(0,0,0,0.05)",
                              "& .MuiLinearProgress-bar": {
                                bgcolor:
                                  result.details.sourceReputation > 0.5
                                    ? "success.main"
                                    : "error.main",
                              },
                            }}
                          />
                        </Box>

                        <Box sx={{ mb: 2 }}>
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              mb: 0.5,
                            }}
                          >
                            <Typography variant="body2">
                              Factual Content:
                            </Typography>
                            <Typography variant="body2" fontWeight="medium">
                              {Math.floor(result.details.factualityScore * 100)}
                              %
                            </Typography>
                          </Box>
                          <LinearProgress
                            variant="determinate"
                            value={result.details.factualityScore * 100}
                            sx={{
                              height: 8,
                              borderRadius: 4,
                              bgcolor: "rgba(0,0,0,0.05)",
                              "& .MuiLinearProgress-bar": {
                                bgcolor:
                                  result.details.factualityScore > 0.5
                                    ? "success.main"
                                    : "error.main",
                              },
                            }}
                          />
                        </Box>

                        <Box>
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              mb: 0.5,
                            }}
                          >
                            <Typography variant="body2">Bias Level:</Typography>
                            <Typography variant="body2" fontWeight="medium">
                              {Math.floor(result.details.biasScore * 100)}%
                            </Typography>
                          </Box>
                          <LinearProgress
                            variant="determinate"
                            value={result.details.biasScore * 100}
                            sx={{
                              height: 8,
                              borderRadius: 4,
                              bgcolor: "rgba(0,0,0,0.05)",
                              "& .MuiLinearProgress-bar": {
                                bgcolor:
                                  result.details.biasScore < 0.5
                                    ? "success.main"
                                    : "error.main",
                              },
                            }}
                          />
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>

                  <Grid item xs={12}>
                    <Box
                      sx={{
                        p: 2,
                        borderRadius: 2,
                        bgcolor: "rgba(0,0,0,0.02)",
                        border: "1px solid rgba(0,0,0,0.05)",
                      }}
                    >
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ fontStyle: "italic" }}
                      >
                        Note: This is a demonstration. In a real application,
                        this would connect to a fact-checking API and provide
                        more detailed analysis of the content.
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            )}
          </Paper>
        </Box>
      </Container>
    </Box>
  );
};

export default FakeNews;

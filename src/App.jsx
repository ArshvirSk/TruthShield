import { Box, CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { useCallback, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import About from "./pages/About";
import DeepfakeDetection from "./pages/DeepfakeDetection";
import FakeNews from "./pages/FakeNews";
import Home from "./pages/Home";
import theme from "./theme";

function App() {
  const [serverStatus, setServerStatus] = useState("checking");
  const [serverPort, setServerPort] = useState(3000);

  const checkServer = useCallback(async (retryCount = 0, port = serverPort) => {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);

      const response = await fetch(`http://localhost:${port}/api/health`, {
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (response.ok) {
        const data = await response.json();
        if (data.status === "ok") {
          setServerStatus("running");
          setServerPort(port);
          console.log(`Connected to server on port ${port}`);
        } else {
          throw new Error(data.message || "Server status not ok");
        }
      } else {
        const data = await response.json();
        throw new Error(data.message || "Server response not ok");
      }
    } catch (err) {
      console.error("Server check failed on port", port, ":", err);

      // If this is the first attempt on the default port, try port 3001
      if (port === 3000 && retryCount === 0) {
        console.log("Trying alternate port 3001...");
        checkServer(0, 3001);
      }
      // If this is the first attempt on port 3001, try port 3002
      else if (port === 3001 && retryCount === 0) {
        console.log("Trying alternate port 3002...");
        checkServer(0, 3002);
      }
      // If we've tried multiple ports or are on retries for a specific port
      else if (retryCount < 3) {
        setServerStatus("error");
        setError(`Server not responding on port ${port}. Retrying...`);
        const delay = Math.pow(2, retryCount) * 1000;
        setTimeout(() => checkServer(retryCount + 1, port), delay);
      }
      // If we've exhausted all retries
      else {
        setServerStatus("error");
        setError(
          'Server is not responding. Please make sure the server is running with "npm run server"'
        );
      }
    }
  }, []);

  useEffect(() => {
    checkServer();

    const intervalId = setInterval(() => checkServer(), 30000);

    return () => {
      clearInterval(intervalId);
    };
  }, [checkServer]);

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

    setIsAnalyzing(true);
    setError(null);
    setUploadProgress(0);

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 300000);

      const response = await fetch(
        `http://localhost:${serverPort}/api/analyze`,
        {
          method: "POST",
          body: formData,
          signal: controller.signal,
        }
      );

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Analysis failed");
      }

      const data = await response.json();
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
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <CssBaseline />
        <Navbar />
        <Box component="main" sx={{ flexGrow: 1, py: 3 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route 
              path="/deepfake-detection" 
              element={
                <DeepfakeDetection 
                  serverStatus={serverStatus} 
                  serverPort={serverPort} 
                />
              } 
            />
            <Route 
              path="/fake-news" 
              element={
                <FakeNews 
                  serverStatus={serverStatus} 
                />
              } 
            />
            <Route path="/about" element={<About />} />
          </Routes>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;

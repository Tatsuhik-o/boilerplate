import {
  Button,
  Container,
  Stack,
  ThemeProvider,
  CssBaseline,
  TextField,
  Box,
  IconButton,
} from "@mui/material";
import { useState } from "react";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import ContrastIcon from "@mui/icons-material/Contrast";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useTheme } from "./hooks/useTheme";

export default function App() {
  const { theme, currentTheme, handleTheme } = useTheme();
  const [password, setPassword] = useState<boolean>(false);

  return (
    <ThemeProvider theme={currentTheme}>
      <div className="app">
        <CssBaseline />
        <Container sx={{ py: 2, px: 2 }}>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            alignItems={"start"}
            spacing={2}
          >
            <Button variant="outlined">Click Me</Button>
            <IconButton
              onClick={() => handleTheme(theme === "light" ? "dark" : "light")}
              color={"primary"}
            >
              {theme === "light" ? <DarkModeIcon /> : <ContrastIcon />}
            </IconButton>
            <Button variant="text">Click Me</Button>
          </Stack>
          <Box sx={{ position: "relative", width: "fit-content" }}>
            <TextField
              type={password ? "password" : "text"}
              label="Password"
              sx={{ maxWidth: "40ch" }}
            />
            <Box
              onClick={() => setPassword(!password)}
              sx={{
                position: "absolute",
                top: "28px",
                right: "10px",
                transform: "translateY(-50%)",
              }}
            >
              {password ? (
                <VisibilityIcon color="primary" />
              ) : (
                <VisibilityOffIcon color="primary" />
              )}
            </Box>
          </Box>
        </Container>
      </div>
    </ThemeProvider>
  );
}

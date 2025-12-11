import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Autocomplete,
} from "@mui/material";

import WbSunnyIcon from "@mui/icons-material/WbSunny";
import CloudIcon from "@mui/icons-material/Cloud";
import ThunderstormIcon from "@mui/icons-material/Thunderstorm";

const districts = [
  "Ariyalur",
  "Chengalpattu",
  "Chennai",
  "Coimbatore",
  "Cuddalore",
  "Dharmapuri",
  "Dindigul",
  "Erode",
  "Kallakurichi",
  "Kanchipuram",
  "Kanyakumari",
  "Karur",
  "Krishnagiri",
  "Madurai",
  "Mayiladuthurai",
  "Nagapattinam",
  "Namakkal",
  "Nilgiris",
  "Perambalur",
  "Pudukkottai",
  "Ramanathapuram",
  "Ranipet",
  "Salem",
  "Sivagangai",
  "Tenkasi",
  "Thanjavur",
  "Theni",
  "Thoothukudi",
  "Tiruchirappalli",
  "Tirunelveli",
  "Tirupathur",
  "Tiruppur",
  "Tiruvallur",
  "Tiruvannamalai",
  "Tiruvarur",
  "Vellore",
  "Viluppuram",
  "Virudhunagar",
];

export default function TNWeather() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchWeather = async (place) => {
    if (!place) return;

    setLoading(true);
    setWeather(null);

    const res = await fetch(`https://wttr.in/${place}?format=j1`);
    const data = await res.json();
    const current = data.current_condition[0];

    setWeather({
      place,
      temp: current.temp_C,
      humidity: current.humidity,
      desc: current.weatherDesc[0].value,
      date: data.weather[0].date,
    });

    setLoading(false);
  };

  const getIcon = (desc) => {
    if (!desc) return <CloudIcon sx={{ fontSize: 110, color: "white" }} />;
    const d = desc.toLowerCase();

    if (d.includes("sun") || d.includes("clear"))
      return <WbSunnyIcon sx={{ fontSize: 120, color: "yellow" }} />;
    if (d.includes("rain") || d.includes("storm"))
      return <ThunderstormIcon sx={{ fontSize: 120, color: "#FFD600" }} />;
    if (d.includes("cloud"))
      return <CloudIcon sx={{ fontSize: 120, color: "white" }} />;

    return <CloudIcon sx={{ fontSize: 120, color: "white" }} />;
  };

  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        margin: 0,
        padding: 0,
        overflow: "hidden",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(to bottom, #6dd5fa, #2980b9, #1e3c72)",
      }}
    >
      <Card
        sx={{
          width: 420,
          textAlign: "center",
          padding: 3,
          borderRadius: "22px",
          background: "rgba(255,255,255,0.22)",
          color: "white",
          backdropFilter: "blur(12px)",
          boxShadow: "0 15px 40px rgba(0,0,0,0.45)",
        }}
      >
        <CardContent>
          {/* LOADING SPINNER */}
          {loading && (
            <Box sx={{ mt: 4, mb: 4, textAlign: "center" }}>
              <div className="loader"></div>
              <Typography sx={{ mt: 2, opacity: 0.9, fontSize: "18px" }}>
                Fetching weather...
              </Typography>
            </Box>
          )}

          {/* WEATHER DATA */}
          {!loading && weather && (
            <>
              <Typography variant="h6" sx={{ mb: 1 }}>
                {new Date(weather.date).toDateString()}
              </Typography>

              <Typography variant="h4" sx={{ fontWeight: "bold", mb: 1 }}>
                {weather.place}
              </Typography>

              <div>{getIcon(weather.desc)}</div>

              <Typography
                variant="h3"
                sx={{ fontWeight: "bold", color: "yellow", mt: 2 }}
              >
                {weather.temp}°C
              </Typography>

              <Typography variant="h6" sx={{ mt: 1 }}>
                💧 Humidity: {weather.humidity}%
              </Typography>

              <Typography variant="h6" sx={{ mt: 1 }}>
                {weather.desc}
              </Typography>
            </>
          )}

          {/* INPUT + BUTTON */}
          <Box sx={{ mt: 4 }}>
            <Autocomplete
              freeSolo
              options={districts}
              onInputChange={(event, value) => setCity(value)}
              onChange={(event, value) => value && fetchWeather(value)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="Search district"
                  variant="outlined"
                  sx={{
                    background: "white",
                    borderRadius: "12px",
                    input: { color: "black" },
                  }}
                />
              )}
            />

            <Button
              variant="contained"
              sx={{
                mt: 2,
                background: "black",
                color: "white",
                px: 4,
                borderRadius: "10px",
                "&:hover": { background: "#333" },
              }}
              onClick={() => fetchWeather(city)}
            >
              GET
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

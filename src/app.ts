require("dotenv").config();

import express, { NextFunction } from "express";
import cors from "cors";
import Color from "color";

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

// create a random hex color string and return as ColorInstance in rgb format
function getRandomColor() {
  const hexCharacters = [0,1,2,3,4,5,6,7,8,9,"A","B","C","D","E","F",];

  let newColor = "#";
  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * 16);
    newColor += hexCharacters[randomIndex];
  }
  return Color(newColor);
}

// after each request get another color in json format
app.get("/", (req, res) => {
  const myColor = getRandomColor();
  res.json({
    hex: `${myColor.hex()}`,
    rgb: `${myColor}`,
    hsl: myColor.hsl().string(0),
  });
});

// start the web server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

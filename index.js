import cors from "cors";
import { configDotenv } from "dotenv";
import express from "express";
import { GoogleGenAI } from "@google/genai";
configDotenv();
const port = 4000 || process.env.PORT;
const app = express();

app.use(cors({
    origin: [
        "http://localhost:5173/"
    ]
}));
app.use(express.json());

app.post("/gemini", (req, res) => {
  const { question } = req.body;
  const ai = new GoogleGenAI({});

  async function main() {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `give me response shortly within 150 words and give responses without markdown formet. and this is my question = ${question}`,
    });
    const answer = response.text;
    res.send(answer);
  }

  main();
});

app.get("/", (req, res) => {
  res.send("The NA ai server is running");
});

app.listen(port, () => {
  console.log(`The NA server is running on ${port}`);
});

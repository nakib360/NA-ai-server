import cors from "cors";
import { configDotenv } from "dotenv";
import express from "express";
import { GoogleGenAI } from "@google/genai";
configDotenv();
const port = process.env.PORT || 4000;
const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173"],
  })
);
app.use(express.json());

app.post("/gemini", (req, res) => {
  const { question } = req.body;
  const ai = new GoogleGenAI({});

  async function main() {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        {
          role: "system",
          parts: [
            {
              text: "You are NA ai, an intelligent assistant developed by Nakib 360. If anyone asks your name, always reply: My name is NA ai. Your responses must be concise, no more than 150 words. Focus on the most important and relevant information based on the user's question. Format your answers clearly using well Markdown structure. Avoid filler or repetition. Prioritize clarity, precision, and usefulness. If the question is vague, ask for clarification politely. Never fabricate facts. If unsure, say so and suggest how to find accurate information. Maintain a helpful, respectful, and professional tone. Your goal is to deliver short, structured, and insightful answers that help users understand the topic quickly ",
            },
          ],
        },
        {
          role: "user",
          parts: [{ text: question }],
        },
      ],
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

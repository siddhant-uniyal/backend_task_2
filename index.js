/* algo:
1) fetch data from api and store
2) store required data in a flashcard
3) send flashcard 
 */

import fetch from "node-fetch";
import express from "express";

const app = express();

//middleware for parsing of json
app.use(express.json());

//creating a server
app.listen(5000, () => {});

//For dynamic entry of words
app.get("/:word", async (req, res) => {
  const word = req.params.word;

  const api_url = "https://api.dictionaryapi.dev/api/v2/entries/en/" + word;

  try {
    const response = await fetch(api_url, { method: "GET" });
    const data = await response.json();

    //if api doesn't have desired word
    if (response.status===404) {
      res.status(404).json({ error: "Word not found in the dictionary" });

      return;
    }

    const flashcard = [];
    const information = data[0];
    const definition = information.meanings[0]?.definitions[0]?.definition; //many words have empty values in some fields. if i don't use ? it will return undefined

    flashcard.push({
      word,
      definition,
    });

    res.setHeader("Content-Type", "application/json"); //telling that our response is a json

    res.status(200).json(flashcard); //sending our flashcard with a success status code
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


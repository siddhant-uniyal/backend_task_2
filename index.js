/* algo:
1) fetch data from api and store
2) store required data in a flashcard
3) send flashcard 
 */

import fetch from "node-fetch";
import express from "express";

const app = express();

//middleware - Piece of software sitting between the req and res
//middleware for parsing of json
app.use(express.json());

//creating a server
app.listen(2000, () => {});

//For dynamic entry of words
app.get("/:word", async (req, res) => {
  const word = req.params.word;

  const api_url = "https://api.dictionaryapi.dev/api/v2/entries/en/" + word;

  try {
    const response = await fetch(api_url, { method: "GET" });
    const data = await response.json();

    //if api doesn't have desired word
    if (!response) {
      return res
        .status(404)
        .json({ error: "Word not found in the dictionary" });
    }

    const flashcard = [];
    const information = data[0];
    const definition = information.meanings[0]?.definitions[0]?.definition; //incase of empty values anywhere
    const synonyms = information.meanings[0]?.synonyms[0];
    const antonyms = information.meanings[0]?.antonyms[0];

    flashcard.push({
      word,
      definition,
      synonyms,
      antonyms,
    });

    res.status(200).json(flashcard); //sending our flashcard with a success status code
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Error" });
  }
});

//the main definition and logic of the router functions is here

/* algo :
1)take input of word as param of req body
2)append to api_url
3)store fetched http response in a variable , and convert this variable into json
4)according to the api's actual output , i navigated it to extract what we want
5) make a flashcard JSON and put everything in it and then send
 */
import fetch from "node-fetch";

export const makeFlashcard = async(req,res)=>{
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
}
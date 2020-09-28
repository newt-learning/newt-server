import axios from "axios";
import keys from "../config/keys";

export async function getBookInfo(searchTerm: string, startIndex = 0) {
  const term = searchTerm.split(" ").join("+");

  try {
    const res = await axios.get("https://www.googleapis.com/books/v1/volumes", {
      params: {
        q: term,
        maxResults: 10,
        orderBy: "relevance",
        printType: "books",
        startIndex,
        //@ts-ignore
        key: keys.googleBooksApiKey,
      },
    });
    return res.data;
  } catch (error) {
    throw new Error(error);
  }
}

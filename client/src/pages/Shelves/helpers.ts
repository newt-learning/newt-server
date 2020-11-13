import _ from "lodash";

type Shelf = "Currently Learning" | "Want to Learn" | "Finished Learning";

// Order content by latest finish date
export function orderByFinishDate(
  content: any,
  sortBy: "desc" | "asc" = "desc"
) {
  return _.orderBy(
    content,
    ({ startFinishDates }) => {
      if (!_.isEmpty(startFinishDates)) {
        return startFinishDates[startFinishDates.length - 1].dateCompleted;
      }
    },
    [sortBy]
  );
}

// Filter content by shelf and order them in the approopriate way
export function filterAndOrderContentByShelf(shelf: Shelf, content: any) {
  const filteredContent = _.filter(
    content,
    (item) => item.shelf === shelf && !item.partOfSeries
  );

  // If shelf is "Current..", sort by lastUpdated, if "Want to..", by dateAdded
  // and if "Finished", order by finish date
  switch (shelf) {
    case "Currently Learning":
      return _.orderBy(filteredContent, "lastUpdated", "desc");
    case "Want to Learn":
      return _.orderBy(filteredContent, "dateAdded", "desc");
    case "Finished Learning":
      return orderByFinishDate(filteredContent, "desc");
    default:
      return _.orderBy(filteredContent, "lastUpdated", "desc");
  }
}

// Reduces the text to a smaller size, while still making sure that it ends with
// a full word.
export function shortenText(text: string, maxCharacters: number) {
  // If there's no text, return nothing.
  if (!text) return;

  // If the text is smaller than the maximum size, return the text
  if (text.length < maxCharacters) {
    return text;
  }

  const punctuation = [" ", ".", ",", ";", "?", "/", "-"];

  // If the next character after the max character is part of punctuation, then
  // that means the word ends on the last character. If it does not, keep
  // reducing the character count until you hit a blank space/punctuation, which
  // marks the end of the word.
  if (punctuation.includes(text[maxCharacters + 1])) {
    return text.substr(0, maxCharacters) + "...";
  } else {
    let characterCount = maxCharacters;
    while (!punctuation.includes(text[characterCount])) {
      characterCount -= 1;
    }

    return text.substr(0, characterCount) + "...";
  }
}

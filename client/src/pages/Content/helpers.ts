// Just copy-pasted from mobile for now... 
// TODO: Move this to server so there's just one
export const figureOutShelfMovingDataChanges = (
  currentShelf: string,
  newShelf: string,
  bookInfo: any
) => {
  // If moving from Currently Learning...
  if (currentShelf === "Currently Learning") {
    // ...to Want to Learn, remove the last date in the dateStarted array
    if (newShelf === "Want to Learn") {
      return {
        shelf: newShelf,
        startFinishDates: bookInfo.startFinishDates.slice(0, -1),
      };
      // ... to Finished Learning, set date completed as now
    } else if (newShelf === "Finished Learning") {
      let updatedDates = bookInfo.startFinishDates;
      updatedDates[updatedDates.length - 1].dateCompleted = Date.now();

      return {
        shelf: newShelf,
        startFinishDates: updatedDates,
      };
    }
  }

  // If moving from Want to Learn...
  if (currentShelf === "Want to Learn") {
    // ...to Currently Learning, add current date to dateStarted array
    if (newShelf === "Currently Learning") {
      return {
        shelf: newShelf,
        startFinishDates: [
          ...bookInfo.startFinishDates,
          { dateStarted: Date.now() },
        ],
      };
      // ... to Finished Learning, set both start date and completion date as now
      // (no start date would be there)
    } else if (newShelf === "Finished Learning") {
      return {
        shelf: newShelf,
        startFinishDates: [
          ...bookInfo.startFinishDates,
          { dateStarted: Date.now(), dateCompleted: Date.now() },
        ],
      };
    }
  }

  // If moving from Finished Learning to Currently Learning, add now to the
  // dateStarted array
  if (
    currentShelf === "Finished Learning" &&
    newShelf === "Currently Learning"
  ) {
    return {
      shelf: newShelf,
      startFinishDates: [
        ...bookInfo.startFinishDates,
        { dateStarted: Date.now() },
      ],
    };
  }

  // If moving from Finished Learning to Want to Learn or by default, just
  // change the shelf
  return { shelf: newShelf };
};

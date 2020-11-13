import _ from "lodash";

// The multiple reads or adding/editing dates read feature meant changing the
// format of dates stored in the db from strings to an array. This was a breaking
// change which means it won't be compatible with the older format. Thus, this
// function will check if the book needs updating (if it doesn't have a
// schemaVersion field or if the version is 1), and if it does, convert the old
// format to the new format, and also update the schemaVersion.
// I'm not a huge fan of having this done client-side, but there's not a lot of
// documentation I could find on handling this, and this turns out to be a more
// efficient solution than doing it back-end.
export const updateToV2ContentSchema = (
  bookInfo: any,
  doesBookExistInLibrary: any,
  updateContent: any
) => {
  if (!_.isEmpty(bookInfo) && doesBookExistInLibrary) {
    if (!bookInfo.schemaVersion || bookInfo.schemaVersion === 1) {
      const startFinishDates = [
        {
          dateStarted: bookInfo.dateAdded,
          dateCompleted: bookInfo.dateCompleted,
        },
      ];

      updateContent(bookInfo._id, {
        startFinishDates,
        schemaVersion: 2,
      });
    }
  }
};
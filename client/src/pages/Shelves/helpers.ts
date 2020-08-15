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

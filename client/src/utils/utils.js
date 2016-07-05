// Takes a List of Maps and returns a new List with the Maps sorted by the
// `createdAt` key
export function sortByDate(list) {
  return list.sort((a1, a2) => {
    const date1 = new Date(a1.get('createdAt')).getTime();
    const date2 = new Date(a2.get('createdAt')).getTime();

    if (date1 < date2) return 1;
    if (date1 > date2) return -1;
    return 0;
  });
}

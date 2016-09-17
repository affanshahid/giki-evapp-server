import { List, Map } from 'immutable';

// Takes a List of Maps and returns a new List with the Maps sorted by the
// `createdAt` key
export function sortByDate(list, kw = 'createdAt') {
  return list.sort((a1, a2) => {
    const date1 = new Date(a1.get(kw)).getTime();
    const date2 = new Date(a2.get(kw)).getTime();

    if (date1 < date2) return 1;
    if (date1 > date2) return -1;
    return 0;
  });
}

export function groupByDays(list, kw = 'createdAt') {
  let groups = Map();
  for (let item of list) {
    const date = new Date(item.get(kw));
    date.setHours(0, 0, 0, 0);
    const dateString = date.toString();
    if (groups.has(dateString)) {
      groups = groups.update(dateString, list => list.push(item));
    } else {
      groups = groups.set(dateString, List.of(item));
    }
  }
  return groups;
}

export const createComparator = (comparator, selector) => {
  return (a, b) => comparator(selector(a), selector(b));
};

export const numberComparator = (a, b) => {
  return a - b;
};

export const levelComparator = createComparator(
  numberComparator,
  o => o.data.level,
);

export const stringComparator = (a, b) => {
  return a.localeCompare(b);
};

export const meaningComparator = createComparator(
  stringComparator,
  o => o.data.meanings.find(m => m.primary).meaning,
);

export const subjectComparator = (a, b) => {
  // sort by level ascending and then meaning ascending to match the WaniKani website
  return levelComparator(a, b) || meaningComparator(a, b);
};

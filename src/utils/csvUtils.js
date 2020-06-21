import { parseAsync as jsontocsv } from 'json2csv';

export const objectsToCsvString = async (objects, delimiter) => {
  const csvString = await jsontocsv(objects, {
    delimiter,
    // to prevent each value from being wrapped in quotes (defaults to '"')
    quote: '',
  });

  // prepend # to the CSV header so Anki does not generate a flashcard for it
  return `#${csvString}`;
};

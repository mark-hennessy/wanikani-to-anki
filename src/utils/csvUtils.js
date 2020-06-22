import { parseAsync as jsontocsv } from 'json2csv';

export const objectsToCsvString = async (objects, delimiter) => {
  const csvString = await jsontocsv(objects, {
    delimiter,
    // prevent each value from being wrapped in quotes (defaults to '"')
    quote: '',
  });

  // prepend # to the CSV header to prevent Anki from generating a note for it
  return `#${csvString}`;
};

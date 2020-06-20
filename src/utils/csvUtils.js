import csvtojson from 'csvtojson';
import { parseAsync as jsontocsv } from 'json2csv';

export const csvStringToObjects = async (csvString, delimiter) => {
  const objects = await csvtojson({
    delimiter,
  }).fromString(csvString);

  return objects;
};

export const objectsToCsvString = async (objects, delimiter) => {
  const csvString = await jsontocsv(objects, {
    delimiter,
    // to prevent each value from being wrapped in quotes (defaults to '"')
    quote: '',
  });

  return csvString;
};

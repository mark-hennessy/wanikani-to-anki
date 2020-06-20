import { downloadFile, readFile } from '../utils/fileUtils';
import { csvStringToObjects, objectsToCsvString } from '../utils/csvUtils';
import { capitalCase } from 'change-case';
import { toKatakana } from 'wanakana';
import { formatCommaString } from '../utils/formatUtils.js';

const convertWKToAnkiKanjiExport = async () => {
  const inputCsvString = await readFile('inputKanji.csv');

  const objects = await csvStringToObjects(inputCsvString, ';');

  const formattedObjects = objects
    .map(d => ({
      character: d.character,
      meanings: formatCommaString(d.meaning, capitalCase),
      onyomi: formatCommaString(d.onyomi, toKatakana),
      kunyomi: d.kunyomi,
      important_reading: d.important_reading,
      level: d.level,
    }))
    .sort((a, b) => {
      return a.level - b.level;
    });

  const outputCsvString = await objectsToCsvString(formattedObjects, ';');

  downloadFile('outputKanji.csv', outputCsvString);
};

export default convertWKToAnkiKanjiExport;

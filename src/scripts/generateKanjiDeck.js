import { getSubjectsAsync } from '../utils/waniKaniAPI';
import { subjectComparator } from '../utils/collectionUtils';
import { downloadFile } from '../utils/fileUtils';
import { convertObjectsToCsvString } from '../utils/csvUtils';
import { toKatakana } from 'wanakana';
import { toCommaString } from '../utils/stringUtils';

const generateKanjiDeck = async () => {
  const subjects = await getSubjectsAsync('kanji');
  const sortedSubjects = subjects.sort(subjectComparator);

  const parsedSubjects = sortedSubjects.map(subject => {
    const { id, data } = subject;
    const { characters, meanings, readings, level, document_url } = data;

    return {
      id,
      characters,
      meanings: [
        ...meanings.filter(m => m.primary),
        ...meanings.filter(m => !m.primary),
      ].map(m => m.meaning),
      onyomi: readings.filter(r => r.type === 'onyomi').map(r => r.reading),
      kunyomi: readings.filter(r => r.type === 'kunyomi').map(r => r.reading),
      nanori: readings.filter(r => r.type === 'nanori').map(r => r.reading),
      importantReading: readings.find(r => r.primary).type,
      level,
      url: document_url,
    };
  });

  const csvData = parsedSubjects.map(subject => {
    const {
      id,
      characters,
      meanings,
      onyomi,
      kunyomi,
      nanori,
      importantReading,
      level,
      url,
    } = subject;

    return {
      id,
      characters,
      meanings: toCommaString(meanings),
      onyomi: toCommaString(onyomi.map(toKatakana)),
      kunyomi: toCommaString(kunyomi),
      nanori: toCommaString(nanori),
      importantReading,
      level,
      url,
    };
  });

  const outputCsvString = await convertObjectsToCsvString(csvData, ';');

  downloadFile('kanji_deck.csv', outputCsvString);
};

export default generateKanjiDeck;

import { getSubjectsAsync } from '../utils/waniKaniAPI';
import { subjectComparator } from '../utils/collectionUtils';
import { downloadFile } from '../utils/fileUtils';
import { objectsToCsvString } from '../utils/csvUtils';
import { toKatakana } from 'wanakana';
import { toCommaString } from '../utils/stringUtils';

const generateKanjiDeck = async () => {
  const subjects = await getSubjectsAsync('kanji');
  const sortedSubjects = subjects.sort(subjectComparator);

  const parsedSubjects = sortedSubjects.map(({ id, data }) => ({
    id,
    characters: data.characters,
    meanings: data.meanings.map(m => m.meaning),
    onyomi: data.readings.filter(r => r.type === 'onyomi').map(r => r.reading),
    kunyomi: data.readings.filter(r => r.type === 'kunyomi').map(r => r.reading),
    nanori: data.readings.filter(r => r.type === 'nanori').map(r => r.reading),
    importantReading: data.readings.find(r => r.primary).type,
    level: data.level,
    url: data.document_url,
  }));

  const formattedSubjects = parsedSubjects.map(d => ({
    id: d.id,
    characters: d.characters,
    meanings: toCommaString(d.meanings),
    onyomi: toCommaString(d.onyomi.map(toKatakana)),
    kunyomi: toCommaString(d.kunyomi),
    nanori: toCommaString(d.nanori),
    importantReading: d.importantReading,
    level: d.level,
    url: d.url,
  }));

  const outputCsvString = await objectsToCsvString(formattedSubjects, ';');

  downloadFile('kanji_deck.csv', outputCsvString);
};

export default generateKanjiDeck;

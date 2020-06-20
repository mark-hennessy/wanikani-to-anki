import { getSubjectsByTypeAndLevelAsync } from '../utils/waniKaniAPI';
import { subjectComparator } from '../utils/collectionUtils';
import { downloadFile } from '../utils/fileUtils';
import { objectsToCsvString } from '../utils/csvUtils';
import { toKatakana } from 'wanakana';

const generateKanjiDeck = async () => {
  const subjects = await getSubjectsByTypeAndLevelAsync('kanji');
  const sortedSubjects = subjects.sort(subjectComparator);

  const subjectData = sortedSubjects.map(({ id, data }) => ({
    id,
    characters: data.characters,
    meanings: data.meanings.map(m => m.meaning),
    onyomi: data.readings.filter(r => r.type === 'onyomi').map(r => r.reading),
    kunyomi: data.readings
      .filter(r => r.type === 'kunyomi')
      .map(r => r.reading),
    importantReading: data.readings.find(r => r.primary).type,
    level: data.level,
    url: data.document_url,
  }));

  const formattedSubjectData = subjectData.map(d => ({
    id: d.id,
    characters: d.characters,
    meanings: d.meanings.join(', '),
    onyomi: d.onyomi.map(toKatakana).join(', '),
    kunyomi: d.kunyomi.join(', '),
    importantReading: d.importantReading,
    level: d.level,
    url: d.url,
  }));

  const outputCsvString = await objectsToCsvString(formattedSubjectData, ';');

  downloadFile('kanjiDeck.csv', outputCsvString);
};

export default generateKanjiDeck;

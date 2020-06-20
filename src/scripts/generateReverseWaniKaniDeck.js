import { getSubjectsByTypeAndLevelAsync } from '../utils/waniKaniAPI';
import { subjectComparator } from '../utils/collectionUtils';
import { removeUnderscores } from '../utils/stringUtils';
import { downloadFile } from '../utils/fileUtils';
import { objectsToCsvString } from '../utils/csvUtils';

const generateReverseWaniKaniDeck = async () => {
  const subjects = await getSubjectsByTypeAndLevelAsync('vocabulary');
  const sortedSubjects = subjects.sort(subjectComparator);

  const subjectData = sortedSubjects.map(({ id, data }) => ({
    id,
    characters: data.characters,
    meanings: data.meanings.map(m => m.meaning),
    firstReading: data.readings.map(r => r.reading)[0],
    readings: data.readings.map(r => r.reading),
    partsOfSpeech: data.parts_of_speech,
    level: data.level,
    url: data.document_url,
  }));

  const formattedSubjectData = subjectData.map(d => ({
    id: d.id,
    characters: d.characters,
    meanings: d.meanings.join(', '),
    firstReading: d.firstReading,
    readings: d.readings.join(', '),
    partsOfSpeech: d.partsOfSpeech.map(removeUnderscores).join(', '),
    level: d.level,
    url: d.url,
  }));

  const outputCsvString = await objectsToCsvString(formattedSubjectData, ';');

  downloadFile('reverseWaniKaniDeck.csv', outputCsvString);
};

export default generateReverseWaniKaniDeck;

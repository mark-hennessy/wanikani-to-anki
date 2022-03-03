import { getSubjectsAsync } from '../utils/waniKaniAPI';
import { subjectComparator } from '../utils/collectionUtils';
import { removeUnderscores, toCommaString } from '../utils/stringUtils';
import { downloadFile } from '../utils/fileUtils';
import { convertObjectsToCsvString } from '../utils/csvUtils';

const generateReverseWaniKaniDeck = async () => {
  const subjects = await getSubjectsAsync('vocabulary');

  const parsedSubjects = subjects
    .sort(subjectComparator)
    .filter(({ data }) => !data.hidden_at)
    .map(({ id, data }) => {
      const {
        characters,
        meanings,
        readings,
        parts_of_speech,
        level,
        document_url,
      } = data;

      return {
        id,
        characters,
        meanings: [
          ...meanings.filter(m => m.primary),
          ...meanings.filter(m => !m.primary),
        ].map(m => m.meaning),
        firstReading: readings.map(r => r.reading)[0],
        readings: readings.map(r => r.reading),
        partsOfSpeech: parts_of_speech,
        level,
        url: document_url,
      };
    });

  const csvData = parsedSubjects.map(subject => {
    const {
      id,
      characters,
      meanings,
      firstReading,
      readings,
      partsOfSpeech,
      level,
      url,
    } = subject;

    return {
      id,
      characters,
      meanings: toCommaString(meanings),
      firstReading,
      readings: toCommaString(readings),
      partsOfSpeech: toCommaString(partsOfSpeech.map(removeUnderscores)),
      level,
      url,
    };
  });

  const outputCsvString = await convertObjectsToCsvString(csvData, ';');

  downloadFile('reverse_wk_deck.csv', outputCsvString);
};

export default generateReverseWaniKaniDeck;

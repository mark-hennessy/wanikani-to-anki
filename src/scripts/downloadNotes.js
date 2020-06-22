import { getStudyMaterialsAsync } from '../utils/waniKaniAPI';
// import { subjectComparator } from '../utils/collectionUtils';
// import { removeUnderscores, toCommaString } from '../utils/stringUtils';
// import { downloadFile } from '../utils/fileUtils';
// import { objectsToCsvString } from '../utils/csvUtils';

const downloadNotes = async () => {
  const studyMaterials = await getStudyMaterialsAsync('vocabulary');
  console.log(studyMaterials);
  // const sortedSubjects = studyMaterials.sort(subjectComparator);
  //
  // const subjectData = sortedSubjects.map(({ id, data }) => ({
  //   id,
  //   characters: data.characters,
  //   meanings: data.meanings.map(m => m.meaning),
  //   firstReading: data.readings.map(r => r.reading)[0],
  //   readings: data.readings.map(r => r.reading),
  //   partsOfSpeech: data.parts_of_speech,
  //   level: data.level,
  //   url: data.document_url,
  // }));
  //
  // const formattedSubjectData = subjectData.map(d => ({
  //   id: d.id,
  //   characters: d.characters,
  //   meanings: toCommaString(d.meanings),
  //   firstReading: d.firstReading,
  //   readings: toCommaString(d.readings),
  //   partsOfSpeech: toCommaString(d.partsOfSpeech.map(removeUnderscores)),
  //   level: d.level,
  //   url: d.url,
  // }));
  //
  // const outputCsvString = await objectsToCsvString(formattedSubjectData, ';');
  //
  // downloadFile('notes.csv', outputCsvString);
};

export default downloadNotes;

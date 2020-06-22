import { getStudyMaterialsAsync } from '../utils/waniKaniAPI';
import { downloadFile } from '../utils/fileUtils';
import { objectsToCsvString } from '../utils/csvUtils';

const downloadNotesForTypesAsync = async types => {
  const studyMaterials = await getStudyMaterialsAsync(types);

  const parsedStudyMaterials = studyMaterials.map(({ data }) => ({
    subjectId: data.subject_id,
    type: data.subject_type,
    meaningNote: data.meaning_note,
    readingNote: data.reading_note,
  }));

  const outputCsvString = await objectsToCsvString(parsedStudyMaterials, ';');

  downloadFile(`${types}_notes.csv`, outputCsvString);
};

const downloadNotes = async () => {
  await downloadNotesForTypesAsync('vocabulary');
  await downloadNotesForTypesAsync('kanji');
};

export default downloadNotes;

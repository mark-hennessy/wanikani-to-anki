const removeUnderscores = stringArray =>
  stringArray.map(s => s.replace(new RegExp('_', 'g'), ' '))

const parseVocabResponseData = vocabResponseData =>
  vocabResponseData.map(({ id, data }) => ({
    id,
    level: data.level,
    url: data.document_url,
    characters: data.characters,
    meanings: data.meanings.map(m => m.meaning),
    readings: data.readings.map(r => r.reading),
    partsOfSpeech: removeUnderscores(data.parts_of_speech),
    kanjiList: data.component_subject_ids,
  }))

export default {
  parseVocabResponseData,
}

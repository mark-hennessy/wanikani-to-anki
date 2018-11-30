import axios from 'axios'

// Endpoints
const USER = '/user'
const SUBJECTS = '/subjects'

const waniKaniAPI = axios.create({
  baseURL: 'https://api.wanikani.com/v2',
})

const setKey = (key) => {
  waniKaniAPI.defaults.headers.common.Authorization = `Bearer ${key}`
}

const getUser = async () => waniKaniAPI.get(USER)

const getSubjectById = async id => waniKaniAPI.get(`${SUBJECTS}/${id}`)

const getSubjectsByIds = async (...ids) =>
  waniKaniAPI.get(SUBJECTS, {
    params: {
      ids: ids.join(),
    },
  })

const getSubjectsBySlugs = async (...slugs) =>
  waniKaniAPI.get(SUBJECTS, {
    params: {
      slugs: slugs.join(),
    },
  })

/**
 * Requests radical, kanji, and or vocabulary data from WaniKani.
 *
 * @param {string} types - a comma-delimited string, e.g., "radical,kanji,vocabulary"
 * @param {...(string|number)} levels - levels between 1-60
 */
const getSubjectsByTypeAndLevel = async (types, ...levels) =>
  waniKaniAPI.get(SUBJECTS, {
    params: {
      types,
      levels: levels.join(),
    },
  })

const getKanjiByLevel = async (...levels) =>
  getSubjectsByTypeAndLevel('kanji', levels)

const getVocabularyByLevel = async (...levels) =>
  getSubjectsByTypeAndLevel('vocabulary', levels)

const getKanjiAndVocabularyByLevel = async (...levels) =>
  getSubjectsByTypeAndLevel('kanji,vocabulary', levels)

export default {
  setKey,
  getUser,
  getSubjectById,
  getSubjectsByIds,
  getSubjectsBySlugs,
  getKanjiByLevel,
  getVocabularyByLevel,
  getKanjiAndVocabularyByLevel,
}

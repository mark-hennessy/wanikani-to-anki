import '@babel/polyfill'
import fs from 'fs'
import { API_KEY } from './config'
import dataParser from './dataParser'
import waniKaniAPI from './waniKaniAPI'

const HEADER = '#characters;meanings;readings;partsOfSpeech;level;url'

// Some meanings have semi-colons after them for some reason.
// Semi-colons need to be removed because they are used as column delimiters
const formatArray = array => array.map(m => m.replace(';', '')).join(', ')

const parseLine = vocabData => {
  const columnData = [
    vocabData.characters,
    formatArray(vocabData.meanings),
    formatArray(vocabData.readings),
    formatArray(vocabData.partsOfSpeech),
    vocabData.level,
    vocabData.url
  ]

  return columnData.join(';')
}

const writeCallback = err => {
  if (err) {
    console.log(err)
    return
  }

  console.log('The file was saved!')
}

const run = async () => {
  waniKaniAPI.setKey(API_KEY)

  let lineData = [HEADER]

  for (let i = 1; i <= 60; i++) {
    const response = await waniKaniAPI.getVocabularyByLevel(i)
    const responseData = response.data.data
    const vocabList = dataParser.parseVocabResponseData(responseData)
    const lineDataForLevel = vocabList.map(parseLine)
    lineData = lineData.concat(lineDataForLevel)
    console.log(`Loaded level ${i}`)

    // Delay to avoid 429 TOO MANY REQUESTS
    await new Promise(resolve => setTimeout(resolve, 1000))
  }

  const data = lineData.join('\n')
  fs.writeFile('out/waniKaniAnkiDeck.txt', data, writeCallback)
}

run()

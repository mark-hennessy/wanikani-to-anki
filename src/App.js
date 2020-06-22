import React, { useEffect, useState } from 'react';
import './App.scss';
import generateReverseWaniKaniDeck from './scripts/generateReverseWaniKaniDeck';
import generateKanjiDeck from './scripts/generateKanjiDeck';
import downloadNotes from './scripts/downloadNotes';
import cn from 'classnames';
import * as waniKaniAPI from './utils/waniKaniAPI';

const CID = 'app';
const WK_API_KEY_V2_STORAGE_KEY = 'WK_API_KEY_V2';

export default function App() {
  const [apiKey, setApiKey] = useState(localStorage.getItem(WK_API_KEY_V2_STORAGE_KEY) || '');

  // keep API and localStorage in sync with apiKey changes
  useEffect(() => {
    waniKaniAPI.setApiKey(apiKey);
    localStorage.setItem(WK_API_KEY_V2_STORAGE_KEY, apiKey);
  }, [apiKey]);

  return (
    <div className={CID}>
      <h3>Open URL in new window if buttons don't work in codesandbox</h3>
      <div className={cn(`${CID}__controls`)}>
        <div className={cn(`${CID}__key-section`)}>
          <div>WaniKani API Key V2:</div>
          <input
            className={cn(`${CID}__key-input`)}
            type='text'
            value={apiKey}
            onChange={e => {
              setApiKey(e.target.value);
            }}
          />
        </div>

        <button onClick={generateReverseWaniKaniDeck}>
          Generate Reverse WaniKani Deck
        </button>
        <button onClick={generateKanjiDeck}>Generate Kanji Deck</button>
        <button onClick={downloadNotes}>Download Notes</button>
      </div>
    </div>
  );
}

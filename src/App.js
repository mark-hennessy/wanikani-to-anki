import React, { useEffect, useState } from 'react';
import './App.scss';
import generateReverseWaniKaniDeck from './scripts/generateReverseWaniKaniDeck';
import generateKanjiDeck from './scripts/generateKanjiDeck';
import cn from 'classnames';
import { WK_API_KEY_V2 } from './config';
import * as waniKaniAPI from './utils/waniKaniAPI';

const CID = 'app';

export default function App() {
  const [apiKey, setApiKey] = useState('');

  const updateApiKey = key => {
    setApiKey(key);
    waniKaniAPI.setApiKey(key);
  };

  // runs after first render
  useEffect(() => {
    updateApiKey(WK_API_KEY_V2);
  }, []);

  return (
    <div className={CID}>
      <h3>Open URL in new window if buttons don't work</h3>
      <div className={cn(`${CID}__controls`)}>
        <div className={cn(`${CID}__key-section`)}>
          <div>WaniKani API Key V2:</div>
          <input
            className={cn(`${CID}__key-input`)}
            type='text'
            value={apiKey}
            onChange={e => {
              const { value } = e.target;
              updateApiKey(value);
            }}
          />
        </div>

        <button onClick={generateReverseWaniKaniDeck}>
          Generate Reverse WaniKani Deck
        </button>
        <button onClick={generateKanjiDeck}>Generate Kanji Deck</button>
      </div>
    </div>
  );
}

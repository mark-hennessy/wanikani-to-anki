import React from 'react';
import './App.scss';
import convertWKToAnkiKanjiExport from './scripts/convertWKToAnkiKanjiExport';

const CID = 'app';

export default function App() {
  return (
    <div className={CID}>
      <h3>Open URL in new window if button doesn't work</h3>
      <button onClick={convertWKToAnkiKanjiExport}>Convert</button>
    </div>
  );
}

import React from 'react';
import ReactDOM from 'react-dom/client';
import { AssetView } from 'skill-gym-modules'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <AssetView />
  </React.StrictMode>
);
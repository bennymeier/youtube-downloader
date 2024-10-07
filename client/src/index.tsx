import { ColorModeScript } from '@chakra-ui/react';
import * as React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import { App } from './App';

const rootElement = document.getElementById('root');
const root = ReactDOMClient.createRoot(rootElement as HTMLElement);
root.render(
  <React.StrictMode>
    <ColorModeScript />
    <App />
  </React.StrictMode>
);

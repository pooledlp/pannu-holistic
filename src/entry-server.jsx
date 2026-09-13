import React from 'react';
import {renderToString} from 'react-dom/server';
import App from './App.jsx';
export {pages} from './content/site.mjs';
export function render(pathname){return renderToString(<App pathname={pathname}/>)}

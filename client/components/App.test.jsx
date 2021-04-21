import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import styles from './App.module.css';

test('renders the correct content', () => {
  const root = document.createElement('div');
  ReactDOM.render(<App />, root);

  expect(root.querySelector('h5').textContent).toBe('Breakdown of the injury percentage and team score:');
});

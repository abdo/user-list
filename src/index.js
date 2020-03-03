import { BrowserRouter } from 'react-router-dom';
import { GlobalStyle } from 'style/globalStyle';
import { ThemeProvider } from 'styled-components';
import React from 'react';
import ReactDOM from 'react-dom';
import theme from 'style/theme';

import 'antd/dist/antd.css';

import * as serviceWorker from './serviceWorker';
import App from './App';

let app = <App />;

// Hook styled-components theme and GlobalStyle
app = (
  <ThemeProvider theme={theme}>
    <GlobalStyle />
    {app}
  </ThemeProvider>
);

// Hook router
app = <BrowserRouter>{app}</BrowserRouter>;

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

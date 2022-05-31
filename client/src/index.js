import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';

// 1. Import `extendTheme`
import { VechaiProvider, extendTheme, colors } from "@vechaiui/react";

// 2.Define new color scheme
const cool = {
  id: "cool",
  type: "dark",
  colors: {
    bg: {
      base: colors.coolGray["900"],
      fill: colors.coolGray["900"],
    },
    text: {
      foreground: colors.coolGray["100"],
      muted: colors.coolGray["300"],
    },
    primary: colors.cyan,
    neutral: colors.coolGray,
  },
}

// or custom default color scheme
const light = {
  id: "light",
  type: "light",
  colors: {
    bg: {
      base: colors.gray["800"],
      fill: colors.gray["900"],
    },
    text: {
      foreground: colors.gray["100"],
      muted: colors.gray["300"],
    },
    primary: colors.teal,
    neutral: colors.gray,
  },
}

// 3. Call `extendTheme` and pass your custom values
const theme = extendTheme({
  cursor: "pointer",
  colorSchemes: {
    light,
    cool
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <VechaiProvider theme={theme} colorScheme="cool">
      <App />
    </VechaiProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

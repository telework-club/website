const processor = require("./processor.js");

module.exports = (css, settings) => {
  const cssWithPlaceholders = css.replace(
    /%%styled-jsx-placeholder-(\d+)%%/g,
    (_, id) => `/--tw--/%%styled-jsx-placeholder-${id}%%/--tw--/`
  );
  const processedCss = processor(cssWithPlaceholders, settings);

  if (processedCss instanceof Error || processedCss.name === "CssSyntaxError") {
    throw processedCss;
  }

  return processedCss.replace(
    /\/--tw--\/%%styled-jsx-placeholder-(\d+)%%\/--tw--\//g,
    (_, id) => `%%styled-jsx-placeholder-${id}%%`
  );
};

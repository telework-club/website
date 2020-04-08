const postcss = require("postcss");
const loader = require("./postcss-load-plugins");
const process = require("process");

let plugins;
let _processor;

function processor(src, options) {
  options = options || {};

  if (!plugins) {
    const pluginsInfo = loader(options.env || process.env, options.path, {
      argv: false,
    });
    plugins = pluginsInfo.plugins || [];
  }

  if (!_processor) {
    _processor = postcss(plugins);
  }

  const result = _processor.process(src, { from: false });
  return result.css;
}

module.exports = processor;

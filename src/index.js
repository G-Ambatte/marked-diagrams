import { diagramToSVG } from './markdeep-diagram.js';

export default function(options = {
  langs: ['diagram'],
}) {
  return {
    renderer: {
      code({ text, lang }) {
        if (!options.langs.includes(lang)) return false;
        let output;
        try {
          output = diagramToSVG(text, { style: {} });
        } catch (err) {
          output = `<code>${err}</code>`;
        }
        return output;
      },
    },
  };
}

/* eslint-disable no-import-assign */
import { marked } from 'marked';
import markedDiagrams from '../src/index.js';
import * as MarkdeepDiagram from '../src/markdeep-diagram.js';

describe('marked-diagrams', () => {
  beforeEach(() => {
    marked.setOptions(marked.getDefaults());
    jest.resetAllMocks();
  });

  test('markdown not using this extension', () => {
    marked.use(markedDiagrams());
    expect(marked('not example markdown')).not.toBe('<p>example html</p>\n');
  });

  test('check wrong lang returns default codeblock', () => {
    marked.use(markedDiagrams());
    expect(marked('```\nTEST\n```\n')).toBe('<pre><code>TEST\n</code></pre>\n');
  });

  test('check default lang returns diagram when no options set', () => {
    marked.use(markedDiagrams());
    expect(marked('```diagram\nTEST\n```\n')).toBe('<svg xmlns="http://www.w3.org/2000/svg" version="1.1" height="32" width="40" viewBox="0 0 40 32" class="diagram" text-anchor="middle" font-family="monospace" font-size="13px" stroke-linecap="round">\n<g class="text">\n<text x="20" y="20">TEST</text>\n</g>\n</svg>');
  });

  test('check no text in codeblock still returns diagram', () => {
    marked.use(markedDiagrams());
    expect(marked('```diagram\n```\n')).toBe('<svg xmlns="http://www.w3.org/2000/svg" version="1.1" height="32" width="8" viewBox="0 0 8 32" class="diagram" text-anchor="middle" font-family="monospace" font-size="13px" stroke-linecap="round">\n<g class="text">\n</g>\n</svg>');
  });

  test('check default lang returns codeblock when custom lang set in options', () => {
    marked.use(markedDiagrams({ langs: ['custom'] }));
    expect(marked('```diagram\nTEST\n```\n')).toBe('<pre><code class="language-diagram">TEST\n</code></pre>\n');
  });

  test('check custom lang returns diagram when custom lang set', () => {
    marked.use(markedDiagrams({ langs: ['custom'] }));
    expect(marked('```custom\nTEST\n```\n')).toBe('<svg xmlns="http://www.w3.org/2000/svg" version="1.1" height="32" width="40" viewBox="0 0 40 32" class="diagram" text-anchor="middle" font-family="monospace" font-size="13px" stroke-linecap="round">\n<g class="text">\n<text x="20" y="20">TEST</text>\n</g>\n</svg>');
  });

  test('check multiple custom langs all return diagrams', () => {
    marked.use(markedDiagrams({ langs: ['custom1', 'custom2'] }));
    expect(marked('```custom1\nTEST\n```\n')).toBe('<svg xmlns="http://www.w3.org/2000/svg" version="1.1" height="32" width="40" viewBox="0 0 40 32" class="diagram" text-anchor="middle" font-family="monospace" font-size="13px" stroke-linecap="round">\n<g class="text">\n<text x="20" y="20">TEST</text>\n</g>\n</svg>');
    expect(marked('```custom2\nTEST\n```\n')).toBe('<svg xmlns="http://www.w3.org/2000/svg" version="1.1" height="32" width="40" viewBox="0 0 40 32" class="diagram" text-anchor="middle" font-family="monospace" font-size="13px" stroke-linecap="round">\n<g class="text">\n<text x="20" y="20">TEST</text>\n</g>\n</svg>');
  });

  test('check diagramToSVG errors are returned as strings', () => {
    jest.mock('../src/markdeep-diagram.js');
    MarkdeepDiagram.diagramToSVG = jest.fn(() => {
      throw new Error('Test Error');
    });

    marked.use(markedDiagrams());
    expect(marked('```diagram\n```\n')).toBe('<code>Error: Test Error</code>');
  });
});

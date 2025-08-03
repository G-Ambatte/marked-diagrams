# marked-diagrams

A Marked extension to create SVGs from ASCII text, using the diagramming code from [Markdeep](https://github.com/morgan3d/markdeep), by Morgan McGuire (https://casual-effects.com).

Largely inspired by [aasvg](https://github.com/martinthomson/aasvg), a project by [Martin Thomson](https://github.com/martinthomson).

# Usage
<!-- Show most examples of how to use this extension -->

```js
import { marked } from "marked";
import markedDiagrams from "marked-diagrams";

// or UMD script
// <script src="https://cdn.jsdelivr.net/npm/marked/lib/marked.umd.js"></script>
// <script src="https://cdn.jsdelivr.net/npm/marked-diagrams/lib/index.umd.js"></script>

const options = {
	// langs = [ 'diagram' ]
};

marked.use(markedDiagrams(options));

marked.parse("'```diagram\nTEST\n```\n");
// <svg xmlns="http://www.w3.org/2000/svg" version="1.1" height="32" width="40" viewBox="0 0 40 32" class="diagram" text-anchor="middle" font-family="monospace" font-size="13px" stroke-linecap="round">
//   <g class="text">
//     <text x="20" y="20">
//       TEST
//     </text>
//   </g>
// </svg>
```

## `options`

- langs

`langs` is an array of strings. If the codeblock language parameter is in `langs`, then the extension will attempt to render the codeblock into a diagram.
If not, the codeblock will fallback to other assigned codeblock renderers, including the default.


# Agent guide

ReactCalculator is a single-page calculator. Keypad presses build an expression, and that expression is evaluated live. The class components, Bootstrap 3 markup, and keypad behavior are the product. Change the toolchain around them; do not replace the calculator.

## Architecture

`src/js/calculator.js` is the behavior. `applyInput(state, input)` takes `{ expression, result, memory }` and one keypad token (`0-9`, `+`, `-`, `*`, `/`, `(`, `)`, `C`, `M+`, `MR`) and returns the next state. It uses JavaScript `eval`, so precedence is JavaScript precedence (`12+3*2` is 18) and an unfinished expression such as `12+` keeps the previous result.

`Layout` holds that state and passes `changeHandler` to the keypad. `Calculator` and `CalcElement` are the buttons. `Result` prints the expression and the value. There is no equals key and no decimal point.

Memory is part of the same state object:

- `M+` stores the current result, then clears the expression. Clearing evaluates to `undefined`, so the display goes blank. That includes storing `0`.
- `MR` appends the stored value using string concatenation. A stored `-1` becomes the text `-1`, so `3+` then `MR` is `3+-1`.
- `C` clears the expression and the result. It does not clear memory.

React 19 mounts the app with `createRoot` in `src/js/client.js`. Styling is the Bootstrap 3.3.7 stylesheet linked from `src/index.html`. The classes are Bootstrap 3 (`btn-group-justified` in particular). Do not upgrade Bootstrap without reworking the markup.

## Commands

Requires Node.js 22.15 or newer (`engines` and `.nvmrc`). Webpack Dev Server 6 refuses older 22.x releases. Node 22 is in maintenance LTS; Node 24 is the active LTS as of October 2026. `.nvmrc` says `22`, and GitHub Actions installs the current 22.x, which satisfies 22.15.

```bash
npm ci
npm test
npm run lint
npm run format:check
npm run build
npm run dev
```

`npm run dev` serves the app at `http://127.0.0.1:8080/` and binds `0.0.0.0`. Host and port are set in `webpack.config.cjs`. Webpack Dev Server 6 removed its own CLI flags, so do not put `--host` or `--port` back on the npm script. `npm run build` writes `dist/index.html` and `dist/client.min.js`.

## Conventions

- Keep calculator logic in `calculator.js` and cover behavior changes with `node --test` in `test/`. Do not add a test runner dependency for this.
- `package.json` has `"type": "module"`, so relative imports in `src/` need the `.js` extension. Webpack will not guess it.
- UI stays in class components. A hooks rewrite is a different project.
- Format with Prettier. ESLint 10 uses the flat config in `eslint.config.js` (recommended rules, JSX enabled). `eslint-plugin-react` does not support ESLint 10 yet, so it is not installed.
- Runtime packages (`react`, webpack, Babel) stay in `dependencies` so a production `npm install` on a server can still run `npm run dev`. ESLint and Prettier stay in `devDependencies`.
- Pin versions. Commit `package-lock.json`. Do not commit `node_modules/` or `dist/`.
- Do not add a license file.

## ReactDeployer

[ReactDeployer](https://github.com/pranavprem/ReactDeployer) can deploy this repo. Its user-data clones the repo, runs `npm install`, then `npm run dev`. The load balancer health-checks port **8080** and expects HTTP 200 on `/`.

Keep these true:

- `npm run dev` listens on `0.0.0.0:8080`.
- `devServer.allowedHosts` is `"all"`. Health checks arrive with the load balancer `Host` header. The 2020 config set `disableHostCheck: true` for the same reason.
- The bundle filename stays `client.min.js`.

The old dev script string no longer works. Webpack Dev Server 1 accepted `--content-base src --inline --hot`, which is what ReactDeployer's README quotes. Those flags were removed, and version 6 removed the dev server's own CLI flags entirely. `npm run dev` is `webpack serve --mode development`. The bind address and port live in `webpack.config.cjs` (`0.0.0.0:8080`). ReactDeployer only invokes `npm run dev`, so it does not need the old flags.

Production output used to be written to `src/client.min.js`. It is now `dist/client.min.js` plus a generated `dist/index.html`. ReactDeployer never served that file; it only runs the dev server.

The launch config installs Node with `apt-get install nodejs`. That distro package is too old for this toolchain. The instance needs Node.js 22+ on `PATH` before `npm install`.

## Gotchas

- `eval("")` returns `undefined`. Clear and `M+` depend on that to blank the result. Do not special-case it into `0` or `""`.
- Recalled memory is concatenated, not added. Preserve string conversion of `0`, negatives, `Infinity`, and `NaN`.
- `CalcElement` used to set `style={this.buttoStyle}` (missing an `n`). The `width: 10px` style never applied. Do not "fix" the typo; a 10px button width breaks the layout. The dead style was removed.
- `class` attributes in the original JSX only worked because `babel-plugin-react-html-attrs` rewrote them to `className`. The source now uses `className` directly.
- Bootstrap's JavaScript and jQuery were loaded and never used. They are gone. The CSS link stays.
- There is no router. Do not add `historyApiFallback` unless you add routes.
- `npm audit` reports a high-severity advisory in `braces` (pulled in by the dev server's proxy glob matcher). There is no patched release on the `micromatch` 4 line that webpack-dev-server uses, and `npm audit fix --force` wants to downgrade webpack-dev-server to 2.x. Do not take that downgrade. The calculator bundle does not include that code.
- No secrets belong in this repo. Nothing in the app reads credentials.

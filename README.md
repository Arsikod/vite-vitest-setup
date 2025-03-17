##### 1. Install `vitest`

```
pnpm add -D vitest
```

##### 2. Add test script to `package.json`

```
"scripts": {
    ...,
    "test": "vitest"
  },
```

##### 3. Install React Testing library

```
pnpm add -D @testing-library/react @testing-library/jest-dom @testing-library/user-event

```

##### 4. Install `jsdom`

`jsdom` is a pure-JavaScript implementation of many web standards, notably the WHATWG DOM and HTML Standards, for use with Node.js. In general, the goal of the project is to emulate enough of a subset of a web browser to be useful for testing and scraping real-world web applications.

```
pnpm add -D jsdom
```

##### 5. Setup in `vite.config.ts`

```
export default defineConfig({
  plugins: [react()],
  test: { //🍒 add this part
    environment: "jsdom",
  },
});
```

⚠️ TS Error: _Object literal may only specify known properties, and ‘test’ does not exist in type ‘UserConfigExport’._

##### 6. Add `vitest.setup.ts` file

```
import * as matchers from "@testing-library/jest-dom/matchers";
import { afterEach, expect } from "vitest";
import { cleanup } from "@testing-library/react";

expect.extend(matchers);

afterEach(() => {
  cleanup();
})
```

##### 7. Add reference in `vite.config.ts`

❔you probably do not need `vite.config.ts` and can rename it to `vitest.config.ts`

```
// import { defineConfig } from "vite"; ❌ change this
import { defineConfig } from "vitest/config"; ✅ to this
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true, ✅
    setupFiles: "./vitest.setup.ts", ✅
  },
});

```

##### 8. Add vitest types to `tsconfig.app.json`

```
{
  "compilerOptions": {
    ...options
    "types": ["vitest/globals", "@testing-library/jest-dom"]✅
  },
  "include": ["src"]
}

```

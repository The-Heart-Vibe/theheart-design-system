/// <reference types="vite/client" />
// Required so `import svg from "./foo.svg?raw"` is typed as a string.
declare module "*.svg?raw" { const content: string; export default content; }

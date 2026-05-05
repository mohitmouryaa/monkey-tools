// Shims para plugins Editor.js cujo `package.json#exports` não expõe `types`,
// ou que não publicam declarações TS. Mantemos local para não afetar o resto do app.

declare module "@editorjs/embed" {
  const Embed: unknown;
  export default Embed;
}

declare module "@editorjs/checklist" {
  const Checklist: unknown;
  export default Checklist;
}

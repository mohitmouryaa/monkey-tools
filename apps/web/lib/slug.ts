// Converte um texto qualquer para kebab-case ASCII estável.
// Usado para auto-gerar slug/URL a partir do nome de uma entidade.
export const slugify = (input: string): string =>
  input
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

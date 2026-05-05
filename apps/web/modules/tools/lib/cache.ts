/**
 * Cria a tag de cache para uma tool baseada em seu `link`.
 * O `link` pode vir com ou sem barra inicial; normalizamos removendo
 * a barra para que a tag seja determinística.
 */
export const tagForTool = (link: string) => `tool:${link.replace(/^\//, "")}`;

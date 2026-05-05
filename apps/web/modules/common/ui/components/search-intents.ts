/**
 * Mapeia intenções comuns em PT-BR para o slug (link) da tool correspondente.
 * Permite que o usuário encontre a ferramenta sem saber o nome técnico.
 *
 * Mantenha frases curtas, em minúsculas, sem acentos quando o usuário tipicamente
 * digita sem acento. Pode listar a mesma frase em vários slugs.
 *
 * Quando uma tool real ainda não existir com esse slug, a entrada vira no-op.
 */
export const TOOL_INTENT_ALIASES: Record<string, string[]> = {
  "compactar-pdf": [
    "pdf grande",
    "pdf pesado",
    "arquivo grande",
    "arquivo pesado",
    "diminuir pdf",
    "reduzir pdf",
    "comprimir pdf",
    "tamanho pdf",
    "pdf nao envia",
    "pdf nao anexa",
    "email pdf grande",
  ],
  "comprimir-pdf": ["pdf grande", "pdf pesado", "diminuir pdf", "reduzir tamanho pdf", "comprimir documento"],
  "juntar-pdf": ["unir pdf", "merge pdf", "combinar pdf", "fundir pdf", "juntar arquivos pdf"],
  "dividir-pdf": ["separar pdf", "split pdf", "quebrar pdf", "extrair paginas pdf"],
  "pdf-para-word": ["converter pdf word", "pdf editavel", "pdf docx", "transformar pdf em word"],
  "word-para-pdf": ["docx pdf", "documento word pdf", "salvar word pdf"],
  "pdf-para-jpg": ["pdf imagem", "pdf foto", "pdf jpeg"],
  "jpg-para-pdf": ["foto pdf", "imagem pdf", "varias fotos um pdf"],
  "comprimir-imagem": ["imagem grande", "foto pesada", "diminuir imagem", "reduzir foto", "compactar imagem", "tamanho foto"],
  "redimensionar-imagem": ["mudar tamanho foto", "ajustar resolucao", "tamanho da imagem"],
  "remover-fundo": ["tirar fundo", "fundo transparente", "remover background", "background transparente"],
  "ocr-pdf": ["pdf escaneado", "pdf imagem texto", "extrair texto pdf", "pdf nao copia texto", "ocr"],
  "assinar-pdf": ["assinatura pdf", "assinar documento", "assinatura digital pdf"],
  "proteger-pdf": ["senha pdf", "pdf com senha", "criptografar pdf"],
  "desbloquear-pdf": ["remover senha pdf", "tirar senha pdf", "pdf bloqueado"],
  "girar-pdf": ["rotacionar pdf", "pdf de cabeca pra baixo", "virar pdf"],
  "pdf-para-excel": ["pdf planilha", "tabela pdf excel", "extrair tabela"],
  "inverter-imagem": ["espelhar foto", "flip imagem", "virar imagem"],
};

/**
 * Retorna a string de aliases pra concatenar no value do CommandItem,
 * dado o slug da tool (campo `link`).
 */
export const getToolAliases = (slug: string): string => {
  return (TOOL_INTENT_ALIASES[slug] ?? []).join(" ");
};

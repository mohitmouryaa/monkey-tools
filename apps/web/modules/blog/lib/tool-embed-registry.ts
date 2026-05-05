import type { ComponentType } from "react";

type ToolModule = { default: ComponentType };

// Mantenha sincronizado com `apps/web/modules/tools/ui/components/`.
// Cada entrada vira um chunk separado, carregado on-demand pelo post.
export const TOOL_EMBED_REGISTRY: Record<string, () => Promise<ToolModule>> = {
  "compressor-avancado-pdf": () => import("@/modules/tools/ui/components/compressor-avancado-pdf"),
  "comprimir-imagem": () => import("@/modules/tools/ui/components/comprimir-imagem"),
  "comprimir-pdf": () => import("@/modules/tools/ui/components/comprimir-pdf"),
  "contador-caracteres": () => import("@/modules/tools/ui/components/contador-caracteres"),
  "contador-palavras": () => import("@/modules/tools/ui/components/contador-palavras"),
  "desbloquear-pdf": () => import("@/modules/tools/ui/components/desbloquear-pdf"),
  "dividir-pdf": () => import("@/modules/tools/ui/components/dividir-pdf"),
  "excel-para-pdf": () => import("@/modules/tools/ui/components/excel-para-pdf"),
  "gerador-cnpj": () => import("@/modules/tools/ui/components/gerador-cnpj"),
  "gerador-cpf": () => import("@/modules/tools/ui/components/gerador-cpf"),
  "gerador-endereco": () => import("@/modules/tools/ui/components/gerador-endereco"),
  "gerador-qr-code": () => import("@/modules/tools/ui/components/gerador-qr-code"),
  "gerador-senha": () => import("@/modules/tools/ui/components/gerador-senha"),
  "gerador-texto-decorado": () => import("@/modules/tools/ui/components/gerador-texto-decorado"),
  "heic-para-jpg": () => import("@/modules/tools/ui/components/heic-para-jpg"),
  "inverter-imagem": () => import("@/modules/tools/ui/components/inverter-imagem"),
  "jpg-para-pdf": () => import("@/modules/tools/ui/components/jpg-para-pdf"),
  "jpg-para-png": () => import("@/modules/tools/ui/components/jpg-para-png"),
  "json-para-excel": () => import("@/modules/tools/ui/components/json-para-excel"),
  "marca-dagua-pdf": () => import("@/modules/tools/ui/components/marca-dagua-pdf"),
  "mesclar-pdf": () => import("@/modules/tools/ui/components/mesclar-pdf"),
  "numerar-pdf": () => import("@/modules/tools/ui/components/numerar-pdf"),
  "pdf-para-excel": () => import("@/modules/tools/ui/components/pdf-para-excel"),
  "pdf-para-jpg": () => import("@/modules/tools/ui/components/pdf-para-jpg"),
  "pdf-para-word": () => import("@/modules/tools/ui/components/pdf-para-word"),
  "png-para-jpg": () => import("@/modules/tools/ui/components/png-para-jpg"),
  "proteger-pdf": () => import("@/modules/tools/ui/components/proteger-pdf"),
  "recortar-imagem": () => import("@/modules/tools/ui/components/recortar-imagem"),
  "redimensionar-imagem": () => import("@/modules/tools/ui/components/redimensionar-imagem"),
  "remover-fundo-imagem": () => import("@/modules/tools/ui/components/remover-fundo-imagem"),
  "rotacionar-pdf": () => import("@/modules/tools/ui/components/rotacionar-pdf"),
  "webp-para-jpg": () => import("@/modules/tools/ui/components/webp-para-jpg"),
  "word-para-pdf": () => import("@/modules/tools/ui/components/word-para-pdf"),
};

export type ToolEmbedSlug = keyof typeof TOOL_EMBED_REGISTRY;

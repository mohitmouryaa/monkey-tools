---
phase: 3
plan_file: plan-bundle-optimization-v2.md
exploded_at: 2026-04-30
---

# Fase 3 — Dynamic import de xlsx, jspdf, pdf-lib e jszip dentro das tools

## Objetivo

Essas libs (~1500 KB somadas) só rodam em handler de clique/submit. Tirar do
bundle inicial das rotas de tool.

## Critério de conclusão

`/ferramentas/[toolCategory]/[tool]` cai abaixo de 1300 KB. Cada tool ainda
funciona quando o usuário processa um arquivo.

## Reuso identificado

### Reutilizado (já existe, NÃO recrie)
- Padrão `await import("pdf-lib")` em handler — exemplo em `apps/web/modules/tools/ui/components/desbloquear-pdf.tsx:88` e `excel-para-pdf.tsx:57`
- Padrão `await import("pdfjs-dist")` em handler — exemplo em `apps/web/modules/common/hooks/use-pdf-manager.tsx:42`
- `usePdfManager` hook — usado por mesclar/dividir/rotacionar; já gerencia `pdfjs-dist` dynamic. Não tocar.
- `MAX_FILE_SIZE` em `@/modules/common/constants`
- `Loader2` de `lucide-react`
- `import type { ... } from "pdf-lib"` — já existe em `numerar-pdf.tsx:4` (`type PDFPage`, `type PDFFont`)

### Criado nesta fase
- `lazyLoadPdfLib()`, `lazyLoadXlsx()`, `lazyLoadJsPdf()`, `lazyLoadJsZip()` em `apps/web/modules/common/lib/lazy-load-libs.ts` → task 3.0
  - Cada função cacheia o módulo após primeiro `await import` (variável module-level) e retorna
  - Assinaturas:
    - `lazyLoadPdfLib(): Promise<typeof import("pdf-lib")>`
    - `lazyLoadXlsx(): Promise<typeof import("xlsx")>`
    - `lazyLoadJsPdf(): Promise<typeof import("jspdf")>` (retorna o module com `default` exportando `jsPDF`)
    - `lazyLoadJsZip(): Promise<typeof import("jszip")>`

### Extraído de código existente
- Nenhum extract. As 9 tools têm uso próprio das libs — refactor seria fora de escopo.

## Micro-tarefas (arquivos desta pasta)

| ID | Tipo | depends_on | Arquivo |
|----|------|------------|---------|
| 3.0 | criar | — | `3.0-criar-util-lazy-load-libs.md` |
| 3.1 | modificar | 3.0 | `3.1-dynamic-excel-para-pdf.md` |
| 3.2 | modificar | 3.0 | `3.2-dynamic-marca-dagua-pdf.md` |
| 3.3 | modificar | 3.0 | `3.3-dynamic-pdf-para-jpg.md` |
| 3.4 | modificar | 3.0 | `3.4-dynamic-numerar-pdf.md` |
| 3.5 | modificar | 3.0 | `3.5-dynamic-rotacionar-pdf.md` |
| 3.6 | modificar | 3.0 | `3.6-dynamic-mesclar-pdf.md` |
| 3.7 | modificar | 3.0 | `3.7-dynamic-json-para-excel.md` |
| 3.8 | modificar | 3.0 | `3.8-dynamic-dividir-pdf.md` |
| 3.9 | modificar | 3.0 | `3.9-dynamic-jpg-para-pdf.md` |
| 3.10 | uso | [3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7, 3.8, 3.9] | `3.10-validar-build-e-smoke-test.md` |

## Ondas de execução paralela

- **Onda 1** (sem deps): 3.0
- **Onda 2** (após 3.0): 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7, 3.8, 3.9 (9 em paralelo — tocam arquivos distintos)
- **Onda 3** (após onda 2): 3.10

Regra: dentro de cada onda, tasks podem rodar em paralelo via subagentes. Entre ondas, aguardar todas concluírem.

> **Nota de consistência.** Esta lista é **derivada** dos `depends_on` declarados nos arquivos de task — serve como conveniência para leitura humana. Em caso de divergência (task editada sem atualizar este index), **o grafo dos arquivos individuais é a fonte da verdade**. O executor deve recalcular ondas a partir dos `depends_on` de cada arquivo, não confiar cegamente no texto acima.

## Decisões

**P1** — Util compartilhado para lazy-load das libs: Opção A (criar util)
→ Resposta: A
→ Impacto: task 3.0 cria `apps/web/modules/common/lib/lazy-load-libs.ts` com 4 funções (`lazyLoadPdfLib`, `lazyLoadXlsx`, `lazyLoadJsPdf`, `lazyLoadJsZip`). Cada uma cacheia o `Promise` retornado para evitar múltiplas requisições do mesmo chunk. Tasks 3.1–3.9 consomem o util.

**P2** — Tipagem de `pdfDoc` em estado React (marca-dagua, numerar): Opção A (`import type`)
→ Resposta: A
→ Impacto: tasks 3.2 e 3.4 trocam `import { PDFDocument, ... } from "pdf-lib"` por `import type { PDFDocument, PDFPage, PDFFont } from "pdf-lib"`. Tipagem de `useState<PDFDocument | null>` é preservada sem trazer pdf-lib runtime.

**P3** — Onde fazer o `await import` em tools com helpers: Opção A (uma vez no início do handler, runtime passado como argumento)
→ Resposta: A
→ Impacto: tasks 3.2 e 3.4 fazem um único `const { PDFDocument, rgb, degrees, StandardFonts } = await lazyLoadPdfLib()` no topo de cada handler que precisa, e helpers (`addWatermarkToPage`, `drawPageNumber`) recebem `rgb`, `degrees`, etc. como argumentos OU são reescritos como funções inline dentro do handler.

**P4** — `excel-para-pdf` já tem `pdf-lib` parcialmente dynamic: Opção A (também tornar `xlsx` e `jspdf` dynamic no mesmo handler)
→ Resposta: A
→ Impacto: task 3.1 troca `import * as XLSX from "xlsx"` e `import { jsPDF } from "jspdf"` no topo por `await lazyLoadXlsx()` e `await lazyLoadJsPdf()` dentro de `convertToPdf`. Mantém o `await lazyLoadPdfLib()` que já existe (refatorado para usar o util).

**P5** — Sintaxe para `jspdf` (default export) em dynamic: Opção A (`const { default: jsPDF } = await import("jspdf")`)
→ Resposta: A
→ Impacto: tasks 3.1 e 3.9 usam `const { default: jsPDF } = await lazyLoadJsPdf()` (já que o util retorna o module completo).

**P6** — Validar redução de bundle ao final: Opção A (rodar `ANALYZE=true pnpm --filter web build` e documentar)
→ Resposta: A
→ Impacto: task 3.10 executa `ANALYZE=true pnpm --filter web build`, verifica que `/ferramentas/[toolCategory]/[tool]` < 1300 KB, e anota tamanho antes/depois no PR.

**P7** — Smoke test manual: Opção A (validar cada tool no dev server)
→ Resposta: A
→ Impacto: task 3.10 inclui checklist de smoke test funcional para todas as 9 tools (não só uma amostra).

## Notas operacionais

- Todas as 9 tasks de modificação tocam arquivos distintos → sem conflito de edição concorrente.
- Tipos do `pdf-lib` (`PDFDocument`, `PDFPage`, `PDFFont`) são tree-shaken automaticamente quando vêm via `import type` (Next/Turbopack remove em compile-time).
- O util criado em 3.0 é client-only (sem `"use server"`/`"use client"`); só é importado por client components, então não precisa de diretiva.
- `pdfjs-dist` JÁ é dynamic via `usePdfManager` em todas as tools relevantes; não está no escopo desta fase.

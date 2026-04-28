# Auditoria de Conteúdo em Inglês

**Data:** 2026-04-28
**Base URL:** `http://localhost:3000`
**Escopo:** Site público (admin/dashboard fora do escopo, conforme solicitado)

## Como foi feito

1. **Crawler dinâmico** (`scripts/i18n-audit.ts`) — Playwright headless, Chromium, locale `pt-BR`. Visitou 41 páginas (sementes do banco: home, login, listagem, 4 categorias, 33 tools, 1 page legada `/tools`). Em cada página: `document.body.innerText` → tokenizou e comparou stopwords PT vs EN. Screenshots em `.claude/i18n-screenshots/`.
2. **Scan estático complementar** — `grep` direcionado nos `.tsx` para pegar strings que não estavam visíveis no momento do crawl: toasts condicionais, mensagens de erro, atributos `alt`/`title`/`placeholder`, metadata SEO (fallback), Zod messages.
3. **Crawler com heurística afrouxada** (`AUDIT_LOOSE=1`) — `≥1` stopword EN, blocos `≥4` chars, `≥2` tokens.
4. **Scan estático ampliado** — template literals com EN, single-word JSX EN, mensagens em variáveis interpoladas.
5. **Scan do banco MongoDB** — todas as strings de `tools` (incluindo `steps`), `categories` e `pages` (walk recursivo).

> A heurística do crawler foi conservadora — pediu ≥2 stopwords EN num bloco com ≥3 palavras. Isso não pega frases de 1–2 palavras (botões, labels) nem strings que só aparecem em estados condicionais. Por isso o scan estático foi essencial.

## Resultado do crawler (modo padrão)

✅ **41/41 páginas — 0 hits estatísticos.**

Os textos visíveis renderizados pelas páginas estão em português. Tudo que segue abaixo veio do scan estático.

## 🔴 Crítico — vai pro Google (SEO/metadata)

Esses textos viram `<title>` e `<meta description>` quando uma categoria/tool não tem SEO customizado no banco. **Indexáveis.**

| Arquivo | Linha | Conteúdo |
|---|---|---|
| `apps/web/app/(main)/ferramentas/[toolCategory]/page.tsx` | 41 | `title: "Tools - pdfs.com.br"` |
| `apps/web/app/(main)/ferramentas/[toolCategory]/page.tsx` | 42 | `description: "Free online tools to make your life easier"` |
| `apps/web/app/(main)/ferramentas/[toolCategory]/[tool]/page.tsx` | 25 | `title: "Tool Not Found - pdfs.com.br"` |
| `apps/web/app/(main)/ferramentas/[toolCategory]/[tool]/page.tsx` | 26 | `description: "The requested tool could not be found."` |
| `apps/web/app/(main)/ferramentas/[toolCategory]/[tool]/page.tsx` | 60 | `description: "Free online tools to make your life easier"` |

**Observação:** `apps/web/modules/tools/ui/views/all-tools-client.tsx:58` tem fallback `category={...|| "Tools" : "Tools"}` — também aparece visualmente se categoria sem nome.

## 🔴 Crítico — visível em estado normal

| Arquivo | Linha | Conteúdo |
|---|---|---|
| `apps/web/modules/common/ui/components/tool-loading.tsx` | 12 | `<h3>Loading Tool</h3>` (skeleton/loading state) |

## 🟡 Toasts e mensagens de erro (usuário vê em condições específicas)

| Arquivo | Linha | Conteúdo |
|---|---|---|
| `apps/web/modules/common/hooks/use-pdf-manager.tsx` | 89 | `toast.error("Failed to process some files. Please try again.")` |
| `apps/web/modules/tools/ui/components/redimensionar-imagem.tsx` | 103 | `throw new Error("Canvas not available")` |
| `apps/web/modules/tools/ui/components/redimensionar-imagem.tsx` | 106 | `throw new Error("Canvas context not available")` |
| `apps/web/modules/tools/ui/components/redimensionar-imagem.tsx` | 110 | `reject(new Error("Failed to load image"))` |
| `apps/web/modules/tools/ui/components/redimensionar-imagem.tsx` | 159 | `throw new Error("Failed to create resized image")` |
| `apps/web/modules/tools/ui/components/redimensionar-imagem.tsx` | 167 | `setError(err instanceof Error ? err.message : "Failed to resize image")` |
| `apps/web/modules/tools/ui/components/jpg-para-pdf.tsx` | 128 | `throw new Error("Failed to get canvas context")` |
| `apps/web/modules/tools/ui/components/jpg-para-png.tsx` | 83 | `reject(new Error("Failed to convert to PNG"))` |
| `apps/web/modules/tools/ui/components/jpg-para-png.tsx` | 87 | `reject(new Error("Failed to load image"))` |
| `apps/web/modules/tools/ui/components/png-para-jpg.tsx` | 85 | `reject(new Error("Failed to convert to JPG"))` |
| `apps/web/modules/tools/ui/components/png-para-jpg.tsx` | 92 | `reject(new Error("Failed to load image"))` |
| `apps/web/modules/tools/ui/components/webp-para-jpg.tsx` | 85 | `reject(new Error("Failed to convert to JPG"))` |
| `apps/web/modules/tools/ui/components/webp-para-jpg.tsx` | 92 | `reject(new Error("Failed to load image"))` |
| `apps/web/modules/tools/ui/components/recortar-imagem.tsx` | 132 | `reject(new Error("Failed to create blob"))` |
| `apps/web/modules/tools/ui/components/pdf-para-jpg.tsx` | 106 | `throw new Error("Could not get canvas context")` |
| `apps/web/modules/tools/ui/components/pdf-para-jpg.tsx` | 130 | `reject(new Error("Failed to convert canvas to blob"))` |
| `apps/web/modules/tools/ui/components/json-para-excel.tsx` | 94 | `throw new Error("No valid data found to convert.")` |
| `apps/web/modules/tools/ui/components/excel-para-pdf.tsx` | 145 | `throw new Error("No PDF pages were generated.")` |
| `apps/web/modules/tools/ui/components/gerador-cnpj.tsx` | 30 | `throw new Error("Branch must be a 4-digit string")` |

Algumas dessas (em `redimensionar-imagem.tsx:167`) são **propagadas para `setError(...)` e renderizadas na tela** — então não são apenas erros de log. Outras só caem no `console`.

## 🟢 Acessibilidade (`alt`, `title`, `<title>` SVG)

Invisíveis no UI normal, mas leitores de tela leem.

| Arquivo | Linha | Atributo |
|---|---|---|
| `apps/web/modules/tools/ui/components/gerador-qr-code.tsx` | 162 | `alt="Generated QR Code"` |
| `apps/web/modules/tools/ui/components/inverter-imagem.tsx` | 201 | `alt="Flipped preview"` |
| `apps/web/modules/tools/ui/components/recortar-imagem.tsx` | 225 | `alt="Crop preview"` |
| `apps/web/modules/common/ui/components/sortable-pdf-grid.tsx` | 179 | `alt="Dragging page"` |
| `apps/web/modules/tools/ui/components/rotacionar-pdf.tsx` | 180 | `title="Rotate Left"` |
| `apps/web/modules/tools/ui/components/rotacionar-pdf.tsx` | 183 | `title="Rotate Right"` |
| `apps/web/modules/tools/ui/components/jpg-para-pdf.tsx` | 285 | `title="Remove image"` |
| `apps/web/modules/tools/ui/components/mesclar-pdf.tsx` | 258 | `<title>File Icon</title>` (SVG `<title>`) |

## ⚪ Falsos positivos (NÃO mexer)

- `apps/web/modules/hero/ui/components/how-it-works.tsx:27,33,39` — `iconName: "Upload" | "Settings" | "Download"` são identificadores de ícone do `lucide-react`, não texto de UI.
- `apps/web/modules/tools/ui/components/numerar-pdf.tsx:448–452` — `Helvetica Bold`, `Times Roman`, `Courier Bold` são nomes de famílias tipográficas PDF padrão (PostScript). Mantém em inglês.
- `apps/web/modules/dashboard/ui/components/icon-picker.tsx:33,35` — `"Edit"`, `"Save"` são nomes de ícones lucide-react (e o dashboard está fora do escopo de qualquer forma).

---

# Atualização — Rodadas A, B, C (heurística afrouxada + scan ampliado + banco)

## A — Crawler com heurística afrouxada (`AUDIT_LOOSE=1`)

✅ **41/41 páginas — 0 hits estatísticos** mesmo com critério mais permissivo (1 stopword EN bastava, bloco a partir de 4 chars).

**Confirma:** o conteúdo de corpo das páginas está em PT.

**Porém** — uma observação importantíssima vinda das `<title>` listadas pelo crawl: as páginas de categoria estão renderizando títulos como:

- `Ferramentas PDF - Free Online Tools | pdfs.com.br`
- `Ferramentas de Imagem - Free Online Tools | pdfs.com.br`
- `Geradores - Free Online Tools | pdfs.com.br`
- `Texto e Dados - Free Online Tools | pdfs.com.br`

A heurística não flaga `<title>` (não está no `body.innerText`), mas inspecionando manualmente já fica claro que o problema do `generateMetadata` é **maior do que o catalogado anteriormente** — não é só fallback. Veja seção seguinte.

## 🔴🔴 Adicional crítico — `generateMetadata` da página de categoria está em inglês mesmo no caminho feliz

Era listado antes só o `catch {}`. Mas o `try` (caso normal, com categoria existente) **também gera metadata em inglês**:

| Arquivo | Linha | Conteúdo |
|---|---|---|
| `apps/web/app/(main)/ferramentas/[toolCategory]/page.tsx` | 23 | `` title: `${category.name} - Free Online Tools \| pdfs.com.br` `` |
| `apps/web/app/(main)/ferramentas/[toolCategory]/page.tsx` | 26 | `` `Explore our collection of ${category.name.toLowerCase()} to make your work easier. Fast, secure, and free to use.` `` |
| `apps/web/app/(main)/ferramentas/[toolCategory]/page.tsx` | 27 | `` `${category.name}, online tools, free tools, ${category.slug}` `` (keywords) |
| `apps/web/app/(main)/ferramentas/[toolCategory]/page.tsx` | 30 | `` `Free ${category.name.toLowerCase()}` `` (OG description) |
| `apps/web/app/(main)/ferramentas/[toolCategory]/page.tsx` | 36 | `` `Free ${category.name.toLowerCase()}` `` (Twitter description) |
| `apps/web/app/(main)/ferramentas/[toolCategory]/page.tsx` | 52 | `<div>Something went wrong.</div>` (Error Boundary fallback visível) |

**Impacto:** todo `<title>` e meta de página de categoria está em inglês **agora mesmo**, indexável. Confirmado pelo crawl.

## B — Scan estático ampliado (template literals e mais palavras-gatilho)

### 🟡 Toasts/erros adicionais (template literals)

| Arquivo | Linha | Conteúdo |
|---|---|---|
| `apps/web/modules/common/hooks/use-pdf-manager.tsx` | 31 | `` toast.error(`File "${t.file.name}" is too large. Maximum file size is 50MB.`) `` 🔴 toast renderizado |
| `apps/web/modules/common/hooks/use-pdf-manager.tsx` | 83 | `` toast.error(`Failed to generate thumbnail for page ${i}.`) `` 🔴 toast renderizado |
| `apps/web/modules/tools/ui/components/remover-fundo-imagem.tsx` | 97 | `` console.error(`Failed to process ${uploadedFile.file.name}:`, error) `` (só console) |
| `apps/web/modules/tools/ui/components/comprimir-imagem.tsx` | 108 | `` console.error(`Failed to compress ${uploadedFile.file.name}:`, error) `` |
| `apps/web/modules/tools/ui/components/webp-para-jpg.tsx` | 133 | `` console.error(`Failed to convert ${uploadedFile.file.name}:`, error) `` |
| `apps/web/modules/tools/ui/components/heic-para-jpg.tsx` | 69 | `` console.error(`Failed to process ${file.name} for preview:`, error) `` |
| `apps/web/modules/tools/ui/components/heic-para-jpg.tsx` | 120 | `` console.error(`Failed to convert ${uploadedFile.file.name}:`, error) `` |
| `apps/web/modules/tools/ui/components/png-para-jpg.tsx` | 133 | `` console.error(`Failed to convert ${uploadedFile.file.name}:`, error) `` |
| `apps/web/modules/tools/ui/components/jpg-para-png.tsx` | 125 | `` console.error(`Failed to convert ${uploadedFile.file.name}:`, error) `` |

> Os 2 primeiros (`use-pdf-manager.tsx:31` e `:83`) são `toast.error(...)` — **chegam ao usuário**. Os demais são `console.error` — invisíveis ao usuário comum, mas continuam em inglês no DevTools.

### 🟢 Acessibilidade adicional (`alt` em template literal)

| Arquivo | Linha | Atributo |
|---|---|---|
| `apps/web/modules/common/ui/components/sortable-pdf-grid.tsx` | 70 | `` alt={`Page ${page.pageIndex + 1}`} `` |
| `apps/web/modules/common/ui/components/selectable-page.tsx` | 43 | `` alt={`Page ${page.pageIndex + 1}`} `` |

### Outras buscas que vieram limpas

- Verbos de ação em strings (`"Generate"`, `"Convert"`, `"Compress"` etc. seguidos de palavra): só falsos positivos (já catalogados ou em PT).
- Single-word JSX EN (`>Save<`, `>Cancel<`, etc.): só falsos positivos (`>Loading<`, `>Tools<` em `all-tools-client.tsx:58` já catalogado, e nomes de ícones).
- Mensagens Zod (`.message("...")`, `z.string().min(1, "...")`): nenhum hit em paths públicos.

## C — Scan do banco MongoDB

✅ **0 ocorrências** em todos os campos textuais varridos:

- `tools` (33 docs): `title`, `description`, `seoTitle`, `seoDescription`, `seoKeywords`, `steps[].title/description/content`.
- `categories` (4 docs): `name`, `description`.
- `pages` (2 docs): walk recursivo em todos os campos string.

**Conclusão:** o conteúdo cadastrado no banco está 100% em PT. O problema é exclusivamente código.

---

# Resumo numérico atualizado

- ✅ Crawl dinâmico (modo padrão e loose): **41 páginas, 0 hits** pela heurística estatística em ambos os modos.
- ✅ Banco MongoDB: **0 ocorrências** em 33 tools / 4 categorias / 2 pages.
- 🔴🔴 SEO/metadata da página de categoria (caminho feliz): **6 ocorrências em 1 arquivo** — afetam `<title>` e meta de TODAS as páginas de categoria atualmente.
- 🔴 SEO/metadata fallback + UI visível: **6 ocorrências em 3 arquivos** (lista original).
- 🟡 Toasts/erros: **19 ocorrências em 13 arquivos** (lista original) + **2 toasts renderizados** + **7 console.error** (rodada B) = **28 ocorrências em ~16 arquivos**.
- 🟢 Acessibilidade: **8 ocorrências em 6 arquivos** (lista original) + **2 `alt` template literals** (rodada B) = **10 ocorrências em 8 arquivos**.

---

## Como reproduzir

```bash
# Garantir que dev está rodando e banco populado
pnpm dev

# Modo padrão
pnpm i18n:audit
# → relatório em .claude/i18n-audit.md
# → screenshots em .claude/i18n-screenshots/

# Modo loose (heurística afrouxada — útil pra fish frases curtas)
AUDIT_LOOSE=1 AUDIT_REPORT_PATH=.claude/i18n-audit-loose.md pnpm i18n:audit
```

Variáveis de ambiente:
- `AUDIT_BASE_URL` (default `http://localhost:3000`)
- `DATABASE_URL` (default `mongodb://localhost:27017/monkey-tools?replicaSet=rs0`)
- `AUDIT_LOOSE=1` — afrouxa heurística (`≥1` stopword EN, blocos a partir de 4 chars).
- `AUDIT_REPORT_PATH` — path alternativo de saída (evita sobrescrever este relatório).

## Todas as páginas visitadas (último crawl, modo loose)

- ✅ [200] `http://localhost:3000/` — Monkey Tools - Ferramentas Online Grátis para Todos
- ✅ [200] `http://localhost:3000/login` — Login Admin - pdfs.com.br
- ✅ [200] `http://localhost:3000/ferramentas` — Todas as Ferramentas - Monkey Tools
- 🟠 [200] `http://localhost:3000/ferramentas/pdf` — **Ferramentas PDF - Free Online Tools | pdfs.com.br** ← inglês no `<title>`
- 🟠 [200] `http://localhost:3000/ferramentas/imagem` — **Ferramentas de Imagem - Free Online Tools | pdfs.com.br** ← inglês no `<title>`
- 🟠 [200] `http://localhost:3000/ferramentas/geradores` — **Geradores - Free Online Tools | pdfs.com.br** ← inglês no `<title>`
- 🟠 [200] `http://localhost:3000/ferramentas/texto` — **Texto e Dados - Free Online Tools | pdfs.com.br** ← inglês no `<title>`
- ✅ [200] `http://localhost:3000/ferramentas/pdf/comprimir-pdf` — Comprimir PDF - Monkey Tools
- ✅ [200] `http://localhost:3000/ferramentas/pdf/compressor-avancado-pdf` — Compressão Avançada de PDF - Monkey Tools
- ✅ [200] `http://localhost:3000/ferramentas/pdf/mesclar-pdf` — Mesclar PDF - Monkey Tools
- ✅ [200] `http://localhost:3000/ferramentas/pdf/dividir-pdf` — Dividir PDF - Monkey Tools
- ✅ [200] `http://localhost:3000/ferramentas/pdf/rotacionar-pdf` — Rotacionar PDF - Monkey Tools
- ✅ [200] `http://localhost:3000/ferramentas/pdf/desbloquear-pdf` — Desbloquear PDF - Monkey Tools
- ✅ [200] `http://localhost:3000/ferramentas/pdf/proteger-pdf` — Proteger PDF - Monkey Tools
- ✅ [200] `http://localhost:3000/ferramentas/pdf/numerar-pdf` — Numerar Páginas do PDF - Monkey Tools
- ✅ [200] `http://localhost:3000/ferramentas/pdf/marca-dagua-pdf` — Marca d Água no PDF - Monkey Tools
- ✅ [200] `http://localhost:3000/ferramentas/pdf/pdf-para-word` — PDF para Word - Monkey Tools
- ✅ [200] `http://localhost:3000/ferramentas/pdf/pdf-para-jpg` — PDF para JPG - Monkey Tools
- ✅ [200] `http://localhost:3000/ferramentas/pdf/pdf-para-excel` — PDF para Excel - Monkey Tools
- ✅ [200] `http://localhost:3000/ferramentas/pdf/word-para-pdf` — Word para PDF - Monkey Tools
- ✅ [200] `http://localhost:3000/ferramentas/pdf/excel-para-pdf` — Excel para PDF - Monkey Tools
- ✅ [200] `http://localhost:3000/ferramentas/pdf/jpg-para-pdf` — JPG para PDF - Monkey Tools
- ✅ [200] `http://localhost:3000/ferramentas/imagem/comprimir-imagem` — Comprimir Imagem - Monkey Tools
- ✅ [200] `http://localhost:3000/ferramentas/imagem/recortar-imagem` — Recortar Imagem - Monkey Tools
- ✅ [200] `http://localhost:3000/ferramentas/imagem/inverter-imagem` — Inverter Imagem - Monkey Tools
- ✅ [200] `http://localhost:3000/ferramentas/imagem/redimensionar-imagem` — Redimensionar Imagem - Monkey Tools
- ✅ [200] `http://localhost:3000/ferramentas/imagem/remover-fundo-imagem` — Remover Fundo da Imagem - Monkey Tools
- ✅ [200] `http://localhost:3000/ferramentas/imagem/heic-para-jpg` — HEIC para JPG - Monkey Tools
- ✅ [200] `http://localhost:3000/ferramentas/imagem/jpg-para-png` — JPG para PNG - Monkey Tools
- ✅ [200] `http://localhost:3000/ferramentas/imagem/png-para-jpg` — PNG para JPG - Monkey Tools
- ✅ [200] `http://localhost:3000/ferramentas/imagem/webp-para-jpg` — WebP para JPG - Monkey Tools
- ✅ [200] `http://localhost:3000/ferramentas/geradores/gerador-qr-code` — Gerador de QR Code - Monkey Tools
- ✅ [200] `http://localhost:3000/ferramentas/geradores/gerador-senha` — Gerador de Senha Forte - Monkey Tools
- ✅ [200] `http://localhost:3000/ferramentas/geradores/gerador-cpf` — Gerador de CPF - Monkey Tools
- ✅ [200] `http://localhost:3000/ferramentas/geradores/gerador-cnpj` — Gerador de CNPJ - Monkey Tools
- ✅ [200] `http://localhost:3000/ferramentas/geradores/gerador-endereco` — Gerador de Endereço - Monkey Tools
- ✅ [200] `http://localhost:3000/ferramentas/geradores/gerador-texto-decorado` — Gerador de Texto Decorado - Monkey Tools
- ✅ [200] `http://localhost:3000/ferramentas/texto/contador-caracteres` — Contador de Caracteres - Monkey Tools
- ✅ [200] `http://localhost:3000/ferramentas/texto/contador-palavras` — Contador de Palavras - Monkey Tools
- ✅ [200] `http://localhost:3000/ferramentas/texto/json-para-excel` — JSON para Excel - Monkey Tools
- ✅ [200] `http://localhost:3000/tools` — Todas as Ferramentas - Monkey Tools

---

# Encontrado durante a correção (2026-04-28)

Itens que apareceram quando os arquivos da lista original foram abertos e que não estavam mapeados antes. Todos foram traduzidos no mesmo passe.

## 🔴 UI visível adicional

| Arquivo | Linha (após edit) | Conteúdo original |
|---|---|---|
| `apps/web/modules/common/ui/components/tool-loading.tsx` | 13 | `<p>Please wait while we prepare your tool...</p>` (subtítulo do skeleton, junto com `Loading Tool`) |

## 🟡 Errors adicionais (template literals e mensagens)

| Arquivo | Linha original | Conteúdo |
|---|---|---|
| `apps/web/modules/tools/ui/components/jpg-para-png.tsx` | 75 | `reject(new Error("Canvas context not available"))` |
| `apps/web/modules/tools/ui/components/png-para-jpg.tsx` | 76 | `reject(new Error("Canvas context not available"))` |
| `apps/web/modules/tools/ui/components/webp-para-jpg.tsx` | 76 | `reject(new Error("Canvas context not available"))` |
| `apps/web/modules/tools/ui/components/json-para-excel.tsx` | 90 | `throw new Error("JSON must be an array or an object.")` |
| `apps/web/modules/tools/ui/components/heic-para-jpg.tsx` | 132 | `console.error("Conversion error:", error)` (consistência) |

## 🟢 Acessibilidade adicional

| Arquivo | Linha | Atributo |
|---|---|---|
| `apps/web/modules/common/ui/components/sortable-pdf-grid.tsx` | 99 | `title="Rotate"` (botão hover) |
| `apps/web/modules/common/ui/components/sortable-pdf-grid.tsx` | 113 | `title="Remove"` (botão hover) |
| `apps/web/modules/common/ui/components/selectable-page.tsx` | 36 | `aria-label={`Select page ${index + 1}${isSelected ? " (selected)" : ""}`}` |

Total adicional: **9 ocorrências em 6 arquivos** que não estavam no relatório original.

## Segunda passagem (re-grep amplo após primeiro bloco de fixes)

Depois de corrigir tudo da lista oficial, fiz um varrer mais largo e encontrei outra leva de strings em inglês. Todas também foram corrigidas.

### 🔴 UI/toast visíveis adicionais

| Arquivo | Linha original | Conteúdo |
|---|---|---|
| `apps/web/modules/common/ui/components/ad-placeholder.tsx` | 20 | `<span>Advertisement</span>` (placeholder de anúncio renderizado em todas as páginas que usam `<AdPlaceholder>`) |
| `apps/web/modules/tools/ui/components/excel-para-pdf.tsx` | 158 | `toast.error(... : "Conversion failed")` (toast renderizado no fallback) |
| `apps/web/modules/tools/ui/components/jpg-para-pdf.tsx` | 170 | `toast.error(... : "Conversion failed")` (toast renderizado no fallback) |
| `apps/web/modules/common/hooks/use-file-upload.tsx` | 38 | `setError(err instanceof Error ? err.message : "Upload failed")` (vai para a tela do componente que usa `error` desse hook) |

### 🟢 Acessibilidade adicional

| Arquivo | Linha | Atributo |
|---|---|---|
| `apps/web/modules/common/ui/components/selectable-pdf-grid.tsx` | 39 | `title={allSelected ? "Deselect all" : "Select all"}` |
| `apps/web/modules/common/ui/components/selectable-pdf-grid.tsx` | 43 | `<title>Checkmark</title>` (SVG) |
| `apps/web/modules/common/ui/components/selectable-page.tsx` | 87 | `title="Rotate"` |
| `apps/web/modules/common/ui/components/selectable-page.tsx` | 101 | `title="Remove"` |
| `apps/web/modules/tools/ui/components/jpg-para-png.tsx` | 233, 340 | `alt="Selected"`, `alt="Converted"` |
| `apps/web/modules/tools/ui/components/png-para-jpg.tsx` | 241, 349 | `alt="Selected"`, `alt="Converted"` |
| `apps/web/modules/tools/ui/components/webp-para-jpg.tsx` | 241, 356 | `alt="Selected"`, `alt="Converted"` |
| `apps/web/modules/tools/ui/components/heic-para-jpg.tsx` | 228, 336 | `alt="Selected"`, `alt="Converted"` |
| `apps/web/modules/tools/ui/components/comprimir-imagem.tsx` | 216, 326 | `alt="Selected"`, `alt="Compressed"` |
| `apps/web/modules/tools/ui/components/recortar-imagem.tsx` | 339 | `alt="Cropped"` |
| `apps/web/modules/tools/ui/components/redimensionar-imagem.tsx` | 383 | `alt="Resized"` |
| `apps/web/modules/tools/ui/components/remover-fundo-imagem.tsx` | 209, 326 | `alt="Selected"`, `alt="Processed"` |

> `alt="Original"` apareceu em vários componentes de comparação antes/depois e foi mantido — `Original` é palavra portuguesa idêntica e o leitor de tela vai ler normalmente.

### 🟡 Errors/console adicionais (mensagens internas, mantidas em PT por consistência)

| Arquivo | Linha | Conteúdo |
|---|---|---|
| `apps/web/modules/tools/ui/components/recortar-imagem.tsx` | 97, 103 | `Canvas not available`, `Canvas context not available` |
| `apps/web/modules/tools/ui/components/excel-para-pdf.tsx` | 157 | `console.error("Conversion error:", error)` |
| `apps/web/modules/tools/ui/components/jpg-para-png.tsx` | 137 | `console.error("Conversion error:", error)` |
| `apps/web/modules/tools/ui/components/png-para-jpg.tsx` | 145 | `console.error("Conversion error:", error)` |
| `apps/web/modules/tools/ui/components/jpg-para-pdf.tsx` | 169 | `console.error("Conversion error:", error)` |
| `apps/web/modules/tools/ui/components/webp-para-jpg.tsx` | 145 | `console.error("Conversion error:", error)` |
| `apps/web/modules/tools/ui/components/inverter-imagem.tsx` | 77, 151 | `Error flipping image:`, `Error downloading image:` |
| `apps/web/modules/tools/ui/components/remover-fundo-imagem.tsx` | 113 | `Processing error:` |
| `apps/web/modules/tools/ui/components/json-para-excel.tsx` | 59 | `throw new Error("JSON array is empty.")` |
| `apps/web/modules/tools/ui/components/pdf-para-word.tsx` | 53 | `console.error("Upload failed:", error)` |
| `apps/web/modules/tools/ui/components/compressor-avancado-pdf.tsx` | 53 | idem |
| `apps/web/modules/tools/ui/components/word-para-pdf.tsx` | 53 | idem |
| `apps/web/modules/tools/ui/components/comprimir-pdf.tsx` | 53 | idem |
| `apps/web/modules/tools/ui/components/proteger-pdf.tsx` | 94 | `Error protecting PDF:` |
| `apps/web/modules/tools/ui/components/marca-dagua-pdf.tsx` | 101, 248, 292 | `Error loading PDF:`, `Error rendering preview:`, `Error applying watermark:` |
| `apps/web/modules/tools/ui/components/pdf-para-jpg.tsx` | 155, 205 | `Error converting PDF to JPG:`, `Error creating ZIP file:` |
| `apps/web/modules/tools/ui/components/recortar-imagem.tsx` | 160 | `Error cropping image:` |
| `apps/web/modules/tools/ui/components/numerar-pdf.tsx` | 178, 238, 286 | `Error rendering preview:`, `Error loading PDF:`, `Error processing PDF:` |
| `apps/web/modules/common/hooks/use-file-upload.tsx` | 37 | `Upload failed:` |

Total da segunda passada: **~40 ocorrências adicionais em 21 arquivos**, sendo 4 visíveis ao usuário (UI/toast) e o restante acessibilidade ou console.

### Validação final (estática)

Rodada de `grep` ampla nos paths públicos depois de todas as correções → 0 hits para qualquer dos padrões em inglês mapeados (`Failed|Error |Cannot|Could not|Please|Unable|Successfully|Loading [A-Z]|Conversion failed|Upload failed|Free Online|Tool Not|Loading Tool|Advertisement|Checkmark|alt="(Selected|Converted|Compressed|Cropped|Resized|Processed|Generated [A-Z]|Flipped|Crop preview|Dragging|Page \$)"|title="(Rotate|Remove|Deselect|File Icon|Select page)"`).

Crawler Playwright **não foi reexecutado** porque o dev server não estava no ar e o usuário pediu para não subir dev sem autorização. Para fechar o ciclo, rodar:

```bash
pnpm dev    # em outro terminal
pnpm i18n:audit
```

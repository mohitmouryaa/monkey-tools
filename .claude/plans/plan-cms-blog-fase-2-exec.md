# Prompt de execução — Fase 2 (CMS Blog)

> Gerado por `/explode-phase` em 2026-04-28 a partir de `plan-cms-blog-v2.md`.
> Arquivo único e autocontido (decisão do usuário: não criar pasta separada).
> Cole o bloco "Prompt (copiar daqui pra baixo)" como primeira mensagem em uma sessão limpa.

---

## Como usar

1. Abra uma sessão Claude Code dentro do worktree:
   ```
   /home/vinicius/Jobs/durvalino/freelas/monkey-tool-cms-blog
   ```
2. Cole o bloco `## Prompt` abaixo na íntegra como primeira mensagem.
3. O assistente vai executar a Fase 2 em ondas paralelas conforme o grafo.

---

## Resumo da explosão

- **Fase**: 2 — `postsRouter` tRPC + endpoint de upload de imagem
- **Micro-tarefas**: 7 (2.1a, 2.1b, 2.1c, 2.2, 2.3, 2.4, 2.5)
- **Ondas**: 4
  - Onda 1 (paralelo): **2.1a**, **2.3**
  - Onda 2 (paralelo): **2.1b**, **2.4**
  - Onda 3: **2.1c**
  - Onda 4 (paralelo): **2.2**, **2.5**
- **Reusos**: shape de paginação de `toolsRouter.getMany`, validação de slug única do `pagesRouter`, `getUploadUrl` do `@workspace/storage`, regra `startsWith("/api/upload")` do `proxy.ts`, `protectedProcedure`/`baseProcedure` do `trpc/init.ts`.
- **Criações**: arquivo `apps/web/trpc/routers/postsRouter.ts` (novo).
- **Modificações**: `apps/web/trpc/routers/_app.ts`, `apps/web/app/api/upload/route.ts`.

## Decisões aplicadas (respostas do usuário)

- **P1 = A**: filtrar `publishedAt <= now` para não-admins em `list` e `getBySlug` (`!ctx.session` → filtro automático).
- **P2 = A**: unicidade de slug em `update` espelhando `pagesRouter.updateCustomPage` (`findOne` + throw `CONFLICT`).
- **P3 = A**: estender `/api/upload` com parâmetro opcional `prefix` (default `"uploads"`, aceita `"cms"`). Sem rota nova.
- **P4 = A**: usar `PostModel.find(...).populate("tools").lean()` em `list`/`getBySlug` (sem aggregate).
- **P5 = A**: chamar `revalidateTag("blog")` + `revalidateTag(\`blog:${slug}\`)` direto via `import { revalidateTag } from "next/cache"` no router. Fase 6.1 cria helper e Fase 6.2 substitui.
- **P6 = A**: confiar na regra `pathname.startsWith("/api/upload")` já existente em `proxy.ts:38`. Sem novo tier.

---

## Prompt (copiar daqui pra baixo)

```
Você está no worktree `monkey-tool-cms-blog` (branch atual `dev-br`),
implementando a Fase 2 do plano em `.claude/plans/plan-cms-blog-v2.md`.

# Contexto permitido
- Apenas estes arquivos:
  - `.claude/plans/plan-cms-blog-v2.md` (plano original)
  - `.claude/plans/plan-cms-blog-fase-2-exec.md` (este arquivo, com micro-tarefas inline abaixo)
  - código do repo
- NÃO leia outras pastas de planos nem histórico de conversas anteriores.
- Se algo importante estiver faltando, PARE e pergunte. Não infira.

# Fase 1 já está ✅ — pré-condições garantidas
- `PostModel` em `packages/database/src/models/Post.ts` exportado em `@workspace/database`.
- `PostStatus` em `@workspace/types`.
- `createPostSchema`, `updatePostSchema` em `apps/web/modules/dashboard/schema/post.tsx`.
- `Tool` ainda NÃO tem `featuredPostId` em produção (era item 1.3 da Fase 1 — confirmar com `git log` se foi mergeado; se não, pare e me avise).

# Padrões a seguir (NÃO recriar)
- Shape de paginação: copiar EXATAMENTE de `apps/web/trpc/routers/toolsRouter.ts` (`getMany`, linhas 47–124):
  `{ items, page, pageSize, totalCount, totalPages, hasNextPage, hasPreviousPage }`.
- Constantes de paginação: `PAGINATION.*` em `apps/web/modules/common/constants.ts`.
- Procedures e router factory: `baseProcedure`, `protectedProcedure`, `createTRPCRouter` de `@/trpc/init`.
- Gate de visibilidade pública: padrão `if (!ctx.session) ...` (espelhar `toolsRouter.getMany:65`).
- Validação de slug único em `update`: espelhar `pagesRouter.updateCustomPage` (linhas 271–280).
- Erros: `TRPCError` com `code: "NOT_FOUND" | "CONFLICT" | "INTERNAL_SERVER_ERROR"`.
- `_id` sempre serializado para string ao retornar (`_id: doc._id.toString()`).
- `populate("tools")` para trazer tools populadas (NÃO usar aggregate).
- Imports: kebab-case nos arquivos, double quotes, 130 colunas, sem reorganizar (Biome organize-imports off).

# Execução em ondas

Antes de começar: **recalcule as ondas a partir dos `depends_on` declarados em cada
micro-tarefa abaixo**. A lista é conveniência, não fonte da verdade.

Para cada onda, em ordem:
1. Identifique as tasks da onda pelo grafo recalculado.
2. Se 2+ tasks na onda E elas tocam arquivos diferentes → delegue a subagentes
   (Agent tool, `subagent_type=general-purpose`) em paralelo (múltiplas tool
   calls na mesma resposta). Passe ao subagente: este arquivo + arquivo do plano
   + descrição da task específica abaixo.
3. Se 2+ tasks na onda mas tocam o MESMO arquivo do projeto → execute
   sequencialmente dentro da onda (mesmo que o `depends_on` permita paralelo).
4. Tasks solitárias na onda → execute você mesmo.
5. Aguarde TODAS terminarem antes de avançar.

## Política de falha (CRÍTICA)

Qualquer falha (erro de edit, typecheck quebrado, lint quebrado, verificação não bate)
PARA a Fase 2 inteira. Nenhuma onda posterior inicia. Reporte:
- qual task falhou e por quê
- quais tasks da mesma onda já concluíram (✅)
- quais tasks posteriores foram canceladas
e espere instrução. NÃO tente recuperação parcial.

## Marcação de progresso

- Ao concluir uma task: marque `[x]` no checkbox correspondente em
  `.claude/plans/plan-cms-blog-v2.md` (seção "Fase 2"). Se o checkbox cobre
  uma sub-tarefa que ainda tem partes a executar, deixe sem marcar.
- NÃO marque ✅ na Fase 2 (no título) até TODAS as tasks abaixo
  concluírem com sucesso E typecheck + lint passarem.
- Ao concluir tudo:
  - rode `pnpm --filter web typecheck` e `pnpm --filter web lint`
  - se ambos passarem: adicione `✅` ao final do título "### Fase 2 — ..."
  - reporte status final ao usuário (sem commit automático — ele decide)

# Decisões já tomadas (NÃO repergunte)

- **P1**: filtrar `publishedAt <= now` para não-admins em `list` e `getBySlug` (gate via `!ctx.session`).
- **P2**: unicidade de slug em `update` via `findOne` + throw `CONFLICT` (espelho de `pagesRouter`).
- **P3**: estender `/api/upload` com parâmetro opcional `prefix` (default `"uploads"`, aceita `"cms"`). Sem nova rota.
- **P4**: `PostModel.find(...).populate("tools").lean()` (sem aggregate).
- **P5**: chamar `revalidateTag` direto via `import { revalidateTag } from "next/cache"` nas mutations. Helper canônico vem na Fase 6.1.
- **P6**: rate limit do upload já coberto por `pathname.startsWith("/api/upload")` em `proxy.ts:38`. No-op nesta fase.

---

# Micro-tarefas

## 2.1a — postsRouter: esqueleto + procedures públicas de leitura

- **type**: criar
- **depends_on**: []
- **arquivo**: `apps/web/trpc/routers/postsRouter.ts` (novo)

### Detalhe
Criar o arquivo do zero. Imports no topo:

```ts
import z from "zod";
import { TRPCError } from "@trpc/server";
import { revalidateTag } from "next/cache";
import { PostModel, ToolModel, mongoose } from "@workspace/database";
import { PostStatus } from "@workspace/types";
import { PAGINATION } from "@/modules/common/constants";
import { baseProcedure, createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { createPostSchema, updatePostSchema } from "@/modules/dashboard/schema/post";
```

Exportar `postsRouter = createTRPCRouter({...})` com as procedures abaixo
(somente as 4 públicas nesta task; as outras ficam para 2.1b/2.1c):

#### `list` (baseProcedure)
Input:
```ts
z.object({
  page: z.number().default(PAGINATION.DEFAULT_PAGE),
  pageSize: z.number().min(PAGINATION.MIN_PAGE_SIZE).max(PAGINATION.MAX_PAGE_SIZE).default(PAGINATION.DEFAULT_PAGE_SIZE),
  search: z.string().default(""),
  status: z.nativeEnum(PostStatus).optional(),
  toolId: z.string().optional(),
})
```
Lógica:
- Construir `match: mongoose.AnyObject = {}`.
- Se `!ctx.session`: forçar `match.status = PostStatus.PUBLISHED` e `match.publishedAt = { $lte: new Date() }`. (Admin/logado vê todos por padrão; pode filtrar via `input.status` se quiser.)
- Se `ctx.session` e `input.status`: `match.status = input.status`.
- Se `input.search`: usar text index — `match.$text = { $search: input.search }` (já está indexado em `Post.ts:74`).
- Se `input.toolId` válido: `match.tools = new mongoose.Types.ObjectId(input.toolId)`.
- Query:
  ```ts
  const [items, totalCount] = await Promise.all([
    PostModel.find(match)
      .populate("tools")
      .sort({ publishedAt: -1, createdAt: -1 })
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .lean(),
    PostModel.countDocuments(match),
  ]);
  ```
- Retornar shape `{ items: items.map(p => ({ ...p, _id: p._id.toString(), tools: p.tools?.map(t => ({ ...t, _id: t._id.toString() })) ?? [] })), page, pageSize, totalCount, totalPages, hasNextPage, hasPreviousPage }`.

#### `getBySlug` (baseProcedure)
Input: `z.object({ slug: z.string().min(1) })`.
Lógica:
- `const post = await PostModel.findOne({ slug }).populate("tools").lean();`
- Se não achar: `TRPCError NOT_FOUND`.
- Se `!ctx.session`: validar `post.status === PostStatus.PUBLISHED` e `post.publishedAt && post.publishedAt <= new Date()`. Se não passar: `NOT_FOUND` (não vazar existência).
- Retornar com `_id` em string e `tools` mapeadas com `_id` em string.

#### `getByToolId` (baseProcedure)
Input: `z.object({ toolId: z.string().min(1), page: ..., pageSize: ... })` (paginação igual à `list`).
Lógica: idem `list` mas com `match.tools = new mongoose.Types.ObjectId(toolId)` fixo. Manter gate de `!ctx.session`.

#### `getFeatured` (baseProcedure)
Input: `z.object({ limit: z.number().min(1).max(20).default(6) }).optional()` ou similar.
Lógica:
- `match = { isFeaturedGlobal: true, status: PostStatus.PUBLISHED, publishedAt: { $lte: new Date() } };`
- `PostModel.find(match).populate("tools").sort({ publishedAt: -1 }).limit(limit).lean();`
- Retornar array (sem paginação) com `_id` em string.

### Verificação
- [ ] Arquivo criado e compila isoladamente (TS).
- [ ] Imports não quebram (`PostModel`, `ToolModel`, `mongoose` exportados de `@workspace/database`).
- [ ] As 4 procedures retornam tipos consistentes com o shape descrito.
- [ ] Filtro de gate `!ctx.session` aplicado em todas as 4.

---

## 2.1b — postsRouter: procedure de admin (`getById`)

- **type**: modificar
- **depends_on**: [2.1a]
- **arquivo**: `apps/web/trpc/routers/postsRouter.ts`

### Detalhe
Adicionar dentro do `createTRPCRouter({...})` existente, após as públicas:

#### `getById` (protectedProcedure)
Input: `z.object({ id: z.string().min(1) })`.
Lógica:
- `const post = await PostModel.findById(input.id).populate("tools").lean();`
- Se não achar: `TRPCError NOT_FOUND` (mensagem "Post not found").
- Retornar com `_id` em string e `tools` mapeadas.
- SEM filtro de status (admin vê tudo).

### Verificação
- [ ] Procedure adicionada na ordem correta (após públicas, antes das mutations).
- [ ] `protectedProcedure` usado.
- [ ] Compila.

---

## 2.1c — postsRouter: mutations (`create`, `update`, `delete`)

- **type**: modificar
- **depends_on**: [2.1b]
- **arquivo**: `apps/web/trpc/routers/postsRouter.ts`

### Detalhe
Adicionar as 3 mutations ao `createTRPCRouter({...})`:

#### `create` (protectedProcedure)
Input: `createPostSchema`.
Lógica:
- Verificar unicidade de slug: `await PostModel.findOne({ slug: input.slug })` → se existir, `TRPCError CONFLICT` ("A post with this slug already exists").
- Mapear `toolIds` do input para o campo `tools` (ObjectIds): `tools: input.toolIds.map(id => new mongoose.Types.ObjectId(id))`.
- `const post = await PostModel.create({ ...input, tools, toolIds: undefined });` (cuidado: omitir `toolIds` do payload final).
- Disparar revalidação:
  ```ts
  revalidateTag("blog");
  if (post.slug) revalidateTag(`blog:${post.slug}`);
  ```
- Retornar `{ ...post.toObject(), _id: post._id.toString() }`.

#### `update` (protectedProcedure)
Input: `updatePostSchema` (já tem `id` + todos os campos de `createPostSchema`).
Lógica (espelhando `pagesRouter.updateCustomPage`):
- `const post = await PostModel.findById(input.id);` → se não achar, `NOT_FOUND`.
- Capturar `oldSlug = post.slug`.
- Se `input.slug !== post.slug`: `findOne({ slug: input.slug })` → `CONFLICT` se existir.
- Atribuir todos os campos no doc (`post.title = input.title; post.slug = input.slug; ...`).
- Mapear `tools = input.toolIds.map(...)` igual `create`.
- `await post.save();`
- Disparar revalidação dos slugs antigo E novo:
  ```ts
  revalidateTag("blog");
  revalidateTag(`blog:${oldSlug}`);
  if (input.slug !== oldSlug) revalidateTag(`blog:${input.slug}`);
  ```
- Retornar `{ ...post.toObject(), _id: post._id.toString() }`.

#### `delete` (protectedProcedure)
Input: `z.object({ id: z.string().min(1) })`.
Lógica:
- `const post = await PostModel.findById(input.id);` → se não achar, `NOT_FOUND`.
- Capturar `slug = post.slug`.
- `await PostModel.findByIdAndDelete(input.id);`
- Cascade: `await ToolModel.updateMany({ featuredPostId: input.id }, { $unset: { featuredPostId: 1 } });`
  > **Nota**: se `featuredPostId` ainda não existe no schema da Tool (item 1.3 da Fase 1), o `$unset` é no-op silencioso. Não falha. Mantém o código preparado.
- Revalidar:
  ```ts
  revalidateTag("blog");
  revalidateTag(`blog:${slug}`);
  ```
  > Revalidação das tags `tool:*` afetadas pela cascade fica para a Fase 6.2 (precisa do helper canônico).
- Retornar `{ id: post._id.toString(), slug }`.

### Verificação
- [ ] As 3 mutations usam `protectedProcedure`.
- [ ] `create` valida unicidade de slug ANTES de inserir.
- [ ] `update` valida unicidade SÓ quando slug muda.
- [ ] `delete` faz cascade no `ToolModel.updateMany`.
- [ ] Todas as 3 chamam `revalidateTag` antes de retornar.
- [ ] `update` revalida slug antigo e novo quando muda.

---

## 2.2 — Registrar `posts` em `_app.ts`

- **type**: modificar
- **depends_on**: [2.1c]
- **arquivo**: `apps/web/trpc/routers/_app.ts`

### Detalhe
Adicionar import e registrar no router:

```ts
import { postsRouter } from "@/trpc/routers/postsRouter";

export const appRouter = createTRPCRouter({
  jobs: jobsRouter,
  tools: toolsRouter,
  categories: categoriesRouter,
  pages: pagesRouter,
  posts: postsRouter,         // <-- adicionar nesta linha
  globalScripts: globalScriptsRouter,
});
```

Manter ordem alfabética OU posição lógica (entre `pages` e `globalScripts` é razoável). Não reformatar o resto.

### Verificação
- [ ] `import` adicionado.
- [ ] `posts: postsRouter` no objeto.
- [ ] `pnpm --filter web typecheck` passa nesta linha (o tipo `AppRouter` agora tem `posts.list` etc).

---

## 2.3 — Estender `/api/upload` com parâmetro `prefix`

- **type**: modificar
- **depends_on**: []
- **arquivo**: `apps/web/app/api/upload/route.ts`

### Detalhe
Estado atual (15 linhas):

```ts
import { v4 as uuidv4 } from "uuid";
import { NextResponse } from "next/server";
import { getUploadUrl } from "@workspace/storage";

export async function POST(req: Request) {
  const { filename, contentType } = await req.json();
  const fileKey = `uploads/${uuidv4()}-${filename}`;
  const url = await getUploadUrl(fileKey, contentType);
  return NextResponse.json({ url, fileKey });
}
```

Mudar para aceitar `prefix` opcional (default `"uploads"`, aceitar apenas
valores em allowlist `["uploads", "cms"]` para evitar path injection):

```ts
import { v4 as uuidv4 } from "uuid";
import { NextResponse } from "next/server";
import { getUploadUrl } from "@workspace/storage";

const ALLOWED_PREFIXES = new Set(["uploads", "cms"]);

export async function POST(req: Request) {
  const { filename, contentType, prefix } = await req.json();

  const safePrefix = typeof prefix === "string" && ALLOWED_PREFIXES.has(prefix) ? prefix : "uploads";
  const fileKey = `${safePrefix}/${uuidv4()}-${filename}`;

  const url = await getUploadUrl(fileKey, contentType);

  return NextResponse.json({ url, fileKey });
}
```

> Importante: contrato atual (sem `prefix`) continua funcionando — `safePrefix`
> cai em `"uploads"`. Compatibilidade preservada para uploads de jobs.

### Verificação
- [ ] Arquivo usa `ALLOWED_PREFIXES` (allowlist, não regex).
- [ ] Sem `prefix` no body: comportamento antigo intacto (`uploads/...`).
- [ ] Com `prefix: "cms"`: gera `cms/...`.
- [ ] Com `prefix: "../etc"` ou outro: cai em `uploads/...` (não vaza path).

---

## 2.4 — Verificar rate limit cobre `/api/upload` com prefix

- **type**: uso (verificação, sem código novo)
- **depends_on**: [2.3]
- **arquivo**: `apps/web/proxy.ts` (apenas leitura/confirmação)

### Detalhe
Conferir que `apps/web/proxy.ts:38–40` (`if (pathname.startsWith("/api/upload"))`) já cobre TODAS as requisições para `/api/upload` independente de prefix no body — POST único endpoint, mesmo path.

Como o endpoint é o mesmo path e o rate limit é por path + IP, **não há código a alterar nesta task**. Documentar no PR/commit que P6 = A foi seguido.

Se a inspeção revelar que o proxy diferencia requests por outro critério (header, query) e isso quebra o rate limit, PARE e reporte (não estava previsto).

### Verificação
- [ ] `proxy.ts:38` ainda começa com `if (pathname.startsWith("/api/upload"))`.
- [ ] Nenhuma alteração feita em `proxy.ts`.
- [ ] Documentar no commit body: "rate limit reusado via path-prefix existente".

---

## 2.5 — Garantir que mutations chamam `revalidateTag`

- **type**: uso (verificação cruzada)
- **depends_on**: [2.1c]
- **arquivo**: `apps/web/trpc/routers/postsRouter.ts`

### Detalhe
Reler `postsRouter.ts` após 2.1c e confirmar que:
- `create` chama `revalidateTag("blog")` + `revalidateTag(\`blog:${post.slug}\`)`.
- `update` chama `revalidateTag("blog")` + slug antigo + slug novo (quando muda).
- `delete` chama `revalidateTag("blog")` + `revalidateTag(\`blog:${slug}\`)`.

Se 2.1c já implementou tudo corretamente: **nenhum edit nesta task**.
Se faltar alguma chamada: adicionar e marcar feito.

> **Nota**: o helper canônico `revalidateBlog(slug?)` será criado na Fase 6.1.
> Quando ele existir, a Fase 6.2 substitui as 3 chamadas inline. Por enquanto,
> as chamadas diretas a `revalidateTag` são intencionais.

### Verificação
- [ ] Cada mutation tem ao menos uma chamada a `revalidateTag`.
- [ ] `update` revalida slug antigo se mudou.
- [ ] Não há nenhuma mutation faltando revalidação.

---

# Critério de conclusão da Fase 2

A Fase 2 só fecha quando TUDO abaixo verifica:

- [ ] `pnpm --filter web typecheck` passa.
- [ ] `pnpm --filter web lint` passa (Biome).
- [ ] `posts.list`, `posts.getBySlug`, `posts.getByToolId`, `posts.getFeatured`,
      `posts.getById`, `posts.create`, `posts.update`, `posts.delete` estão
      tipadas no `AppRouter` (verificável por hover em `useTRPC().posts` no editor
      ou via `caller.posts.X` em `apps/web/trpc/server.tsx`).
- [ ] `posts.list` retorna shape `{ items, page, pageSize, totalCount, totalPages, hasNextPage, hasPreviousPage }` — espelho de `tools.getMany`.
- [ ] `POST /api/upload` aceita body com `prefix: "cms"` e gera fileKey `cms/...`.
- [ ] `POST /api/upload` SEM `prefix` continua gerando fileKey `uploads/...` (compat).
- [ ] Mutations chamam `revalidateTag("blog")` e `revalidateTag(\`blog:${slug}\`)`.
- [ ] Checkboxes da seção "Fase 2" em `plan-cms-blog-v2.md` marcados.
- [ ] `### Fase 2 — ...` recebe `✅` no fim do título.

# O que NÃO fazer nesta fase

- Não criar a UI do dashboard (Fase 3).
- Não criar `apps/web/modules/blog/lib/revalidate.ts` (Fase 6.1).
- Não envolver fetches em `unstable_cache` ainda (Fase 4 e 5).
- Não dar push, não abrir PR. Apenas commits locais sob ordem do usuário.
- Não rodar `docker` (memória do usuário: lifecycle manual).
```

---

## Notas para Vinícius

- Total de 7 micro-tarefas em 4 ondas. Onda 1 e Onda 4 paralelizáveis (2 tasks cada).
- O arquivo do plano original (`plan-cms-blog-v2.md`) continua intocado nesta sessão; só será editado pelo executor (checkboxes + ✅ no título).
- Se a Fase 5 ou 6 forem executadas antes do esperado e mudarem o helper de revalidação, a Fase 2 NÃO precisa ser refeita — só substituir as 3 chamadas inline pelo helper.

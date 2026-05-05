# Dicionário de intenções da busca (`search-intents.ts`)

A busca global do navbar (`⌘K` / `Ctrl+K`) usa **fuzzy match lexical** via `cmdk`.
Match lexical sozinho falha quando o usuário descreve o problema em vez do nome
da ferramenta — ex: digita **"PDF grande"** querendo encontrar **"Compactar PDF"**.

Pra resolver isso, mantemos um dicionário de **intenções** que mapeia frases
comuns em PT-BR pro slug da ferramenta correspondente. As frases são injetadas
no `value` do `CommandItem`, então o cmdk passa a casar com elas durante a busca.

## Onde fica

`apps/web/modules/common/ui/components/search-intents.ts`

```ts
export const TOOL_INTENT_ALIASES: Record<string, string[]> = {
  "compactar-pdf": ["pdf grande", "pdf pesado", "diminuir pdf", "email pdf grande", ...],
  "ocr-pdf": ["pdf escaneado", "pdf nao copia texto", "extrair texto pdf", ...],
  ...
};
```

A chave é o `link` (slug) da Tool no MongoDB — o mesmo valor que vai pra URL
(`/ferramentas/<categoria>/<slug>`).

## Por que aqui e não no banco

Decisão consciente: o dicionário **vive em código**.

- Versionado no git (PR review pega entradas confusas ou redundantes).
- Tipado e refatorável.
- Zero overhead de carregamento — vai junto com o bundle do client.
- Quem cria a ferramenta é também quem conhece os termos que o usuário usa.

Se um dia for necessário deixar não-devs editarem (marketing, suporte), migra-se
pra um campo `aliases: string[]` na collection `Tool` e popula-se via admin.
Por ora, fica em código.

## Como adicionar (obrigatório ao criar uma ferramenta)

**Esta etapa faz parte do checklist de criação de ferramenta. Não é opcional.**

Quando você adicionar uma nova Tool no banco (via seed, admin ou script),
**na mesma PR** edite `search-intents.ts`:

1. Use o `link` (slug) da tool como chave.
2. Adicione 5–15 frases curtas, em **minúsculas e sem acento**
   (a maioria dos usuários digita assim).
3. Cubra três tipos de frase:

   | Tipo | Exemplo (pra "compactar-pdf") |
   |---|---|
   | Sintoma do usuário | `"pdf grande"`, `"email pdf grande"`, `"pdf nao envia"` |
   | Sinônimo do verbo | `"diminuir pdf"`, `"reduzir pdf"`, `"compactar arquivo"` |
   | Termo em inglês comum | `"compress pdf"`, `"shrink pdf"` |

4. Não duplique o título da tool nem o `seoKeywords` — esses já são indexados.
5. Se duas tools concorrem pelo mesmo intent (ex. "compactar-pdf" e
   "comprimir-pdf"), tudo bem listar em ambas — o cmdk vai mostrar as duas e
   deixa o usuário escolher.

Exemplo da entrada mínima ao criar uma tool nova:

```ts
"converter-heic-jpg": [
  "foto iphone",
  "heic nao abre",
  "converter foto iphone",
  "iphone para jpg",
  "imagem iphone windows",
  "abrir heic",
],
```

## Checklist ao criar uma ferramenta

- [ ] Schema/seed no banco com `title`, `link`, `description`, `seoKeywords`
- [ ] Componente em `apps/web/modules/tools/ui/components/<componentName>.tsx`
- [ ] Página em `apps/web/app/(main)/ferramentas/[toolCategory]/[tool]/page.tsx`
      (geralmente já dinâmica)
- [ ] **Entrada em `search-intents.ts`** — sem isso, a tool fica invisível pra
      buscas por intenção (perde tráfego de cauda longa)
- [ ] Conteúdo SEO da página (`h1Heading`, `introText`, `faqs`)

## Testando

Sem subir o app: `pnpm --filter web typecheck`. O dicionário é só dados, não
quebra nada.

Com o app rodando: abre `⌘K` e digita uma das frases que você cadastrou.
A tool deve aparecer no grupo "Ferramentas" mesmo sem você ter digitado o nome.

## Quando esse dicionário não é mais suficiente

O dicionário cobre bem os top ~80% de buscas, mas tem limites claros:

- Curadoria manual — fácil esquecer ou divergir entre tools similares.
- Não captura linguagem natural longa
  ("preciso enviar um documento pelo gmail mas tá pesado").
- Não cobre erros de digitação que escapam do fuzzy do cmdk.

Quando o catálogo passar de ~80 ferramentas, ou quando quisermos otimizar
pra GEO/LLMs (que mandam queries em linguagem natural), o caminho é
**busca semântica via embeddings** — gerar um embedding por tool no build,
embeddar a query no client e fazer cosine similarity. Isso vira um issue
separado quando fizer sentido. Por hoje, dicionário é suficiente.

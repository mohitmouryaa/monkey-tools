# Procedimento de auditoria de performance — pdfs.com.br

Procedimento manual para validar Core Web Vitals (LCP < 2.5s, INP < 200ms,
CLS < 0.1) localmente antes de deploy. Pós-deploy, complementar com
PageSpeed Insights e Vercel Speed Insights.

## 1. Lighthouse local (mobile)

### Pré-requisitos

- Node 20+
- Chrome instalado
- MongoDB rodando: `docker ps | grep mongo` (subir com `docker compose up -d` se preciso).

### Execução

```bash
# Build de produção e start
pnpm --filter web build
pnpm --filter web start

# Em outro terminal, rodar Lighthouse mobile contra cada URL:
npx lighthouse http://localhost:3000/ \
  --form-factor=mobile \
  --only-categories=performance \
  --output=html --output-path=./.lighthouse/home.html

npx lighthouse http://localhost:3000/ferramentas \
  --form-factor=mobile --only-categories=performance \
  --output=html --output-path=./.lighthouse/tools.html

npx lighthouse http://localhost:3000/ferramentas/<categoria>/<ferramenta-1> \
  --form-factor=mobile --only-categories=performance \
  --output=html --output-path=./.lighthouse/tool-1.html

# Repetir para 3 ferramentas representativas (uma de cada categoria popular).
# Exemplo concreto: /ferramentas/conversao/comprimir-pdf
```

### Critério de aprovação

- Performance score ≥ 90 mobile em homepage.
- Performance score ≥ 90 mobile em pelo menos 3 páginas de ferramenta.
- LCP < 2.5s em todas as páginas auditadas.
- CLS < 0.1.

Lighthouse local ≠ PSI público. Diferenças esperadas: ±5 pontos. Se local
≥ 90, PSI pós-deploy normalmente fica no mesmo patamar.

## 2. Validação de code-splitting (`tool-view.tsx`)

`tool-view.tsx` importa o componente da ferramenta via
`await import(\`@/modules/tools/ui/components/${tool}\`)`. Isso garante que o
JS de outras ferramentas não vai no bundle desta rota.

```bash
pnpm --filter web build
```

Inspecionar `.next/analyze` (se `@next/bundle-analyzer` estiver ligado) ou
`.next/build-manifest.json`. O bundle inicial de cada
`/ferramentas/[cat]/[tool]` NÃO deve carregar componentes de outras
ferramentas. O `dynamic import()` em `tool-view.tsx` resolve só o componente
da ferramenta atual.

Heurística rápida sem bundle analyzer:

```bash
ls apps/web/.next/server/app/\(main\)/ferramentas/\[toolCategory\]/\[tool\]
# cada tool deve ter chunk próprio
ls -lh apps/web/.next/server/app/\(main\)/ferramentas/*/page.js
```

Se um chunk de página de ferramenta passar de ~150 KB gzip, abrir o
componente e checar imports estáticos vazando.

Sinal pós-deploy: se Vercel Speed Insights mostrar TBT alto em uma tool
page, conferir se algum import estático puxou outro tool.

## 3. Validação de imagens

Procurar `<img>` cru em código público (não em ferramentas client-side
que recebem `URL.createObjectURL`):

```bash
rg -n '<img ' apps/web/app apps/web/modules \
  --glob '!**/dashboard/**' --glob '!**/tools/ui/components/**'
```

Esperado: zero ocorrências em rotas SEO. Os `<img>` em
`sortable-pdf-grid.tsx`, `file-upload.tsx` e similares são previews de
arquivo do usuário (URL efêmera, página atrás de upload) — manter como
`<img>`.

- Imagens de capa do blog usam `next/image` com `priority` na rota
  `/blog/[slug]`.
- `images.remotePatterns` em `next.config.mjs` libera `images.unsplash.com`
  (placeholders) e `i.ytimg.com` (thumbnails YouTube).

## 4. SVGs e dimensões

```bash
# SVGs grandes em /public que entram em LCP devem ter width/height
# explícitos no Image component.
ls -lh apps/web/public/*.svg
```

`logo.svg` é o principal. Já consumido via `<Image fill sizes>` com
`priority` no header — OK.

## 5. Fontes

`next/font` (DM_Sans/Fredoka) com `display: swap` é o default — validado
em `app/layout.tsx`. Não há FOIT.

## 6. Web Vitals em produção

Coletados pelo Vercel Speed Insights (`<SpeedInsights />` já presente em
`app/layout.tsx`). Painel acessível em Vercel → Project → Speed Insights.
Métricas: LCP, FID/INP, CLS, FCP, TTFB.

Acompanhar p75 mobile semanalmente nos primeiros 30 dias após deploy.

## 7. Cache headers

`next.config.mjs` aplica `Cache-Control: public, max-age=31536000, immutable` em:

- `/_next/static/:path*`
- `/_next/image:path*`
- assets estáticos do `public/` (svg, png, jpg, jpeg, gif, webp, avif, ico, woff, woff2, ttf, otf)

Validar pós-deploy:

```bash
curl -I https://pdfs.com.br/logo.svg | grep -i cache-control
# Esperado: Cache-Control: public, max-age=31536000, immutable
```

Se não bater, conferir `next.config.mjs` → `async headers()`.

## 8. Trailing slash

`trailingSlash: false` em `next.config.mjs`. Canonical via `buildMetadata`
sempre sem `/` final.

## 9. Preconnect YouTube (depende da Fase 5)

Quando a Fase 5 (embed YouTube) estiver em produção, adicionar em
`app/layout.tsx` no `<head>` (via `metadata.other` ou `generateMetadata`
condicional):

```html
<link rel="preconnect" href="https://www.youtube.com" />
<link rel="preconnect" href="https://i.ytimg.com" />
```

Apenas em páginas que renderizam vídeo (componente `<Head>` na rota da
ferramenta quando `toolData.videoId` estiver setado). Aplicar globalmente
custa 1 round-trip extra em rotas sem vídeo. Antes da Fase 5 estar live,
NÃO adicionar — pré-conectar para domínio que não vai ser usado piora a
performance. Decisão pendente: medir custo no Lighthouse antes de aplicar
globalmente.

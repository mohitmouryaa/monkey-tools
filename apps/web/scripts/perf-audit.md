# Perf Audit — pdfs.com.br

Procedimento manual para validar Core Web Vitals e checks técnicos da spec 5.3.
Todas as decisões abaixo foram tomadas localmente; rodar antes de cada deploy
de release SEO.

## 1. Lighthouse local (mobile)

```sh
pnpm --filter web build
pnpm --filter web start &  # porta 3000
npx lighthouse http://localhost:3000/ --form-factor=mobile --output=html --output-path=./lighthouse-home.html
npx lighthouse http://localhost:3000/ferramentas --form-factor=mobile --output=html --output-path=./lighthouse-tools.html
npx lighthouse http://localhost:3000/ferramentas/conversao/comprimir-pdf --form-factor=mobile --output=html --output-path=./lighthouse-comprimir.html
```

Meta: Performance ≥ 90 mobile em homepage e em 3 tool pages representativas.
PSI público (https://pagespeed.web.dev) só é verificável após deploy — fazer
verificação extra pós-deploy.

## 2. Code splitting do tool-view

`tool-view.tsx` importa o componente da ferramenta via `await import(\`@/modules/tools/ui/components/${tool}\`)`. Isso garante que o JS de outras ferramentas não vai no bundle desta rota.

Validar:

```sh
pnpm --filter web build
ls apps/web/.next/server/app/\(main\)/ferramentas/\[toolCategory\]/\[tool\]
# cada tool deve ter chunk próprio
```

Heurística confiável: se Vercel Speed Insights pós-deploy mostrar TBT alto
em uma tool page, conferir se algum import estático puxou outro tool.

## 3. Imagens

- `<img>` restantes em ferramentas client-side são `URL.createObjectURL` (preview de upload). Manter como está — não são SEO-relevantes e mudar para `next/image` quebra fluxo de blob.
- Imagens de capa do blog usam `next/image` com `priority` na rota `/blog/[slug]`.
- `images.remotePatterns` em `next.config.mjs` libera `images.unsplash.com` (placeholders) e `i.ytimg.com` (thumbnails YouTube).

## 4. Fontes

`next/font` (DM_Sans/Fredoka) com `display: swap` é o default — validado em `app/layout.tsx`. Não há FOIT.

## 5. Cache headers

`next.config.mjs` aplica `Cache-Control: public, max-age=31536000, immutable` em:
- `/_next/static/:path*`
- `/_next/image:path*`
- assets estáticos do `public/` (svg, png, jpg, jpeg, gif, webp, avif, ico, woff, woff2, ttf, otf)

## 6. Trailing slash

`trailingSlash: false` em `next.config.mjs`. Canonical via `buildMetadata` sempre sem `/` final.

## 7. Preconnect YouTube (TODO)

Adicionar `<link rel="preconnect" href="https://www.youtube.com">` e
`<link rel="preconnect" href="https://i.ytimg.com">` no `<head>` apenas em
páginas com vídeo embedado (Fase 5). Pode ser feito por componente `<Head>` na
rota da ferramenta quando `toolData.videoId` estiver setado, ou globalmente
(custo: 1 round-trip extra em rotas sem vídeo). **Decisão pendente:** medir
custo no Lighthouse antes de aplicar globalmente.

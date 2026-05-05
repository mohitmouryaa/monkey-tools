// Atualiza seoTitle e seoDescription em prod (DBs admin e monkey-tools).
// Roda com: mongosh "$DATABASE_URL_PROD" --quiet --file scripts/update-seo.mongosh.js

const { ObjectId } = require("mongodb");

const TOOLS = [
  { _id: "69d4451dd001fe7eab44ba8d", title: "Comprimir PDF Online Grátis — Reduza Tamanho | pdfs.com.br",
    description: "Comprima PDF online grátis em segundos, sem instalar nada. Reduza até 90% do tamanho mantendo a qualidade do arquivo. Experimente grátis agora!" },
  { _id: "69d4451dd001fe7eab44ba8e", title: "Compressor PDF Avançado — Reduza ao Máximo | pdfs.com.br",
    description: "Compressor PDF avançado online: escolha o nível de compressão e reduza arquivos pesados ao máximo, sem perder leitura. Grátis e sem cadastro." },
  { _id: "69d4451dd001fe7eab44ba8f", title: "Juntar PDF Online — Mescle Arquivos Grátis | pdfs.com.br",
    description: "Junte vários PDFs em um só online, grátis e sem instalar. Mescle arquivos na ordem que quiser, mantendo a qualidade original. Use agora!" },
  { _id: "69d4451dd001fe7eab44ba90", title: "Dividir PDF Online Grátis — Separe Páginas | pdfs.com.br",
    description: "Divida PDF online grátis: extraia páginas ou separe um arquivo em vários PDFs em segundos. Sem cadastro e sem marca d'água. Experimente agora!" },
  { _id: "69d4451dd001fe7eab44ba91", title: "Rotacionar PDF Online — Gire Páginas Grátis | pdfs.com.br",
    description: "Rotacione páginas de PDF online grátis em 90°, 180° ou 270°. Corrija a orientação do seu arquivo em segundos, sem instalar nada. Use agora!" },
  { _id: "69d4451dd001fe7eab44ba92", title: "Desbloquear PDF — Remova Senha Online Grátis | pdfs.com.br",
    description: "Desbloqueie PDF online grátis: remova a senha de PDFs que você esqueceu, em segundos. Seguro, sem instalar e sem deixar rastros. Teste agora!" },
  { _id: "69d4451dd001fe7eab44ba93", title: "Proteger PDF com Senha Online Grátis | pdfs.com.br",
    description: "Proteja PDF com senha online grátis. Adicione criptografia ao seu arquivo em 1 clique e mantenha o conteúdo seguro. Sem cadastro, use agora!" },
  { _id: "69d4451dd001fe7eab44ba94", title: "Numerar Páginas de PDF Online Grátis | pdfs.com.br",
    description: "Numere páginas de PDF online grátis. Escolha posição, formato e estilo dos números em segundos, sem instalar programa. Experimente agora!" },
  { _id: "69d4451dd001fe7eab44ba95", title: "Marca D'água em PDF Online Grátis | pdfs.com.br",
    description: "Adicione marca d'água em PDF online grátis: texto ou imagem, em qualquer página, com transparência ajustável. Rápido, sem cadastro. Use agora!" },
  { _id: "69d4451dd001fe7eab44ba96", title: "Converter PDF para Word Online Grátis | pdfs.com.br",
    description: "Converta PDF para Word online grátis mantendo a formatação. Edite seu .docx direto no Office em segundos, sem instalar nada. Teste agora!" },
  { _id: "69d4451dd001fe7eab44ba97", title: "PDF para JPG Online Grátis — Converta Páginas | pdfs.com.br",
    description: "Converta PDF para JPG online grátis: transforme cada página em uma imagem em alta qualidade, em segundos. Sem cadastro nem marca d'água." },
  { _id: "69d4451dd001fe7eab44ba98", title: "PDF para Excel Online Grátis — Extrair Tabelas | pdfs.com.br",
    description: "Converta PDF para Excel online grátis: extraia tabelas direto para .xlsx mantendo a estrutura. Sem instalar programa. Experimente agora!" },
  { _id: "69d4451dd001fe7eab44ba99", title: "Word para PDF Online Grátis — Converta .doc | pdfs.com.br",
    description: "Converta Word para PDF online grátis preservando formatação, fontes e imagens. Rápido, sem cadastro e direto do navegador. Use agora!" },
  { _id: "69d4451dd001fe7eab44ba9a", title: "Excel para PDF Online Grátis — Converta .xlsx | pdfs.com.br",
    description: "Converta Excel para PDF online grátis mantendo planilhas, gráficos e formatação. Em segundos, sem instalar nada. Experimente agora!" },
  { _id: "69d4451dd001fe7eab44ba9b", title: "JPG para PDF Online Grátis — Converter Imagem | pdfs.com.br",
    description: "Converta JPG para PDF online grátis: una várias imagens em um único PDF na ordem que quiser. Rápido, sem cadastro. Experimente agora!" },
  { _id: "69d4451dd001fe7eab44ba9c", title: "Comprimir Imagem Online Grátis — JPG e PNG | pdfs.com.br",
    description: "Comprima imagens online grátis (JPG, PNG, WebP) sem perder qualidade visível. Reduza tamanho para email, web e redes sociais. Use agora!" },
  { _id: "69d4451dd001fe7eab44ba9d", title: "Recortar Imagem Online Grátis — Crop Rápido | pdfs.com.br",
    description: "Recorte imagens online grátis em qualquer proporção (1:1, 16:9, livre). Sem instalar nada, direto do navegador. Teste agora!" },
  { _id: "69d4451dd001fe7eab44ba9e", title: "Inverter Imagem Online Grátis — Espelhar Foto | pdfs.com.br",
    description: "Inverta imagens online grátis: espelhe horizontal ou verticalmente em 1 clique. Funciona com JPG, PNG e WebP. Experimente agora!" },
  { _id: "69d4451dd001fe7eab44ba9f", title: "Redimensionar Imagem Online Grátis | pdfs.com.br",
    description: "Redimensione imagens online grátis em pixels ou porcentagem mantendo a proporção. Ideal para web, email e redes sociais. Use agora!" },
  { _id: "69d4451dd001fe7eab44baa0", title: "Remover Fundo de Imagem Online Grátis | pdfs.com.br",
    description: "Remova o fundo de imagens online grátis com IA em segundos. Resultado em PNG transparente, pronto para usar. Sem cadastro, teste agora!" },
  { _id: "69d4451dd001fe7eab44baa1", title: "HEIC para JPG Online Grátis — Conversor iPhone | pdfs.com.br",
    description: "Converta HEIC para JPG online grátis: abra fotos do iPhone em qualquer dispositivo. Conversão em lote, sem instalar nada. Use agora!" },
  { _id: "69d4451dd001fe7eab44baa2", title: "JPG para PNG Online Grátis — Conversor Rápido | pdfs.com.br",
    description: "Converta JPG para PNG online grátis mantendo a qualidade. Ideal para imagens com transparência. Sem cadastro, direto no navegador." },
  { _id: "69d4451dd001fe7eab44baa3", title: "PNG para JPG Online Grátis — Conversor Rápido | pdfs.com.br",
    description: "Converta PNG para JPG online grátis e reduza o tamanho do arquivo. Conversão em lote em segundos, sem instalar nada. Use agora!" },
  { _id: "69d4451dd001fe7eab44baa4", title: "WebP para JPG Online Grátis — Conversor | pdfs.com.br",
    description: "Converta WebP para JPG online grátis: abra imagens da web em qualquer programa. Sem cadastro, em segundos. Experimente agora!" },
  { _id: "69d4451dd001fe7eab44baa5", title: "Gerador de QR Code Online Grátis — Crie e Baixe | pdfs.com.br",
    description: "Crie QR Code online grátis para link, texto, Wi-Fi ou contato. Personalize cores e baixe em PNG ou SVG. Sem cadastro, use agora!" },
  { _id: "69d4451dd001fe7eab44baa6", title: "Gerador de Senha Forte Online Grátis e Seguro | pdfs.com.br",
    description: "Gere senhas fortes online grátis com letras, números e símbolos. 100% no navegador, sem enviar nada para servidores. Use agora!" },
  { _id: "69d4451dd001fe7eab44baa7", title: "Gerador de CPF Online Grátis — Válido p/ Testes | pdfs.com.br",
    description: "Gere CPF válido online grátis para testes de sistema e formulários. Com ou sem máscara, em lote. Apenas para uso em desenvolvimento." },
  { _id: "69d4451dd001fe7eab44baa8", title: "Gerador de CNPJ Online Grátis — Válido p/ Testes | pdfs.com.br",
    description: "Gere CNPJ válido online grátis para testes de sistemas e cadastros. Com máscara ou só números, em lote. Para uso em desenvolvimento." },
  { _id: "69d4451dd001fe7eab44baa9", title: "Gerador de Endereço Online Grátis — CEP Falso | pdfs.com.br",
    description: "Gere endereços brasileiros aleatórios online grátis com CEP, rua, bairro e cidade. Útil para testes de formulários e cadastros." },
  { _id: "69d4451dd001fe7eab44baaa", title: "Gerador de Texto Decorado — Letras Estilosas | pdfs.com.br",
    description: "Crie textos decorados online grátis para Instagram, TikTok e bio: letras cursivas, em negrito, símbolos e fontes especiais. Use agora!" },
  { _id: "69d4451dd001fe7eab44baab", title: "Contador de Caracteres Online Grátis — Tempo Real | pdfs.com.br",
    description: "Conte caracteres online grátis em tempo real, com e sem espaços. Ideal para tweets, redações e SEO. Sem cadastro, use agora!" },
  { _id: "69d4451dd001fe7eab44baac", title: "Contador de Palavras Online Grátis — Tempo Real | pdfs.com.br",
    description: "Conte palavras, caracteres e parágrafos online grátis em tempo real. Ideal para redações, artigos e posts. Sem cadastro. Use agora!" },
  { _id: "69d4451dd001fe7eab44baad", title: "Converter JSON para Excel Online Grátis | pdfs.com.br",
    description: "Converta JSON para Excel online grátis: gere planilhas .xlsx a partir do seu JSON em 1 clique. Sem instalar nada. Experimente agora!" },
];

const PAGES = [
  { _id: "69d43f1b1f75bed19344ba89",
    title: "Ferramentas PDF Online Grátis e em Português | pdfs.com.br",
    description: "Ferramentas PDF online grátis, sem instalar nada. Comprima, converta, junte, divida e proteja seus arquivos com 1 clique. Tudo em português. Use agora!" },
  { _id: "69d43f1b1f75bed19344ba8a",
    title: "Todas as Ferramentas Online Grátis para PDF e Imagem | pdfs.com.br",
    description: "Encontre todas as ferramentas online grátis em um só lugar: PDF, imagem, geradores e contadores. Sem cadastro, sem instalar, direto no navegador." },
];

function applyTo(dbName) {
  const target = db.getSiblingDB(dbName);
  let toolsUpdated = 0, pagesUpdated = 0;

  for (const t of TOOLS) {
    const r = target.tools.updateOne(
      { _id: ObjectId.createFromHexString(t._id) },
      { $set: { seoTitle: t.title, seoDescription: t.description } }
    );
    toolsUpdated += r.modifiedCount;
  }
  for (const p of PAGES) {
    const r = target.pages.updateOne(
      { _id: ObjectId.createFromHexString(p._id) },
      { $set: { seoTitle: p.title, seoDescription: p.description } }
    );
    pagesUpdated += r.modifiedCount;
  }
  print(`[${dbName}] tools: ${toolsUpdated}/${TOOLS.length} • pages: ${pagesUpdated}/${PAGES.length}`);
}

print("→ Atualizando DB admin (banco ativo do app em prod)…");
applyTo("admin");
print("→ Atualizando DB monkey-tools (cópia restaurada antes)…");
applyTo("monkey-tools");

print("\n=== Sample após update (admin.tools) ===");
printjson(db.getSiblingDB("admin").tools.find({}, { title: 1, seoTitle: 1, seoDescription: 1, _id: 0 }).limit(3).toArray());
print("\n=== Sample após update (admin.pages) ===");
printjson(db.getSiblingDB("admin").pages.find({}, { seoTitle: 1, seoDescription: 1, _id: 0 }).toArray());

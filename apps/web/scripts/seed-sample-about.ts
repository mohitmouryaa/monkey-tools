import { connectToDatabase, PageModel } from "@workspace/database";
import { PageType } from "@workspace/types";

const SLUG = "sobre-exemplo";

const sampleContent = {
  time: Date.now(),
  version: "2.31.6",
  blocks: [
    {
      type: "hero",
      data: {
        badge: "Conheça a equipe",
        heading: "A gente acredita que ferramentas boas devem ser gratuitas",
        description:
          "Somos um time pequeno apaixonado por resolver problemas reais. Cada ferramenta aqui foi pensada para funcionar em segundos, sem cadastro e sem pegadinhas.",
        primaryButtonText: "Ver ferramentas",
        primaryButtonLink: "/ferramentas",
        secondaryButtonText: "Fale com a gente",
        secondaryButtonLink: "/contato",
      },
    },
    {
      type: "header",
      data: { text: "Nossa missão", level: 2 },
    },
    {
      type: "paragraph",
      data: {
        text: "Tornar tarefas chatas — converter, comprimir, juntar arquivos — em algo que cabe num clique. Sem instalar programa, sem entregar email, sem upgrade pago escondido.",
      },
    },
    {
      type: "steps",
      data: {
        title: "Como nasceu",
        subtitle: "Três momentos que definiram o projeto.",
        steps: [
          {
            iconName: "Lightbulb",
            title: "Ideia",
            description: "Cansamos de sites que pedem cadastro pra comprimir um PDF. Decidimos fazer diferente.",
          },
          {
            iconName: "Hammer",
            title: "Construção",
            description: "Escrevemos cada ferramenta do zero, com foco em velocidade e simplicidade.",
          },
          {
            iconName: "Rocket",
            title: "Lançamento",
            description: "Liberamos público e gratuito, e seguimos adicionando ferramentas conforme a demanda.",
          },
        ],
      },
    },
    {
      type: "cards",
      data: {
        title: "Princípios",
        subtitle: "O que orienta cada decisão de produto.",
        cards: [
          {
            iconName: "Zap",
            title: "Rápido",
            description: "Resultado em segundos. Sem fila, sem espera, sem login.",
          },
          {
            iconName: "ShieldCheck",
            title: "Privado",
            description: "Seus arquivos não são armazenados. Processados e descartados na mesma sessão.",
            linkLabel: "Como protegemos",
            linkHref: "/seguranca",
          },
          {
            iconName: "Heart",
            title: "Gratuito de verdade",
            description: "Sem trial, sem cobrança escondida. Mantido por publicidade não-invasiva.",
          },
        ],
      },
    },
    {
      type: "header",
      data: { text: "Perguntas que recebemos sempre", level: 2 },
    },
    {
      type: "faq",
      data: {
        title: "Perguntas frequentes",
        items: [
          {
            question: "Vocês armazenam meus arquivos?",
            answer:
              'Não. Após o processamento, os arquivos são <strong>descartados</strong>. Saiba mais em <a href="/seguranca">nossa página de segurança</a>.',
          },
          {
            question: "Posso usar comercialmente?",
            answer: "Sim. Não há limitação de uso comercial nas ferramentas gratuitas.",
          },
          {
            question: "Existe limite de arquivos?",
            answer: "Existe um <em>rate limit</em> para evitar abuso, mas para uso normal você nem percebe.",
          },
        ],
      },
    },
    {
      type: "paragraph",
      data: {
        text: 'Tem uma ferramenta que sente falta? <a href="/contato">Manda pra gente</a> — a próxima a entrar no ar pode ser a sua sugestão.',
      },
    },
    {
      type: "cta",
      data: {
        heading: "Bora começar?",
        description: "Mais de 30 ferramentas prontas pra resolver sua tarefa em segundos.",
        buttonText: "Ver todas as ferramentas",
        buttonLink: "/ferramentas",
      },
    },
  ],
};

async function main() {
  console.log("Conectando no MongoDB...");
  await connectToDatabase();

  console.log(`Upserting Page slug="${SLUG}"...`);
  const result = await PageModel.findOneAndUpdate(
    { pageType: PageType.CUSTOM, slug: SLUG },
    {
      $set: {
        pageType: PageType.CUSTOM,
        slug: SLUG,
        title: "Sobre nós",
        seoTitle: "Sobre nós — pdfs.com.br",
        seoDescription: "Conheça quem está por trás das ferramentas, nossa missão e princípios.",
        seoKeywords: "sobre, equipe, missão",
        isActive: true,
        showInFooter: false,
        content: sampleContent,
      },
    },
    { upsert: true, new: true },
  );

  console.log("OK. Page id:", result?._id?.toString());
  console.log(`URL pública: http://localhost:3001/${SLUG}`);
  process.exit(0);
}

main().catch((err) => {
  console.error("Falhou:", err);
  process.exit(1);
});

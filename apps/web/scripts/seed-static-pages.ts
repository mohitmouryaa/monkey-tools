import { connectToDatabase, PageModel } from "@workspace/database";
import { PageType } from "@workspace/types";

const EDITORJS_VERSION = "2.31.6";

interface StaticPageSeed {
  slug: string;
  title: string;
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string;
  footerOrder: number;
  footerLabel: string;
  blocks: Array<{ type: string; data: unknown }>;
}

const pages: StaticPageSeed[] = [
  {
    slug: "sobre",
    title: "Sobre nós",
    seoTitle: "Sobre nós — pdfs.com.br",
    seoDescription:
      "Quem somos, o que fazemos e por que oferecemos ferramentas online de PDF e imagem gratuitas, sem cadastro e sem pegadinhas.",
    seoKeywords: "sobre, equipe, missão, pdfs.com.br",
    footerOrder: 1,
    footerLabel: "Sobre",
    blocks: [
      {
        type: "hero",
        data: {
          badge: "Sobre",
          heading: "Ferramentas que resolvem em segundos, sem cadastro",
          description:
            "Nascemos para tornar tarefas chatas — converter, comprimir, juntar arquivos — em um clique. Tudo gratuito, no navegador.",
          primaryButtonText: "Ver ferramentas",
          primaryButtonLink: "/ferramentas",
          secondaryButtonText: "Como funciona",
          secondaryButtonLink: "/como-funciona",
        },
      },
      {
        type: "header",
        data: { text: "Nossa missão", level: 2 },
      },
      {
        type: "paragraph",
        data: {
          text: "Acreditamos que ferramentas básicas de produtividade — comprimir um PDF, converter uma imagem, juntar arquivos — não deveriam pedir cadastro, instalar programa ou cobrar trial. A pdfs.com.br existe para entregar isso de forma rápida, gratuita e respeitosa com seus dados.",
        },
      },
      {
        type: "steps",
        data: {
          title: "Como começou",
          subtitle: "Três momentos que definiram o projeto.",
          steps: [
            {
              iconName: "lightbulb",
              title: "Ideia",
              description: "Cansamos de sites que pedem cadastro pra comprimir um PDF. Decidimos fazer diferente.",
            },
            {
              iconName: "hammer",
              title: "Construção",
              description: "Escrevemos cada ferramenta do zero, com foco em velocidade, simplicidade e privacidade.",
            },
            {
              iconName: "rocket",
              title: "Lançamento",
              description: "Liberamos público, gratuito, e seguimos adicionando ferramentas conforme a demanda.",
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
              iconName: "zap",
              title: "Rápido",
              description: "Resultado em segundos. Sem fila, sem espera, sem login.",
            },
            {
              iconName: "shield-check",
              title: "Privado",
              description: "Seus arquivos são processados e descartados. Detalhes em nossa página de segurança.",
              linkLabel: "Como protegemos",
              linkHref: "/seguranca",
            },
            {
              iconName: "heart",
              title: "Gratuito de verdade",
              description: "Sem trial, sem cobrança escondida. Mantido por publicidade não-invasiva.",
            },
          ],
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
  },
  {
    slug: "como-funciona",
    title: "Como funciona",
    seoTitle: "Como funciona — pdfs.com.br",
    seoDescription:
      "Entenda em poucos passos como usar as ferramentas: envie o arquivo, escolha a ação e baixe o resultado. Tudo no navegador.",
    seoKeywords: "como funciona, tutorial, passo a passo, pdf online, ferramentas",
    footerOrder: 2,
    footerLabel: "Como funciona",
    blocks: [
      {
        type: "hero",
        data: {
          badge: "Como funciona",
          heading: "Três passos. Sem cadastro. Sem instalação.",
          description: "Veja como tirar proveito das ferramentas em menos de um minuto, do envio ao download.",
          primaryButtonText: "Ver ferramentas",
          primaryButtonLink: "/ferramentas",
          secondaryButtonText: "Tirar dúvida",
          secondaryButtonLink: "/contato",
        },
      },
      {
        type: "steps",
        data: {
          title: "Passo a passo",
          subtitle: "Funciona igual para qualquer ferramenta.",
          steps: [
            {
              iconName: "upload",
              title: "Envie o arquivo",
              description: "Arraste ou selecione o arquivo. O upload roda direto no navegador.",
            },
            {
              iconName: "settings-2",
              title: "Escolha a ação",
              description: "Defina opções como qualidade, formato de saída ou ordem das páginas.",
            },
            {
              iconName: "download",
              title: "Baixe o resultado",
              description: "Quando o processamento termina, o arquivo fica disponível para download imediato.",
            },
          ],
        },
      },
      {
        type: "cards",
        data: {
          title: "O que dá pra fazer",
          subtitle: "Categorias principais de ferramentas.",
          cards: [
            {
              iconName: "file-text",
              title: "PDF",
              description: "Comprimir, juntar, dividir, converter para Word, Excel, JPG e proteger com senha.",
              linkLabel: "Ver ferramentas de PDF",
              linkHref: "/ferramentas",
            },
            {
              iconName: "image",
              title: "Imagens",
              description: "Converter formatos, redimensionar, comprimir e remover fundo de imagens.",
              linkLabel: "Ver ferramentas de imagem",
              linkHref: "/ferramentas",
            },
            {
              iconName: "file-cog",
              title: "Documentos",
              description: "Converter entre formatos populares (DOCX, XLSX, ODT) sem precisar do Office.",
              linkLabel: "Ver conversões",
              linkHref: "/ferramentas",
            },
          ],
        },
      },
      {
        type: "header",
        data: { text: "Perguntas frequentes", level: 2 },
      },
      {
        type: "faq",
        data: {
          title: "Dúvidas comuns",
          items: [
            {
              question: "Preciso criar conta?",
              answer: "Não. Todas as ferramentas funcionam sem cadastro. É só abrir e usar.",
            },
            {
              question: "Existe limite de tamanho de arquivo?",
              answer:
                "Há limites por ferramenta para evitar abuso, mas para uso pessoal e comercial regular você dificilmente esbarra neles.",
            },
            {
              question: "O processamento é local ou no servidor?",
              answer:
                "Depende da ferramenta. Algumas rodam direto no navegador, outras processam em nosso servidor e descartam o arquivo após a entrega. Veja detalhes em <a href=\"/seguranca\">Segurança</a>.",
            },
            {
              question: "Posso usar comercialmente?",
              answer: "Sim. Não há limitação de uso comercial nas ferramentas gratuitas.",
            },
          ],
        },
      },
      {
        type: "cta",
        data: {
          heading: "Pronto pra testar?",
          description: "Escolha uma ferramenta e veja em segundos.",
          buttonText: "Ver todas as ferramentas",
          buttonLink: "/ferramentas",
        },
      },
    ],
  },
  {
    slug: "seguranca",
    title: "Segurança",
    seoTitle: "Segurança — pdfs.com.br",
    seoDescription:
      "Como protegemos seus arquivos: conexão criptografada, descarte automático após processamento e zero compartilhamento com terceiros.",
    seoKeywords: "segurança, privacidade, criptografia, lgpd, proteção de dados",
    footerOrder: 3,
    footerLabel: "Segurança",
    blocks: [
      {
        type: "hero",
        data: {
          badge: "Segurança",
          heading: "Seus arquivos são seus. Ponto.",
          description:
            "Trabalhamos com o mínimo de dados necessário para entregar o resultado e descartamos tudo logo em seguida.",
          primaryButtonText: "Política de Privacidade",
          primaryButtonLink: "/privacidade",
          secondaryButtonText: "Falar com a gente",
          secondaryButtonLink: "/contato",
        },
      },
      {
        type: "cards",
        data: {
          title: "Como protegemos",
          subtitle: "Três camadas que cobrem ponta a ponta.",
          cards: [
            {
              iconName: "lock",
              title: "Conexão criptografada",
              description: "Todo upload e download trafega via HTTPS (TLS), evitando interceptação na rede.",
            },
            {
              iconName: "trash-2",
              title: "Descarte automático",
              description:
                "Arquivos enviados e gerados são removidos do servidor logo após o processamento e a entrega do resultado.",
            },
            {
              iconName: "user-x",
              title: "Sem cadastro",
              description: "Não pedimos email, nome ou login. Você usa anonimamente — não há perfil para vazar.",
            },
          ],
        },
      },
      {
        type: "header",
        data: { text: "O que fazemos com seus arquivos", level: 2 },
      },
      {
        type: "paragraph",
        data: {
          text: "O fluxo é simples: o arquivo é enviado para um armazenamento temporário, processado pela ferramenta escolhida e o resultado é disponibilizado para download. Após a janela de retenção, o arquivo original e o resultado são apagados.",
        },
      },
      {
        type: "list",
        data: {
          style: "unordered",
          items: [
            { content: "<strong>Retenção curta:</strong> arquivos são removidos automaticamente após o processamento." },
            { content: "<strong>Sem leitura humana:</strong> nenhum membro da equipe acessa conteúdo de arquivos enviados." },
            { content: "<strong>Sem treinamento de IA:</strong> seus arquivos não alimentam modelos." },
            { content: "<strong>Sem compartilhamento:</strong> não vendemos nem repassamos arquivos a terceiros." },
          ],
        },
      },
      {
        type: "header",
        data: { text: "Boas práticas que sugerimos", level: 2 },
      },
      {
        type: "list",
        data: {
          style: "unordered",
          items: [
            { content: "Para documentos sensíveis, prefira <strong>proteger com senha</strong> antes de compartilhar." },
            { content: "Verifique sempre a URL <code>pdfs.com.br</code> na barra de endereço." },
            { content: "Evite usar redes Wi-Fi públicas para enviar arquivos confidenciais." },
          ],
        },
      },
      {
        type: "faq",
        data: {
          title: "Perguntas frequentes",
          items: [
            {
              question: "Vocês armazenam meus arquivos depois do download?",
              answer: "Não. Após o processamento e a entrega, o arquivo é descartado.",
            },
            {
              question: "Vocês veem o conteúdo do que envio?",
              answer:
                "Não. O processamento é automatizado. Nenhum membro da equipe abre ou lê arquivos enviados pelos usuários.",
            },
            {
              question: "Como reporto um problema de segurança?",
              answer:
                'Escreva pra gente em <a href="/contato">Contato</a> descrevendo o caso. Levamos relatórios de segurança a sério e respondemos o mais rápido possível.',
            },
          ],
        },
      },
      {
        type: "cta",
        data: {
          heading: "Quer mais detalhes?",
          description: "Veja a política de privacidade completa para entender exatamente o que coletamos e por quê.",
          buttonText: "Ler política de privacidade",
          buttonLink: "/privacidade",
        },
      },
    ],
  },
  {
    slug: "privacidade",
    title: "Política de Privacidade",
    seoTitle: "Política de Privacidade — pdfs.com.br",
    seoDescription:
      "Política de privacidade do pdfs.com.br: quais dados coletamos, como tratamos, base legal sob a LGPD e direitos do titular.",
    seoKeywords: "privacidade, lgpd, política, dados pessoais, cookies",
    footerOrder: 4,
    footerLabel: "Privacidade",
    blocks: [
      {
        type: "hero",
        data: {
          badge: "Privacidade",
          heading: "Política de Privacidade",
          description:
            "Esta política explica que dados o pdfs.com.br coleta, como utiliza e quais são seus direitos enquanto titular. Última atualização: abril/2026.",
        },
      },
      {
        type: "header",
        data: { text: "1. Dados que coletamos", level: 2 },
      },
      {
        type: "paragraph",
        data: {
          text: "Coletamos o mínimo necessário para operar as ferramentas e manter o serviço seguro. O uso é anônimo: não pedimos cadastro, nome ou email para utilizar as ferramentas gratuitas.",
        },
      },
      {
        type: "list",
        data: {
          style: "unordered",
          items: [
            { content: "<strong>Arquivos enviados:</strong> mantidos em armazenamento temporário e descartados após o processamento." },
            {
              content:
                "<strong>Dados técnicos:</strong> endereço IP, tipo de navegador, sistema operacional, páginas acessadas e timestamps — usados para segurança e estatística.",
            },
            { content: "<strong>Cookies:</strong> usados para preferências (tema, idioma) e medição de audiência agregada." },
          ],
        },
      },
      {
        type: "header",
        data: { text: "2. Como usamos esses dados", level: 2 },
      },
      {
        type: "list",
        data: {
          style: "unordered",
          items: [
            { content: "Operar as ferramentas (processar o arquivo enviado e devolver o resultado)." },
            { content: "Prevenir abuso (rate limiting, detecção de bots e automações maliciosas)." },
            { content: "Medir uso agregado para evoluir o produto." },
            { content: "Cumprir obrigações legais quando aplicável." },
          ],
        },
      },
      {
        type: "header",
        data: { text: "3. Base legal (LGPD)", level: 2 },
      },
      {
        type: "paragraph",
        data: {
          text: "O tratamento se ampara em <strong>execução de serviço solicitado pelo usuário</strong> (art. 7º, V), <strong>legítimo interesse</strong> para segurança e estatística (art. 7º, IX) e <strong>consentimento</strong> para cookies não essenciais.",
        },
      },
      {
        type: "header",
        data: { text: "4. Compartilhamento", level: 2 },
      },
      {
        type: "paragraph",
        data: {
          text: "Não vendemos nem alugamos dados pessoais. Compartilhamos apenas com fornecedores estritamente necessários (hospedagem, CDN, antifraude), sob contratos que exigem o mesmo nível de proteção.",
        },
      },
      {
        type: "header",
        data: { text: "5. Cookies e terceiros", level: 2 },
      },
      {
        type: "paragraph",
        data: {
          text: "Usamos cookies próprios para preferências e cookies de terceiros para análise de audiência e publicidade. Você pode bloquear cookies não essenciais nas configurações do navegador a qualquer momento.",
        },
      },
      {
        type: "header",
        data: { text: "6. Retenção", level: 2 },
      },
      {
        type: "list",
        data: {
          style: "unordered",
          items: [
            { content: "<strong>Arquivos:</strong> descartados em horas após o processamento." },
            { content: "<strong>Logs técnicos:</strong> retidos pelo período necessário para segurança e obrigações legais." },
          ],
        },
      },
      {
        type: "header",
        data: { text: "7. Direitos do titular", level: 2 },
      },
      {
        type: "paragraph",
        data: {
          text: "Sob a LGPD, você pode solicitar confirmação de tratamento, acesso, correção, anonimização, portabilidade, eliminação ou revogação de consentimento. Como o uso é anônimo, alguns direitos podem ser inviáveis por falta de identificação.",
        },
      },
      {
        type: "header",
        data: { text: "8. Contato", level: 2 },
      },
      {
        type: "paragraph",
        data: {
          text: 'Dúvidas, solicitações ou pedidos relacionados a privacidade podem ser enviados pela <a href="/contato">página de contato</a>.',
        },
      },
      {
        type: "cta",
        data: {
          heading: "Tem dúvidas sobre seus dados?",
          description: "Escreva pra gente — respondemos toda solicitação ligada a privacidade.",
          buttonText: "Falar com o time",
          buttonLink: "/contato",
        },
      },
    ],
  },
  {
    slug: "termos-de-uso",
    title: "Termos de Uso",
    seoTitle: "Termos de Uso — pdfs.com.br",
    seoDescription:
      "Termos de uso do pdfs.com.br: regras de utilização das ferramentas, responsabilidades, propriedade intelectual e limitações.",
    seoKeywords: "termos de uso, termos, condições, regras",
    footerOrder: 5,
    footerLabel: "Termos de Uso",
    blocks: [
      {
        type: "hero",
        data: {
          badge: "Termos de Uso",
          heading: "As regras do jogo, em bom português",
          description:
            "Ao utilizar o pdfs.com.br, você concorda com os termos abaixo. Eles existem para tornar o uso justo, seguro e previsível para todo mundo. Última atualização: abril/2026.",
        },
      },
      {
        type: "header",
        data: { text: "1. Aceitação dos termos", level: 2 },
      },
      {
        type: "paragraph",
        data: {
          text: "Ao acessar e usar as ferramentas, você declara ter lido, entendido e concordado com estes termos. Se não concordar, basta não utilizar o serviço.",
        },
      },
      {
        type: "header",
        data: { text: "2. Uso permitido", level: 2 },
      },
      {
        type: "list",
        data: {
          style: "unordered",
          items: [
            { content: "Uso pessoal e comercial das ferramentas gratuitas é permitido, sem necessidade de cadastro." },
            { content: "Você é responsável pelo conteúdo dos arquivos enviados e por ter direito de processá-los." },
            {
              content:
                "Não é permitido usar o serviço para conteúdo ilegal, malware, violação de direitos autorais ou infração à privacidade de terceiros.",
            },
            { content: "Tentativas de contornar limites técnicos, abusar de rate limit ou automatizar sem permissão podem resultar em bloqueio." },
          ],
        },
      },
      {
        type: "header",
        data: { text: "3. Propriedade intelectual", level: 2 },
      },
      {
        type: "paragraph",
        data: {
          text: "A marca, o site, o código e os componentes visuais são de propriedade do pdfs.com.br ou de seus licenciantes. Os arquivos que você envia continuam sendo seus.",
        },
      },
      {
        type: "header",
        data: { text: "4. Disponibilidade do serviço", level: 2 },
      },
      {
        type: "paragraph",
        data: {
          text: "Trabalhamos para manter o serviço estável, mas ele é oferecido <em>como está</em>, sem garantia de disponibilidade contínua. Manutenções, atualizações ou interrupções podem ocorrer sem aviso prévio.",
        },
      },
      {
        type: "header",
        data: { text: "5. Limitação de responsabilidade", level: 2 },
      },
      {
        type: "paragraph",
        data: {
          text: "Na máxima extensão permitida em lei, o pdfs.com.br não se responsabiliza por danos indiretos, lucros cessantes ou perda de dados decorrentes do uso ou indisponibilidade do serviço. Recomendamos manter cópias de segurança dos seus arquivos.",
        },
      },
      {
        type: "header",
        data: { text: "6. Privacidade", level: 2 },
      },
      {
        type: "paragraph",
        data: {
          text: 'O tratamento de dados pessoais segue nossa <a href="/privacidade">Política de Privacidade</a>, que faz parte destes termos.',
        },
      },
      {
        type: "header",
        data: { text: "7. Alterações", level: 2 },
      },
      {
        type: "paragraph",
        data: {
          text: "Podemos atualizar estes termos a qualquer momento. Mudanças relevantes serão sinalizadas nesta página com a data de atualização. O uso após a alteração implica concordância com a nova versão.",
        },
      },
      {
        type: "header",
        data: { text: "8. Lei aplicável e foro", level: 2 },
      },
      {
        type: "paragraph",
        data: {
          text: "Estes termos são regidos pelas leis brasileiras. Eventuais disputas serão resolvidas no foro da comarca do domicílio do operador do serviço, salvo regra específica de proteção ao consumidor.",
        },
      },
      {
        type: "cta",
        data: {
          heading: "Dúvidas sobre os termos?",
          description: "Fale com a gente antes de usar o serviço para casos sensíveis ou de larga escala.",
          buttonText: "Entrar em contato",
          buttonLink: "/contato",
        },
      },
    ],
  },
  {
    slug: "contato",
    title: "Contato",
    seoTitle: "Contato — pdfs.com.br",
    seoDescription:
      "Fale com o time do pdfs.com.br: sugestões de ferramentas, parcerias, questões de privacidade e suporte.",
    seoKeywords: "contato, suporte, feedback, sugestão",
    footerOrder: 6,
    footerLabel: "Contato",
    blocks: [
      {
        type: "hero",
        data: {
          badge: "Contato",
          heading: "Fala com o time",
          description:
            "Sugestão de ferramenta, problema técnico, parceria ou questão de privacidade — escolha o canal e manda. Lemos tudo.",
          primaryButtonText: "Mandar email",
          primaryButtonLink: "mailto:contato@pdfs.com.br",
          secondaryButtonText: "Ver ferramentas",
          secondaryButtonLink: "/ferramentas",
        },
      },
      {
        type: "cards",
        data: {
          title: "Canais de contato",
          subtitle: "Use o que combinar mais com a sua dúvida.",
          cards: [
            {
              iconName: "mail",
              title: "Suporte e dúvidas gerais",
              description: "Para problemas com ferramentas, sugestões e dúvidas de uso.",
              linkLabel: "contato@pdfs.com.br",
              linkHref: "mailto:contato@pdfs.com.br",
            },
            {
              iconName: "shield",
              title: "Privacidade e LGPD",
              description: "Para solicitações de dados pessoais, exclusão e relatos relacionados a privacidade.",
              linkLabel: "privacidade@pdfs.com.br",
              linkHref: "mailto:privacidade@pdfs.com.br",
            },
            {
              iconName: "handshake",
              title: "Parcerias e imprensa",
              description: "Propostas de parceria, integrações comerciais e contato de imprensa.",
              linkLabel: "parcerias@pdfs.com.br",
              linkHref: "mailto:parcerias@pdfs.com.br",
            },
          ],
        },
      },
      {
        type: "header",
        data: { text: "Antes de escrever", level: 2 },
      },
      {
        type: "paragraph",
        data: {
          text: 'Boa parte das dúvidas já está respondida em <a href="/como-funciona">Como funciona</a> e em <a href="/seguranca">Segurança</a>. Vale dar uma olhada — pode poupar uma ida e volta.',
        },
      },
      {
        type: "faq",
        data: {
          title: "Perguntas comuns",
          items: [
            {
              question: "Em quanto tempo vocês respondem?",
              answer: "Geralmente em até 2 dias úteis. Demandas de privacidade têm prioridade.",
            },
            {
              question: "Posso sugerir uma ferramenta nova?",
              answer:
                "Sim, sugestões são muito bem-vindas. Conta o problema que você está tentando resolver — isso ajuda mais do que a solução pronta.",
            },
            {
              question: "Tenho um problema com um arquivo específico. Posso mandar?",
              answer:
                "Pode, mas envie só se o conteúdo não for sensível. Para reproduzir bugs, costuma ser suficiente nos contar a ferramenta usada, o tipo do arquivo e a mensagem de erro.",
            },
          ],
        },
      },
      {
        type: "cta",
        data: {
          heading: "Quer testar enquanto a gente responde?",
          description: "Mais de 30 ferramentas prontas pra resolver sua tarefa em segundos.",
          buttonText: "Ver ferramentas",
          buttonLink: "/ferramentas",
        },
      },
    ],
  },
];

async function main() {
  console.log("Conectando no MongoDB...");
  await connectToDatabase();

  for (const page of pages) {
    console.log(`Upserting Page slug="${page.slug}"...`);
    const content = {
      time: Date.now(),
      version: EDITORJS_VERSION,
      blocks: page.blocks,
    };

    const result = await PageModel.findOneAndUpdate(
      { pageType: PageType.CUSTOM, slug: page.slug },
      {
        $set: {
          pageType: PageType.CUSTOM,
          slug: page.slug,
          title: page.title,
          seoTitle: page.seoTitle,
          seoDescription: page.seoDescription,
          seoKeywords: page.seoKeywords,
          isActive: true,
          showInFooter: true,
          footerOrder: page.footerOrder,
          footerLabel: page.footerLabel,
          content,
        },
      },
      { upsert: true, new: true },
    );

    console.log(`  -> id=${result?._id?.toString()}  /${page.slug}`);
  }

  console.log("\nFeito. Páginas disponíveis em:");
  for (const page of pages) {
    console.log(`  http://localhost:3001/${page.slug}`);
  }
  process.exit(0);
}

main().catch((err) => {
  console.error("Falhou:", err);
  process.exit(1);
});

// TODO(post-fase-5): deletar apos confirmar visual dos 6 blocos.

import { CardsBlock } from "@/modules/pages/ui/components/blocks/cards-block";
import { CtaBlock } from "@/modules/pages/ui/components/blocks/cta-block";
import { FaqBlock } from "@/modules/pages/ui/components/blocks/faq-block";
import { HeroBlock } from "@/modules/pages/ui/components/blocks/hero-block";
import { RawHtmlBlock } from "@/modules/pages/ui/components/blocks/raw-html-block";
import { StepsBlock } from "@/modules/pages/ui/components/blocks/steps-block";

export default function TestBlocksPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="bg-yellow-100 text-yellow-900 px-4 py-2 text-sm text-center font-medium">
        Rota dev — smoke test dos blocos de Page. Deletar apos validar.
      </div>

      <HeroBlock
        data={{
          badge: "100% gratuito",
          heading: "Como funciona",
          description: "Tres passos simples para resolver sua tarefa.",
          primaryButtonText: "Comecar agora",
          primaryButtonLink: "/ferramentas",
          secondaryButtonText: "Ver tutoriais",
          secondaryButtonLink: "/blog",
        }}
      />

      <StepsBlock
        data={{
          title: "Em 3 passos",
          subtitle: "Sem cadastro, sem instalacao.",
          steps: [
            { iconName: "Upload", title: "Selecione", description: "Escolha seus arquivos." },
            { iconName: "Settings", title: "Processe", description: "Aguarde alguns segundos." },
            { iconName: "Download", title: "Baixe", description: "Pronto, eh seu." },
          ],
        }}
      />

      <CardsBlock
        data={{
          title: "Por que usar?",
          subtitle: "Tudo o que voce precisa, num so lugar.",
          cards: [
            {
              iconName: "Shield",
              title: "Seguro",
              description: "Seus arquivos nao sao armazenados. Processados e descartados.",
              linkLabel: "Saiba mais",
              linkHref: "/seguranca",
            },
            {
              iconName: "Zap",
              title: "Rapido",
              description: "Processamento em segundos, sem fila.",
            },
            {
              title: "Gratuito",
              description: "Sem assinatura, sem cobranca escondida.",
            },
          ],
        }}
      />

      <FaqBlock
        data={{
          title: "Perguntas frequentes",
          items: [
            {
              question: "Meus arquivos sao armazenados?",
              answer:
                'Nao. Apos o processamento, seus arquivos sao <strong>descartados imediatamente</strong>. Saiba mais na nossa <a href="/seguranca">pagina de seguranca</a>.',
            },
            {
              question: "Preciso criar conta?",
              answer: "Nao. Todas as ferramentas funcionam sem cadastro.",
            },
            {
              question: "Tem limite de uso?",
              answer: "Existe um <em>rate limit</em> para evitar abuso, mas para uso normal voce nao percebe.",
            },
          ],
        }}
      />

      <CtaBlock
        data={{
          heading: "Pronto para resolver sua tarefa?",
          description: "Use a ferramenta certa para o caso e tenha o resultado em segundos — gratuito, direto no navegador.",
          buttonText: "Ver todas as ferramentas",
          buttonLink: "/ferramentas",
        }}
      />

      <div className="max-w-3xl mx-auto px-4 py-8 mt-10 border-t">
        <h2 className="text-2xl font-bold mb-4">Raw HTML (conteudo legado migrado)</h2>
      </div>
      <RawHtmlBlock
        data={{
          html: `
            <h1>Politica de Privacidade</h1>
            <p>Esta eh uma <strong>pagina de exemplo</strong> com conteudo legado do TipTap.</p>
            <h2>Coleta de dados</h2>
            <p>Coletamos apenas o <em>minimo necessario</em>. Veja mais em <a href="/termos">nossos termos</a>.</p>
            <ul>
              <li>Email apenas para login</li>
              <li>IP para rate limit</li>
              <li>Cookie de sessao</li>
            </ul>
            <blockquote>Privacidade nao eh negociavel.</blockquote>
            <p>Use <code>contato@pdfs.com.br</code> se tiver duvidas.</p>
          `,
        }}
      />
    </div>
  );
}

import type { Metadata } from "next";
import { EmpresasView } from "@/modules/empresas/ui/views/empresas-view";

export const metadata: Metadata = {
  title: "Para Empresas — pdfs.com.br | Soluções B2B em PDF e documentos",
  description:
    "Manipulação de documentos em escala para empresas: API, white-label, instância dedicada, infraestrutura no Brasil e compliance LGPD. Fale com o time pdfs.com.br.",
  alternates: {
    canonical: "/empresas",
  },
  openGraph: {
    title: "Para Empresas — pdfs.com.br",
    description:
      "API, white-label e instância dedicada para manipulação de PDF e documentos em escala. Construído no Brasil, em português, com SLA contratual.",
    url: "/empresas",
    type: "website",
  },
};

export default function EmpresasPage() {
  return <EmpresasView />;
}

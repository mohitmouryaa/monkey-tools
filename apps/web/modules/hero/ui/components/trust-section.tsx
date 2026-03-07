import { Zap, Shield, Globe } from "lucide-react";

export function TrustSection() {
  return (
    <section className="py-12 md:py-16">
      <div className="container max-w-4xl px-4 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="seo-section text-center">
            <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center mx-auto mb-4">
              <Zap className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-bold text-foreground mb-2">Ultra Rápido</h3>
            <p className="text-sm text-muted-foreground">
              Processamento em segundos com servidores otimizados. Sem filas, sem espera.
            </p>
          </div>
          <div className="seo-section text-center">
            <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center mx-auto mb-4">
              <Shield className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-bold text-foreground mb-2">100% Seguro</h3>
            <p className="text-sm text-muted-foreground">
              Seus arquivos são criptografados e automaticamente excluídos após o processamento.
            </p>
          </div>
          <div className="seo-section text-center">
            <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center mx-auto mb-4">
              <Globe className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-bold text-foreground mb-2">100% Online</h3>
            <p className="text-sm text-muted-foreground">
              Funciona direto no navegador. Sem downloads, sem instalação, sem cadastro.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

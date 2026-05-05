import Link from "next/link";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { ArrowLeft, Calendar, Hash, Mail, ShieldAlert, ShieldCheck, UserCircle2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@workspace/ui/components/avatar";
import { Badge } from "@workspace/ui/components/badge";
import { DashboardBreadcrumb } from "@/modules/common/ui/components/dashboard-breadcrumb";
import { AccountCopyableValue } from "@/modules/dashboard/ui/components/account-copyable-value";
import { AccountSignOutButton } from "@/modules/dashboard/ui/components/account-sign-out-button";
import { AccountTabs } from "@/modules/dashboard/ui/components/account-tabs";

type AccountUser = {
  id: string;
  name: string;
  email: string;
  image?: string | null;
  emailVerified?: boolean;
  createdAt?: string | Date;
  updatedAt?: string | Date;
};

type AccountSessionInfo = {
  expiresAt?: string | Date;
};

type AccountViewProps = {
  user: AccountUser;
  session: AccountSessionInfo;
};

const SectionHeader = ({ icon: Icon, label }: { icon?: React.ComponentType<{ className?: string }>; label: string }) => (
  <div className="space-y-2">
    <div className="flex items-center justify-between gap-3">
      <h2 className="flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-muted-foreground">
        {Icon && <Icon className="size-3.5" />}
        {label}
      </h2>
    </div>
    <div className="h-px bg-linear-to-r from-border via-border/50 to-transparent" />
  </div>
);

const Field = ({
  label,
  icon: Icon,
  children,
}: {
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
}) => (
  <div className="space-y-2">
    <dt className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
      {Icon && <Icon className="size-3" />}
      {label}
    </dt>
    <dd className="text-sm leading-relaxed text-foreground">{children}</dd>
  </div>
);

export const AccountView = ({ user, session }: AccountViewProps) => {
  const initial = user.name?.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase() || "?";
  const emailVerified = Boolean(user.emailVerified);
  const createdAt = user.createdAt;
  const updatedAt = user.updatedAt;
  const sessionExpiresAt = session?.expiresAt;

  return (
    <div className="min-h-screen bg-linear-to-br from-background via-background to-muted/20">
      <div className="px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <DashboardBreadcrumb className="mb-6" items={[{ label: "Dashboard", href: "/dashboard" }, { label: "Conta" }]} />

        <div className="flex flex-col gap-3 mb-12 sm:flex-row sm:items-center sm:justify-between">
          <Link
            href="/dashboard"
            className="inline-flex items-center self-start gap-2 text-sm font-medium transition-colors group text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Voltar para o Painel
          </Link>
        </div>

        <header className="pb-12 mb-12 border-b border-border/50">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
            <Avatar className="rounded-2xl size-24 ring-1 ring-border/50 shrink-0">
              <AvatarImage src={user.image || ""} alt={user.name} />
              <AvatarFallback className="text-3xl font-semibold rounded-2xl bg-muted">{initial}</AvatarFallback>
            </Avatar>

            <div className="flex-1 min-w-0 space-y-3">
              <div className="space-y-1.5">
                <h1 className="text-3xl font-bold tracking-tight md:text-4xl text-foreground">{user.name}</h1>
                <p className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                  <Mail className="size-3.5" />
                  {user.email}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <Badge variant={emailVerified ? "default" : "outline"} className="gap-1.5">
                  {emailVerified ? <ShieldCheck className="size-3" /> : <ShieldAlert className="size-3" />}
                  {emailVerified ? "Email verificado" : "Email não verificado"}
                </Badge>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono rounded-md bg-muted/50 text-muted-foreground">
                  <Hash className="size-3" />
                  {user.id.slice(-8)}
                </span>
              </div>
            </div>
          </div>
        </header>

        <div className="grid gap-x-12 gap-y-12 lg:grid-cols-3">
          <div className="space-y-12 lg:col-span-2">
            <AccountTabs defaultName={user.name ?? ""} defaultImage={user.image ?? ""} />
          </div>

          <aside className="space-y-12">
            <section className="space-y-6">
              <SectionHeader icon={UserCircle2} label="Resumo" />
              <dl className="space-y-5">
                <div className="flex items-center justify-between pb-4 border-b border-border/30">
                  <dt className="text-sm font-medium text-muted-foreground">Status</dt>
                  <dd
                    className={`text-sm font-semibold ${
                      emailVerified ? "text-emerald-600 dark:text-emerald-400" : "text-amber-600 dark:text-amber-400"
                    }`}
                  >
                    {emailVerified ? "Verificada" : "Pendente"}
                  </dd>
                </div>
                <div className="flex items-center justify-between pb-4 border-b border-border/30">
                  <dt className="text-sm font-medium text-muted-foreground">Email</dt>
                  <dd className="font-mono text-xs text-right truncate max-w-[180px] text-foreground">{user.email}</dd>
                </div>
                <Field label="ID da conta" icon={Hash}>
                  <AccountCopyableValue value={user.id} mono />
                </Field>
              </dl>
            </section>

            <section className="space-y-6">
              <SectionHeader icon={Calendar} label="Cronologia" />
              <dl className="space-y-5">
                <div className="flex items-center justify-between pb-4 border-b border-border/30">
                  <dt className="text-sm font-medium text-muted-foreground">Criada em</dt>
                  <dd className="text-sm text-right text-foreground">
                    {createdAt ? format(new Date(createdAt), "d MMM yyyy", { locale: ptBR }) : "—"}
                  </dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-sm font-medium text-muted-foreground">Atualizada em</dt>
                  <dd className="text-sm text-right text-foreground">
                    {updatedAt ? format(new Date(updatedAt), "d MMM yyyy 'às' HH:mm", { locale: ptBR }) : "—"}
                  </dd>
                </div>
              </dl>
            </section>

            <section className="space-y-6">
              <SectionHeader icon={ShieldCheck} label="Sessão atual" />
              <dl className="space-y-5">
                <div className="flex items-center justify-between pb-4 border-b border-border/30">
                  <dt className="text-sm font-medium text-muted-foreground">Expira em</dt>
                  <dd className="text-sm text-right text-foreground">
                    {sessionExpiresAt ? format(new Date(sessionExpiresAt), "d MMM 'às' HH:mm", { locale: ptBR }) : "—"}
                  </dd>
                </div>
                <AccountSignOutButton />
              </dl>
            </section>
          </aside>
        </div>
      </div>
    </div>
  );
};

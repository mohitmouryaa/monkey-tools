"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { toast } from "sonner";
import {
  ArrowLeft,
  AtSign,
  Calendar,
  CheckCircle2,
  Copy,
  Eye,
  EyeOff,
  Hash,
  KeyRound,
  Loader2,
  LogOut,
  Mail,
  ShieldCheck,
  ShieldAlert,
  Type,
  UserCircle2,
  UserCog,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@workspace/ui/components/avatar";
import { Badge } from "@workspace/ui/components/badge";
import { Button } from "@workspace/ui/components/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@workspace/ui/components/form";
import { Input } from "@workspace/ui/components/input";
import { Switch } from "@workspace/ui/components/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@workspace/ui/components/tabs";
import { DashboardBreadcrumb } from "@/modules/common/ui/components/dashboard-breadcrumb";
import { authClient, useSession } from "@/lib/auth-client";

const profileSchema = z.object({
  name: z.string().min(2, "O nome precisa ter pelo menos 2 caracteres").max(80, "O nome pode ter no máximo 80 caracteres"),
  image: z.union([z.string().url("Informe uma URL válida"), z.literal("")]).optional(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

const passwordSchema = z
  .object({
    currentPassword: z.string().min(1, "Informe a senha atual"),
    newPassword: z
      .string()
      .min(8, "A nova senha precisa ter pelo menos 8 caracteres")
      .max(128, "A nova senha pode ter no máximo 128 caracteres"),
    confirmPassword: z.string().min(1, "Confirme a nova senha"),
    revokeOtherSessions: z.boolean(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "As senhas não conferem",
  })
  .refine((data) => data.newPassword !== data.currentPassword, {
    path: ["newPassword"],
    message: "A nova senha deve ser diferente da atual",
  });

type PasswordFormValues = z.infer<typeof passwordSchema>;

const SectionHeader = ({
  icon: Icon,
  label,
  meta,
}: {
  icon?: React.ComponentType<{ className?: string }>;
  label: string;
  meta?: React.ReactNode;
}) => (
  <div className="space-y-2">
    <div className="flex items-center justify-between gap-3">
      <h2 className="flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-muted-foreground">
        {Icon && <Icon className="size-3.5" />}
        {label}
      </h2>
      {meta && <div className="font-mono text-xs text-muted-foreground">{meta}</div>}
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

export const AccountView = () => {
  const router = useRouter();
  const { data: session, isPending, refetch } = useSession();

  if (isPending) {
    return (
      <div className="min-h-screen bg-linear-to-br from-background via-background to-muted/20">
        <div className="px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="flex items-center justify-center py-32">
            <Loader2 className="size-8 animate-spin text-muted-foreground" />
          </div>
        </div>
      </div>
    );
  }

  if (!session?.user) {
    return null;
  }

  const { user, session: sessionInfo } = session;
  const initial = user.name?.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase() || "?";
  const createdAt = (user as unknown as { createdAt?: string | Date }).createdAt;
  const updatedAt = (user as unknown as { updatedAt?: string | Date }).updatedAt;
  const emailVerified = Boolean((user as unknown as { emailVerified?: boolean }).emailVerified);
  const sessionExpiresAt = (sessionInfo as unknown as { expiresAt?: string | Date })?.expiresAt;

  return (
    <div className="min-h-screen bg-linear-to-br from-background via-background to-muted/20">
      <div className="px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <DashboardBreadcrumb className="mb-6" items={[{ label: "Dashboard", href: "/dashboard" }, { label: "Conta" }]} />

        <div className="flex flex-col gap-3 mb-12 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="button"
            onClick={() => router.push("/dashboard")}
            className="inline-flex items-center self-start gap-2 text-sm font-medium transition-colors group text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Voltar para o Painel
          </button>
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
            <Tabs defaultValue="profile" className="space-y-8">
              <TabsList className="inline-flex w-auto h-auto gap-1 p-1 bg-muted/60">
                <TabsTrigger
                  value="profile"
                  className="gap-2 px-3 py-1.5 data-[state=active]:bg-background data-[state=active]:shadow-sm"
                >
                  <UserCog className="size-3.5" />
                  Perfil
                </TabsTrigger>
                <TabsTrigger
                  value="security"
                  className="gap-2 px-3 py-1.5 data-[state=active]:bg-background data-[state=active]:shadow-sm"
                >
                  <KeyRound className="size-3.5" />
                  Segurança
                </TabsTrigger>
              </TabsList>

              <TabsContent value="profile" className="space-y-8">
                <ProfileSection defaultValues={{ name: user.name ?? "", image: user.image ?? "" }} onSaved={() => refetch()} />
              </TabsContent>

              <TabsContent value="security" className="space-y-8">
                <SecuritySection />
              </TabsContent>
            </Tabs>
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
                  <CopyableValue value={user.id} mono />
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
                <button
                  type="button"
                  onClick={async () => {
                    await authClient.signOut();
                    router.push("/login");
                  }}
                  className="inline-flex items-center justify-between w-full px-1 py-3 text-sm font-medium transition-colors text-destructive hover:bg-destructive/5"
                >
                  Encerrar sessão
                  <LogOut className="w-4 h-4" />
                </button>
              </dl>
            </section>
          </aside>
        </div>
      </div>
    </div>
  );
};

const ProfileSection = ({ defaultValues, onSaved }: { defaultValues: ProfileFormValues; onSaved: () => void }) => {
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues,
  });
  const [isSaving, setIsSaving] = useState(false);

  const onSubmit = async (values: ProfileFormValues) => {
    setIsSaving(true);
    try {
      await authClient.updateUser(
        { name: values.name, image: values.image || undefined },
        {
          onSuccess: () => {
            toast.success("Perfil atualizado", { description: "Suas informações foram salvas." });
            form.reset(values);
            onSaved();
          },
          onError: (ctx) => {
            toast.error("Não foi possível salvar", {
              description: ctx.error.message || "Tente novamente em instantes.",
            });
          },
        },
      );
    } finally {
      setIsSaving(false);
    }
  };

  const isDirty = form.formState.isDirty;
  const watchedImage = form.watch("image");
  const watchedName = form.watch("name");
  const previewInitial = watchedName?.charAt(0).toUpperCase() || "?";

  return (
    <section className="space-y-6">
      <SectionHeader icon={UserCog} label="Informações do perfil" />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="flex items-center gap-4 p-4 border rounded-lg bg-muted/30 border-border/50">
            <Avatar className="rounded-xl size-16 ring-1 ring-border/50">
              <AvatarImage src={watchedImage || ""} alt={watchedName} />
              <AvatarFallback className="text-xl font-semibold rounded-xl bg-background">{previewInitial}</AvatarFallback>
            </Avatar>
            <div className="space-y-0.5">
              <p className="text-sm font-medium text-foreground">Pré-visualização</p>
              <p className="text-xs text-muted-foreground">Atualize o nome ou a URL do avatar abaixo.</p>
            </div>
          </div>

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                  <Type className="size-3" />
                  Nome
                </FormLabel>
                <FormControl>
                  <Input placeholder="Como você quer ser chamado" disabled={isSaving} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                  <AtSign className="size-3" />
                  URL do avatar
                </FormLabel>
                <FormControl>
                  <Input placeholder="https://..." type="url" disabled={isSaving} {...field} value={field.value ?? ""} />
                </FormControl>
                <FormDescription>
                  Cole o link de uma imagem hospedada publicamente. Deixe vazio para usar a inicial.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex items-center justify-end gap-2 pt-2">
            <Button type="button" variant="ghost" onClick={() => form.reset(defaultValues)} disabled={!isDirty || isSaving}>
              Descartar
            </Button>
            <Button type="submit" disabled={!isDirty || isSaving} className="gap-2">
              {isSaving ? <Loader2 className="size-4 animate-spin" /> : <CheckCircle2 className="size-4" />}
              Salvar alterações
            </Button>
          </div>
        </form>
      </Form>
    </section>
  );
};

const SecuritySection = () => {
  const form = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
      revokeOtherSessions: false,
    },
  });
  const [isSaving, setIsSaving] = useState(false);
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);

  const onSubmit = async (values: PasswordFormValues) => {
    setIsSaving(true);
    try {
      await authClient.changePassword(
        {
          currentPassword: values.currentPassword,
          newPassword: values.newPassword,
          revokeOtherSessions: values.revokeOtherSessions,
        },
        {
          onSuccess: () => {
            toast.success("Senha atualizada", {
              description: values.revokeOtherSessions ? "Outras sessões foram encerradas." : "Use a nova senha no próximo login.",
            });
            form.reset({ currentPassword: "", newPassword: "", confirmPassword: "", revokeOtherSessions: false });
          },
          onError: (ctx) => {
            toast.error("Não foi possível alterar a senha", {
              description: ctx.error.message || "Verifique a senha atual e tente novamente.",
            });
          },
        },
      );
    } finally {
      setIsSaving(false);
    }
  };

  const newPassword = form.watch("newPassword");
  const strength = passwordStrength(newPassword);

  return (
    <section className="space-y-6">
      <SectionHeader icon={KeyRound} label="Alterar senha" />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="currentPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                  <KeyRound className="size-3" />
                  Senha atual
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showCurrent ? "text" : "password"}
                      placeholder="••••••••"
                      autoComplete="current-password"
                      disabled={isSaving}
                      {...field}
                    />
                    <button
                      type="button"
                      onClick={() => setShowCurrent((v) => !v)}
                      className="absolute -translate-y-1/2 right-3 top-1/2 text-muted-foreground hover:text-foreground"
                      aria-label={showCurrent ? "Ocultar senha" : "Mostrar senha"}
                    >
                      {showCurrent ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                  <KeyRound className="size-3" />
                  Nova senha
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showNew ? "text" : "password"}
                      placeholder="Mínimo 8 caracteres"
                      autoComplete="new-password"
                      disabled={isSaving}
                      {...field}
                    />
                    <button
                      type="button"
                      onClick={() => setShowNew((v) => !v)}
                      className="absolute -translate-y-1/2 right-3 top-1/2 text-muted-foreground hover:text-foreground"
                      aria-label={showNew ? "Ocultar senha" : "Mostrar senha"}
                    >
                      {showNew ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                    </button>
                  </div>
                </FormControl>
                {newPassword.length > 0 && <PasswordStrengthMeter score={strength.score} label={strength.label} />}
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                  <KeyRound className="size-3" />
                  Confirmar nova senha
                </FormLabel>
                <FormControl>
                  <Input
                    type={showNew ? "text" : "password"}
                    placeholder="Digite novamente"
                    autoComplete="new-password"
                    disabled={isSaving}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="revokeOtherSessions"
            render={({ field }) => (
              <FormItem className="flex items-start justify-between gap-4 p-4 border rounded-lg border-border/50 bg-muted/30">
                <div className="space-y-1">
                  <FormLabel className="text-sm font-medium text-foreground">Encerrar outras sessões</FormLabel>
                  <FormDescription>Faz logout em todos os outros dispositivos onde você está logado.</FormDescription>
                </div>
                <FormControl>
                  <Switch checked={field.value} onCheckedChange={field.onChange} disabled={isSaving} />
                </FormControl>
              </FormItem>
            )}
          />

          <div className="flex items-center justify-end gap-2 pt-2">
            <Button type="button" variant="ghost" onClick={() => form.reset()} disabled={!form.formState.isDirty || isSaving}>
              Limpar
            </Button>
            <Button type="submit" disabled={!form.formState.isDirty || isSaving} className="gap-2">
              {isSaving ? <Loader2 className="size-4 animate-spin" /> : <ShieldCheck className="size-4" />}
              Atualizar senha
            </Button>
          </div>
        </form>
      </Form>
    </section>
  );
};

const CopyableValue = ({ value, mono }: { value: string; mono?: boolean }) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <button
      type="button"
      onClick={handleCopy}
      className={`inline-flex items-center justify-between w-full gap-2 px-2 py-1.5 -mx-2 rounded-md transition-colors hover:bg-muted ${
        mono ? "font-mono text-xs" : "text-sm"
      }`}
      title="Copiar"
    >
      <span className="truncate">{value}</span>
      {copied ? (
        <CheckCircle2 className="size-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
      ) : (
        <Copy className="size-3.5 text-muted-foreground shrink-0" />
      )}
    </button>
  );
};

const PasswordStrengthMeter = ({ score, label }: { score: number; label: string }) => {
  const colors = ["bg-destructive", "bg-destructive", "bg-amber-500", "bg-emerald-500", "bg-emerald-600"];
  const labelColor =
    score <= 1
      ? "text-destructive"
      : score === 2
        ? "text-amber-600 dark:text-amber-400"
        : "text-emerald-600 dark:text-emerald-400";
  return (
    <div className="space-y-1.5">
      <div className="flex gap-1">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className={`h-1 flex-1 rounded-full transition-colors ${i < score ? colors[score] : "bg-muted"}`} />
        ))}
      </div>
      <p className={`text-xs ${labelColor}`}>Força: {label}</p>
    </div>
  );
};

const passwordStrength = (password: string): { score: number; label: string } => {
  if (!password) return { score: 0, label: "—" };
  let score = 0;
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score++;
  if (/\d/.test(password) && /[^A-Za-z0-9]/.test(password)) score++;
  const labels = ["Muito fraca", "Fraca", "Razoável", "Forte", "Excelente"];
  return { score, label: labels[score] ?? "—" };
};

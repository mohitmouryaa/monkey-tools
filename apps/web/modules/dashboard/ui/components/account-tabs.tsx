"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { AtSign, CheckCircle2, Eye, EyeOff, KeyRound, Loader2, ShieldCheck, Type, UserCog } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@workspace/ui/components/avatar";
import { Button } from "@workspace/ui/components/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@workspace/ui/components/form";
import { Input } from "@workspace/ui/components/input";
import { Switch } from "@workspace/ui/components/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@workspace/ui/components/tabs";
import { authClient } from "@/lib/auth-client";

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

type AccountTabsProps = {
  defaultName: string;
  defaultImage: string;
};

export const AccountTabs = ({ defaultName, defaultImage }: AccountTabsProps) => (
  <Tabs defaultValue="profile" className="space-y-8">
    <TabsList className="inline-flex w-auto h-auto gap-1 p-1 bg-muted/60">
      <TabsTrigger value="profile" className="gap-2 px-3 py-1.5 data-[state=active]:bg-background data-[state=active]:shadow-sm">
        <UserCog className="size-3.5" />
        Perfil
      </TabsTrigger>
      <TabsTrigger value="security" className="gap-2 px-3 py-1.5 data-[state=active]:bg-background data-[state=active]:shadow-sm">
        <KeyRound className="size-3.5" />
        Segurança
      </TabsTrigger>
    </TabsList>

    <TabsContent value="profile" className="space-y-8">
      <ProfileSection defaultValues={{ name: defaultName, image: defaultImage }} />
    </TabsContent>

    <TabsContent value="security" className="space-y-8">
      <SecuritySection />
    </TabsContent>
  </Tabs>
);

const ProfileSection = ({ defaultValues }: { defaultValues: ProfileFormValues }) => {
  const router = useRouter();
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
            router.refresh();
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

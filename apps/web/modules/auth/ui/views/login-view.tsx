"use client";

import { z } from "zod";
import { toast } from "sonner";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { ArrowRight, AtSign, Eye, EyeOff, KeyRound, Loader2, Lock, ShieldCheck } from "lucide-react";
import { signIn } from "@/lib/auth-client";
import { Button } from "@workspace/ui/components/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@workspace/ui/components/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@workspace/ui/components/form";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@workspace/ui/components/card";

const loginSchema = z.object({
  email: z.email("Digite um endereço de email válido"),
  password: z.string().min(1, "A senha é obrigatória"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export const LoginView = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: LoginFormValues) => {
    setIsLoading(true);
    try {
      await signIn.email(
        {
          email: values.email,
          password: values.password,
        },
        {
          onSuccess: () => {
            toast.success("Bem-vindo de volta!", {
              description: "Login realizado com sucesso.",
            });
            router.push("/dashboard");
          },
          onError: (ctx) => {
            toast.error("Falha no login", {
              description: ctx.error.message || "Email ou senha inválidos",
            });
            setIsLoading(false);
          },
        },
      );
    } catch {
      toast.error("Ocorreu um erro", {
        description: "Tente novamente mais tarde.",
      });
      setIsLoading(false);
    }
  };

  return (
    <div className="relative flex items-center justify-center w-full min-h-screen p-4 overflow-hidden bg-linear-to-br from-background via-background to-muted/20">
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.04] [background-image:radial-gradient(circle_at_1px_1px,_currentColor_1px,_transparent_0)] [background-size:22px_22px] text-foreground"
      />
      <div aria-hidden className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-primary/15 blur-3xl" />
      <div aria-hidden className="absolute -bottom-40 -right-40 h-[28rem] w-[28rem] rounded-full bg-primary/10 blur-3xl" />

      <div className="relative w-full max-w-md space-y-8">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="relative">
            <div aria-hidden className="absolute -inset-2 rounded-2xl bg-primary/20 blur-xl" />
            <div className="relative flex items-center justify-center w-14 h-14 rounded-2xl bg-primary text-primary-foreground ring-1 ring-primary/20 shadow-lg shadow-primary/20">
              <Lock className="w-6 h-6" strokeWidth={2.5} />
            </div>
          </div>
          <div className="space-y-1.5">
            <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-muted-foreground">
              <ShieldCheck className="size-3.5" />
              Acesso restrito
            </span>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              PDFS<span className="text-primary">.com.br</span> Admin
            </h1>
            <p className="text-sm leading-relaxed text-muted-foreground">Digite suas credenciais para acessar o painel.</p>
          </div>
        </div>

        <Card className="border-border/60 shadow-xl shadow-foreground/5 backdrop-blur-sm bg-card/95">
          <CardHeader className="space-y-2">
            <div className="space-y-1.5">
              <CardTitle className="text-xl">Entrar</CardTitle>
              <CardDescription>Use seu email e senha de administrador para continuar.</CardDescription>
            </div>
            <div className="h-px bg-linear-to-r from-border via-border/50 to-transparent" />
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                        <AtSign className="size-3" />
                        Email
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="voce@pdfs.com.br"
                          type="email"
                          autoComplete="email"
                          autoFocus
                          disabled={isLoading}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                        <KeyRound className="size-3" />
                        Senha
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            placeholder="••••••••"
                            type={showPassword ? "text" : "password"}
                            autoComplete="current-password"
                            disabled={isLoading}
                            className="pr-10"
                            {...field}
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword((v) => !v)}
                            className="absolute -translate-y-1/2 right-3 top-1/2 text-muted-foreground hover:text-foreground"
                            aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                          >
                            {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button className="w-full gap-2" type="submit" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="size-4 animate-spin" />
                      Entrando...
                    </>
                  ) : (
                    <>
                      Entrar no painel
                      <ArrowRight className="size-4" />
                    </>
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex flex-col gap-3">
            <div className="h-px w-full bg-linear-to-r from-transparent via-border/50 to-transparent" />
            <p className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
              <ShieldCheck className="size-3" />
              Área de acesso restrito. Apenas pessoal autorizado.
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

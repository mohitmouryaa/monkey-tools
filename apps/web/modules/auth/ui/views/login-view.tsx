"use client";

import { z } from "zod";
import { toast } from "sonner";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Loader2, Lock } from "lucide-react";
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
    <div className="flex items-center justify-center w-full min-h-screen p-4 bg-gray-950">
      <div className="w-full max-w-md space-y-4">
        <div className="flex flex-col items-center space-y-2 text-center">
          <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary text-primary-foreground">
            <Lock className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight">pdfs.com.br Admin</h1>
          <p className="text-sm text-muted-foreground">Digite suas credenciais para acessar o painel</p>
        </div>

        <Card className="shadow-lg border-border/50">
          <CardHeader>
            <CardTitle>Entrar</CardTitle>
            <CardDescription>Use seu email e senha de administrador para continuar.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="admin@example.com" type="email" disabled={isLoading} {...field} />
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
                      <FormLabel>Senha</FormLabel>
                      <FormControl>
                        <Input placeholder="••••••••" type="password" disabled={isLoading} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button className="w-full" type="submit" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Entrando...
                    </>
                  ) : (
                    "Entrar"
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <p className="text-xs text-muted-foreground">Área de acesso restrito. Apenas pessoal autorizado.</p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

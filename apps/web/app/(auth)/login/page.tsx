import { requireUnauth } from "@/lib/auth-utils";
import { LoginView } from "@/modules/auth/ui/views/login-view";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login Admin - pdfs.com.br",
  description: "Login seguro para administradores do pdfs.com.br.",
};

export default async function Page() {
  await requireUnauth();
  return <LoginView />;
}

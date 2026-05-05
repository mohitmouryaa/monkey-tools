import type { Metadata } from "next";
import { requireAuth } from "@/lib/auth-utils";
import { CreatePostView } from "@/modules/dashboard/ui/views/create-post-view";

export const metadata: Metadata = {
  title: "Novo post",
  description: "Criar novo post para o blog.",
};

export default async function NewPostPage() {
  await requireAuth();
  return <CreatePostView />;
}

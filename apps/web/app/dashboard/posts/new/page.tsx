import { requireAuth } from "@/lib/auth-utils";
import { CreatePostView } from "@/modules/dashboard/ui/views/create-post-view";

export default async function NewPostPage() {
  await requireAuth();
  return <CreatePostView />;
}

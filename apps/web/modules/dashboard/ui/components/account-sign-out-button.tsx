"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { authClient } from "@/lib/auth-client";

export const AccountSignOutButton = () => {
  const router = useRouter();

  const handleSignOut = async () => {
    await authClient.signOut();
    router.push("/login");
  };

  return (
    <button
      type="button"
      onClick={handleSignOut}
      className="inline-flex items-center justify-between w-full px-1 py-3 text-sm font-medium transition-colors text-destructive hover:bg-destructive/5"
    >
      Encerrar sessão
      <LogOut className="w-4 h-4" />
    </button>
  );
};

import { Suspense } from "react";
import { redirect } from "next/navigation";
import { rolInfo } from "@/lib/auth/demo-users";
import { getCurrentUser } from "@/lib/auth/session";
import { PanelSkeleton } from "./_components/shell";

export default function PanelPage() {
  return (
    <Suspense fallback={<PanelSkeleton />}>
      <RedirigirAlPanel />
    </Suspense>
  );
}

async function RedirigirAlPanel() {
  const user = await getCurrentUser();
  redirect(user ? rolInfo[user.rol].home : "/login");
  return null;
}

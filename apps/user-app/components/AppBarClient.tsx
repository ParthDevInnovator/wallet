"use client";

import { Appbar } from "@repo/ui/appbar";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export function AppBarClient() {
  const session = useSession();
  const router = useRouter();
  return (
    <div>
      <Appbar
        onSignin={signIn}
        onSignout={async () => {
          await signOut();
          router.push("/signin");
        }}
        user={session.data?.user ? session.data.user : null}
      />
    </div>
  );
}

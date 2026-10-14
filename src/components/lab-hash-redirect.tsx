"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

/** Old shares point at /projects#lab; hashes never reach the server, so redirect on the client. */
export function LabHashRedirect() {
  const router = useRouter();

  useEffect(() => {
    if (window.location.hash === "#lab") router.replace("/lab");
  }, [router]);

  return null;
}

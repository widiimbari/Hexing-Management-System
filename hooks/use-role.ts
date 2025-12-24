"use client";

import { useEffect, useState } from "react";

export type Role = "admin" | "spv" | "user" | null;

export function useRole() {
  const [role, setRole] = useState<Role>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRole() {
      try {
        const res = await fetch("/api/auth/me");
        if (res.ok) {
          const data = await res.json();
          setRole(data.role);
        }
      } catch (error) {
        console.error("Failed to fetch role", error);
      } finally {
        setLoading(false);
      }
    }
    fetchRole();
  }, []);

  return { role, loading };
}

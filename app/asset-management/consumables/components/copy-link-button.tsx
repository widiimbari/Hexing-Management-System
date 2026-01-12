"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, Copy } from "lucide-react";

export function CopyLinkButton({ url }: { url: string | null | undefined }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent row click
    if (!url) return;
    
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!url) return <span className="text-muted-foreground text-xs">-</span>;

  return (
    <Button
      variant="ghost"
      size="icon"
      className="h-8 w-8 hover:bg-slate-100"
      onClick={handleCopy}
      title={copied ? "Copied!" : "Copy Link"}
    >
      {copied ? (
        <Check className="h-4 w-4 text-emerald-600" />
      ) : (
        <Copy className="h-4 w-4 text-blue-600" />
      )}
    </Button>
  );
}
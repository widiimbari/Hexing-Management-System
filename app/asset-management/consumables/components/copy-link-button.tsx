"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, Copy } from "lucide-react";

export function CopyLinkButton({ url }: { url: string | null | undefined }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent row click
    if (!url) return;
    
    try {
        // Check if Clipboard API is supported
        if (navigator.clipboard && navigator.clipboard.writeText) {
            await navigator.clipboard.writeText(url);
        } else {
            // Fallback for non-secure contexts (http)
            const textArea = document.createElement("textarea");
            textArea.value = url;
            textArea.style.position = "fixed"; // Avoid scrolling to bottom
            textArea.style.left = "-9999px";
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            
            try {
                document.execCommand('copy');
            } catch (err) {
                console.error('Fallback: Oops, unable to copy', err);
            }
            
            document.body.removeChild(textArea);
        }
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    } catch (err) {
        console.error("Failed to copy:", err);
    }
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

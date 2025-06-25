"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

// Dynamically import SwaggerUI to avoid SSR issues
const SwaggerUIComponent = dynamic(
  () => import("swagger-ui-react").then((mod) => mod.default),
  {
    ssr: false,
    loading: () => <div>Chargement de la documentation API...</div>,
  }
);

interface SwaggerUIProps {
  spec: object | string;
  title?: string;
}

export default function SwaggerUI({ spec, title }: SwaggerUIProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // Add CSS link dynamically to avoid SSR issues
    if (!document.querySelector('link[href*="swagger-ui"]')) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "/swagger-ui.css";
      document.head.appendChild(link);
    }
  }, []);

  if (!isClient) {
    return (
      <div className="swagger-container">
        {title && <h2>{title}</h2>}
        <div>Chargement de la documentation API...</div>
      </div>
    );
  }

  return (
    <div className="swagger-container">
      {title && <h2>{title}</h2>}
      <SwaggerUIComponent spec={spec} />
    </div>
  );
}

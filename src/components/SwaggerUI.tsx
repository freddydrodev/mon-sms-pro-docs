import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";

interface SwaggerUIProps {
  spec: object | string;
  title?: string;
}

export default function SwaggerUIComponent({ spec, title }: SwaggerUIProps) {
  return (
    <div className="swagger-container">
      {title && <h2>{title}</h2>}
      <SwaggerUI spec={spec} />
    </div>
  );
}

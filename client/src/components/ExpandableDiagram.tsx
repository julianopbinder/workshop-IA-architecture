import { type KeyboardEvent, type ReactNode, useState } from "react";
import { Maximize2, X } from "lucide-react";

type ExpandableDiagramProps = {
  children: ReactNode;
  className?: string;
  label: string;
};

// Permite ampliar diagramas construídos em HTML usando o mesmo padrão visual das imagens do site.
export function ExpandableDiagram({ children, className = "", label }: ExpandableDiagramProps) {
  const [aberto, setAberto] = useState(false);

  // Mantém o diagrama acessível também para quem navega pelo teclado.
  function abrirComTeclado(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setAberto(true);
    }
  }

  return <>
    <div className={`expandable-diagram ${className}`} role="button" tabIndex={0} aria-label={label} onClick={() => setAberto(true)} onKeyDown={abrirComTeclado}>
      {children}
      <span className="expandable-diagram-hint"><Maximize2 size={14} /> CLIQUE PARA AMPLIAR</span>
    </div>
    {aberto && <div className="image-lightbox diagram-lightbox" role="dialog" aria-modal="true" aria-label={`${label} ampliado`} onClick={() => setAberto(false)}>
      <button type="button" className="lightbox-close" onClick={() => setAberto(false)} aria-label="Fechar diagrama ampliado"><X size={20} /></button>
      <div className="diagram-lightbox-content" onClick={(event) => event.stopPropagation()}>{children}</div>
    </div>}
  </>;
}

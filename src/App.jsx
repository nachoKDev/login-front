import { useState } from "react";

const features = [
  "Vite + React listo para desarrollo local",
  "Construcción de producción con Docker multi-stage y NGINX",
  "Listo para usar como plantilla en Backstage",
];

export default function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="app">
      <header className="hero">
        <h1>react-template</h1>
        <p>Plantilla rápida para arrancar proyectos React con Vite.</p>
        <div className="actions">
          <button type="button" onClick={() => setCount((c) => c + 1)}>
            Contador: {count}
          </button>
          <a className="link" href="https://vitejs.dev/guide/" target="_blank" rel="noreferrer">
            Guía de Vite
          </a>
        </div>
      </header>
      <section className="grid">
        {features.map((item) => (
          <article key={item} className="card">
            <h2>{item.split(" ")[0]}</h2>
            <p>{item}</p>
          </article>
        ))}
      </section>
    </div>
  );
}

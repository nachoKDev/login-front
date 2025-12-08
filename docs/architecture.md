# Arquitectura

- **Vite** como herramienta de bundling y desarrollo rápido.
- **React 18** para la UI.
- **ESLint + Prettier** para calidad de código.
- **Dockerfile multi-stage**: compila la app con Node 20 y sirve el artefacto con NGINX.
- **NGINX** configurado para servir la SPA y manejar rutas con `try_files`.
- **docker-compose** para orquestar el contenedor de la aplicación.

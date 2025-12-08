# react-template

Plantilla React + Vite lista para desarrollo local y despliegue en producción con Docker multi-stage y NGINX.

## Requisitos
- Node.js >= 20
- npm >= 10
- Docker y Docker Compose

## Uso básico
```bash
npm install
npm run dev
npm run build
npm run preview
```

### Docker
```bash
docker compose build
docker compose up -d
docker compose down
```

## Scripts disponibles
- `npm run dev`: servidor de desarrollo Vite.
- `npm run build`: compilación de producción.
- `npm run preview`: sirve el build generado.
- `npm run lint`: linting con ESLint.

## Estructura
```
react-template/
+-- catalog-info.yaml
+-- README.md
+-- package.json
+-- vite.config.js
+-- index.html
+-- Dockerfile
+-- docker-compose.yml
+-- nginx.conf
+-- .dockerignore
+-- .gitignore
+-- .eslintrc.cjs
+-- .prettierrc
+-- src/
¦   +-- main.jsx
¦   +-- App.jsx
¦   +-- styles.css
+-- docs/
    +-- index.md
    +-- architecture.md
    +-- local-dev.md
```

## Backstage
Incluye `catalog-info.yaml` y documentación en `docs/` para integrarlo como plantilla en Backstage.

# Desarrollo local

## Requisitos
- Node.js >= 20
- npm >= 10

## Pasos
1. Instala dependencias:
   ```bash
   npm install
   ```
2. Levanta el entorno de desarrollo:
   ```bash
   npm run dev
   ```
3. Lint opcional:
   ```bash
   npm run lint
   ```
4. Build de produccion:
   ```bash
   npm run build
   ```

## Docker
- Construye y levanta la app en modo produccion:
  ```bash
  docker compose build
  docker compose up -d
  ```
- Deton y limpia:
  ```bash
  docker compose down
  ```

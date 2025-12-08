FROM node:20-bullseye-slim AS builder
WORKDIR /app
COPY package*.json ./
RUN --mount=type=cache,target=/root/.npm \
  npm install --legacy-peer-deps --no-audit --progress=false --fund=false \
    --registry=https://registry.npmjs.org --fetch-retries=3 --fetch-timeout=60000
COPY . .
RUN npm run build

FROM nginx:1.27-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

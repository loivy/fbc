# Build from the repo root: docker build -f server/Dockerfile .
FROM node:20-slim AS build
WORKDIR /app
COPY package.json ./
COPY server/package.json server/
RUN npm install --workspace server --include-workspace-root=false
COPY server server
RUN npm run build --workspace server

FROM node:20-slim
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /app/server/package.json ./
COPY --from=build /app/server/node_modules ./node_modules
COPY --from=build /app/server/dist ./dist

# Cloud Run injects PORT; the app reads it via env.ts (defaults to 8080).
EXPOSE 8080
CMD ["node", "dist/index.js"]

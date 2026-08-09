# Build from the repo root: docker build -f server/Dockerfile .
FROM node:20-slim AS build
WORKDIR /app
COPY server/package.json ./
RUN npm install
COPY server/tsconfig.json ./
COPY server/src ./src
RUN npm run build

FROM node:20-slim
WORKDIR /app
ENV NODE_ENV=production
COPY server/package.json ./
RUN npm install --omit=dev && npm cache clean --force
COPY --from=build /app/dist ./dist

# Cloud Run injects PORT; the app reads it via env.ts (defaults to 8080).
EXPOSE 8080
CMD ["node", "dist/index.js"]

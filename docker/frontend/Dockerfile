FROM node:20-alpine

WORKDIR /app

COPY ./turbo.json ./ 
COPY ./pnpm-workspace.yaml ./ 
COPY ./pnpm-lock.yaml ./ 
COPY ./package.json ./ 

COPY ./apps/frontend ./apps/frontend
COPY ./packages ./packages

RUN corepack enable && pnpm install --frozen-lockfile

WORKDIR /app/apps/frontend

ARG NEXT_PUBLIC_BACKEND_URL
ARG NEXT_PUBLIC_WS_URL

ENV NEXT_PUBLIC_BACKEND_URL=$NEXT_PUBLIC_BACKEND_URL
ENV NEXT_PUBLIC_WS_URL=$NEXT_PUBLIC_WS_URL

RUN pnpm build

EXPOSE 3000

CMD ["pnpm", "start"]

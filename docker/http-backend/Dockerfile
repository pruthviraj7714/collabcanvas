FROM node:20-alpine

WORKDIR /usr/src/app

COPY ./pnpm-lock.yaml ./
COPY ./turbo.json ./
COPY ./package.json .
COPY pnpm-workspace.yaml ./

COPY ./packages ./packages
COPY ./apps/http-backend ./apps/http-backend

RUN corepack enable && pnpm install --frozen-lockfile

EXPOSE 3000

WORKDIR /usr/src/app/apps/http-backend

RUN pnpm --filter=http-backend run build

CMD ["pnpm", "start"]
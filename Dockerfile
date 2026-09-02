FROM node:22-alpine

WORKDIR /app

RUN corepack enable && corepack prepare pnpm@latest --activate

COPY package.json pnpm-lock.yaml ./

RUN sed -i 's/"pnpm@\^\([^"]*\)"/"pnpm@\1"/g' package.json

RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm exec prisma generate

RUN pnpm run build

EXPOSE 5000
CMD ["pnpm", "start"]

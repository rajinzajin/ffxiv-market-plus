# FROM node:18.13.0-bullseye

# WORKDIR /app

# RUN npm install -g pnpm
# COPY package.json pnpm-lock.yaml ./
# RUN pnpm install

# COPY . ./
# EXPOSE 5173

# CMD [ "pnpm", "dev" ]

FROM node:18-alpine

WORKDIR /app

COPY . .
RUN npm install -g pnpm
COPY package.json pnpm-lock.yaml ./
RUN pnpm install

RUN pnpm run build
# RUN npm prune --production # Remove dev dependencies

EXPOSE 5173
ENV HOST=0.0.0.0

CMD [ "pnpm", "dev", "--host" ]
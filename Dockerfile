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
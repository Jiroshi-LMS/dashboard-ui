
FROM node:20-bullseye
WORKDIR /app

RUN corepack enable

# Copy package files first for caching
COPY package.json pnpm-lock.yaml ./

# Install deps (Linux-native)
RUN pnpm install

# Now copy the source
COPY . .

EXPOSE 3000
CMD ["pnpm", "dev"]


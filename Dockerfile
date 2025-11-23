
FROM node:20-alpine

# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat

WORKDIR /app

# Enable pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy package files first for caching
COPY package.json pnpm-lock.yaml ./

# Install deps
RUN pnpm install

# Now copy the source
COPY . .

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry during the build.
# ENV NEXT_TELEMETRY_DISABLED 1

# Set host to 0.0.0.0 to allow external access
ENV HOSTNAME "0.0.0.0"

EXPOSE 3000

CMD ["pnpm", "dev"]

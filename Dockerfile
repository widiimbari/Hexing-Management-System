# Stage 1: Dependencies
FROM node:20-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

# Stage 2: Builder
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Environment variables must be present for Prisma to generate clients
# during the build phase if they are used in the schema
ARG MANAGEMENT_DATABASE_URL
ARG ASSET_DATABASE_URL
ARG INVENTORY_DATABASE_URL
ARG WAREHOUSE_DATABASE_URL
ARG JWT_SECRET

# Set these as ENV for the build process
ENV MANAGEMENT_DATABASE_URL=$MANAGEMENT_DATABASE_URL
ENV ASSET_DATABASE_URL=$ASSET_DATABASE_URL
ENV INVENTORY_DATABASE_URL=$INVENTORY_DATABASE_URL
ENV WAREHOUSE_DATABASE_URL=$WAREHOUSE_DATABASE_URL
ENV JWT_SECRET=$JWT_SECRET
ENV NEXT_TELEMETRY_DISABLED 1

# Generate all Prisma Clients
RUN npx prisma generate --schema=prisma/management.prisma
RUN npx prisma generate --schema=prisma/assets.prisma
RUN npx prisma generate --schema=prisma/inventory.prisma
RUN npx prisma generate --schema=prisma/warehouse.prisma

# Build the application
RUN npm run build

# Stage 3: Runner
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/generated ./generated

USER nextjs

EXPOSE 3000
ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]

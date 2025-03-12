
FROM node:20-alpine as build

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm ci

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM node:20-alpine as production

WORKDIR /app

# Copy built assets and necessary files
COPY --from=build /app/dist ./dist
COPY --from=build /app/package*.json ./
COPY --from=build /app/migrations ./migrations

# Install production dependencies only
RUN npm ci --production

# Set environment to production
ENV NODE_ENV=production

# Expose the application port
EXPOSE 5000

# Start the server
CMD ["node", "dist/index.js"]

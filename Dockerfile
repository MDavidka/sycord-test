FROM node:20-slim AS base
WORKDIR /app

# Install dependencies first to leverage Docker layer caching
COPY package.json package-lock.json* ./
RUN npm install --no-audit --no-fund

# Copy the rest of the application files
COPY . .

# Disable Next.js telemetry during build
ENV NEXT_TELEMETRY_DISABLED=1

# Build the Next.js project
RUN npm run build

# Set environment variables for production
ENV NODE_ENV=production
ENV PORT=3000
ENV HOST=0.0.0.0

# Expose the port Next.js runs on
EXPOSE 3000

# Start the Next.js production server
CMD ["npm", "run", "start"]
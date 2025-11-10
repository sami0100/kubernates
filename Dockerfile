FROM node:18-alpine

WORKDIR /app

# Install only production deps
COPY package*.json ./
RUN npm ci --only=production

# Copy source
COPY src ./src

ENV PORT=3000
EXPOSE 3000

CMD ["node", "src/server.js"]
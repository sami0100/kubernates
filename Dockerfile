FROM node:18-alpine

WORKDIR /app

# Install only production deps
COPY package*.json ./
RUN if [ -f package-lock.json ]; then \
      npm ci --omit=dev; \
    else \
      npm install --omit=dev; \
    fi

# Copy source
COPY src ./src

ENV PORT=3000
EXPOSE 3000

CMD ["node", "src/server.js"]
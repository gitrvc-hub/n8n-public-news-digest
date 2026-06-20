FROM node:20-alpine
WORKDIR /app

COPY package.json ./
COPY index.html ./
COPY README.md ./
COPY app ./app
COPY assets ./assets
COPY docs ./docs
COPY workflow ./workflow
COPY sample-data ./sample-data
COPY server ./server

ENV NODE_ENV=production
ENV PORT=3000
EXPOSE 3000

CMD ["node", "server/index.js"]

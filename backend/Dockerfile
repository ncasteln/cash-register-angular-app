FROM node:18

ARG NODE_ENV=development
ENV NODE_ENV=$NODE_ENV

WORKDIR /app

COPY package*.json ./

RUN npm install --legacy-peer-deps

COPY . .

# Build TypeScript -> JavaScript
RUN npm run build

EXPOSE 5000

CMD ["npm", "run", "start:prod"]

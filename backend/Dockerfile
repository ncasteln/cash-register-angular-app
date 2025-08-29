FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install --legacy-peer-deps

COPY . .

# Build TypeScript -> JavaScript
RUN npm run build

EXPOSE 5000

CMD ["npm", "run", "start:prod"]

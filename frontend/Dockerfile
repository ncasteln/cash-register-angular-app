# FROM node:18-alpine

# WORKDIR /usr/src/app

# COPY package*.json ./
# RUN npm install --legacy-peer-deps

# COPY . .

# RUN npm install -g @angular/cli
# RUN ng build

# EXPOSE 4200

# CMD ["ng", "serve", "--host", "0.0.0.0"]
# # CMD ["npm", "run", "start", "--host", "0.0.0.0"]

# Stage 1: Build Angular app
FROM node:18 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install --legacy-peer-deps
COPY . .
RUN npm run build --prod

# Stage 2: Serve Angular with Nginx
FROM nginx:alpine
COPY --from=build /app/dist/frontend /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

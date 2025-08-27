# Stage 1: Build Angular app
FROM node:18 AS build

# create folder /app where are installed the deps
WORKDIR /app
COPY package*.json ./
RUN npm install --legacy-peer-deps

# the content is actually copied
COPY . .

# doesn't work properly; --configuration=production --configuration production --prod
# the problem lies here:
# chat gpt said to use npx because angular-cli is not installed globally, and this use it locally
# but this doest work properly
# RUN npx run build-prod OR npm run build-prod

# Stage 2: Serve Angular with Nginx
# FROM nginx:alpine
# COPY --from=build /app/dist/cash-register-angular-app /usr/share/nginx/html
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]

CMD ["tail", "-f", "/dev/null"]

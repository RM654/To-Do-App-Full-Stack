# ---------- Build Stage ----------
FROM node:18-slim as build

WORKDIR /app

# Copy dependency files
COPY package.json yarn.lock ./

# Install dependencies using Yarn
RUN yarn install

# Copy the rest of the frontend app
COPY . .

# Build the frontend app
RUN yarn build

# ---------- Serve Stage ----------
FROM nginx:stable-alpine

# Copy custom nginx config to proxy /api to backend
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy build output from previous stage
COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

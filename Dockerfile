# FROM node:18-alpine AS builder
# WORKDIR /usr/src/app
# COPY package*.json ./
# RUN npm cache clean --force
# RUN npm ci
# COPY . .
# RUN npm run build

# # Stage 2: Run the application
# FROM node:18-alpine
# WORKDIR /usr/src/app
# COPY --from=builder /usr/src/app ./
# EXPOSE 4000
# CMD npm run typeorm migration:run && npm start

# Stage 1: Build the application
FROM node:18-alpine AS builder
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm cache clean --force
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: Run the application
FROM node:18-alpine
WORKDIR /usr/src/app
COPY --from=builder /usr/src/app ./
EXPOSE 4000
CMD ["npm", "run", "start"]
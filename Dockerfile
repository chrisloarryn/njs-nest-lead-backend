# Etapa 1: Construcción de la aplicación
FROM node:alpine AS builder

WORKDIR /usr/app

COPY package.json pnpm-lock.yaml ./

# Instala las dependencias y luego elimina los archivos de caché para reducir el tamaño de la imagen
RUN npm install -g pnpm && pnpm install --frozen-lockfile && pnpm pnpm prune --prod && rm -rf /root/.npm

COPY . .

# Construye la aplicación
RUN pnpm build



# Etapa 2: Imagen de producción
FROM node:alpine

ARG GOOGLE_CLOUD_JSON

WORKDIR /usr/app

# Copia los archivos de la etapa de construcción
COPY --from=builder /usr/app/dist ./dist
COPY --from=builder /usr/app/node_modules ./node_modules
COPY --from=builder /usr/app/package*.json ./

# Variables de entorno
ARG PORT
ARG NODE_ENV
ARG LOG_LEVEL
ARG GLOBAL_PREFIXL
ARG SWAGGER_NAME
ARG SWAGGER_DESCRIPTION
ARG SWAGGER_VERSION
ARG SWAGGER_CONTACT_NAME
ARG SWAGGER_CONTACT_EMAIL
ARG SWAGGER_URL

ENV PORT=${PORT}
ENV NODE_ENV=${NODE_ENV}
ENV LOG_LEVEL=${LOG_LEVEL}
ENV GLOBAL_PREFIX=${GLOBAL_PREFIX}
ENV SWAGGER_NAME=${SWAGGER_NAME}
ENV SWAGGER_DESCRIPTION=${SWAGGER_DESCRIPTION}
ENV SWAGGER_VERSION=${SWAGGER_VERSION}
ENV SWAGGER_CONTACT_NAME=${SWAGGER_CONTACT_NAME}
ENV SWAGGER_CONTACT_EMAIL=${SWAGGER_CONTACT_EMAIL}
ENV SWAGGER_URL=${SWAGGER_URL}

# Limpieza de caché
RUN rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

EXPOSE ${PORT}

ENTRYPOINT ["node", "dist/main"]

# Etapa 1: Construcción de la aplicación
FROM node:alpine AS builder

WORKDIR /usr/app

COPY package.json yarn.lock ./

# Instala las dependencias y luego elimina los archivos de caché
RUN pnpm install --frozen-lockfile --prefer-frozen-lockfile --no-optional --no-shrinkwrap --no-package-lock --no-bin-links --prod && \
    pnpm install --frozen-lockfile --prefer-frozen-lockfile --no-optional --no-shrinkwrap --no-package-lock --no-bin-links --only=dev && \
    pnpm run clean:cache

COPY . .

# Construye la aplicación
RUN pnpm build

# Etapa 2: Imagen de producción
FROM node:alpine

ARG GOOGLE_CLOUD_JSON

WORKDIR /usr/app

RUN mkdir -p /usr/app/config /usr/app/keys

# Si existe GOOGLE_CLOUD_JSON, copia el archivo service-account.json
COPY --from=builder /usr/app/config ./config

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

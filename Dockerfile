FROM node:lts-alpine3.19 As development

WORKDIR /app

#Copiar archivos de dependencias
COPY --chown=node:node package*.json ./

#Instalar dependencias
RUN npm ci --legacy-peer-deps

# Copiar el resto del proyecto
COPY --chown=node:node . .

# Usar el usuario node (No usar usuario root)
USER node

###################
# BUILD FOR PRODUCTION
###################

FROM node:lts-alpine3.19 As build

WORKDIR /app

COPY --chown=node:node package*.json ./

# Para ejecutar `npm run build`, es necesario Nest CLI, que es una dependencia de desarrollo. En la etapa de desarrollo anterior, se instaló dicha dependencia a través de `npm ci`, por lo cual se copiarán los node_modules de la etapa anterior
COPY --chown=node:node --from=development /app/node_modules ./node_modules

COPY --chown=node:node . .

#Cosntruir el proyecto
RUN npm run build:all

#Editar variable de entorno a 'producción'
ENV NODE_ENV production

# Ejecutar `npm ci` elimina el directorio node_modules existente y pasar --omit=dev asegura que solo se instalen las dependencias de producción. Esto asegura que el directorio node_modules esté lo más optimizado posible
RUN npm ci --legacy-peer-deps

USER node

###################
# PRODUCTION
###################

#Paso 2: Despliegue
FROM node:lts-alpine3.19

WORKDIR /app

# Copiar los archivos contruidos en el paso anterior de producción
COPY --chown=node:node --from=build /app/node_modules ./node_modules
COPY --chown=node:node --from=build /app/dist ./dist
COPY --chown=node:node --from=build /app/pm2.json .

#Despliegue en servidor de aplicaciones PM2
RUN npm install pm2 --location=global
CMD ["pm2-runtime", "pm2.json"]


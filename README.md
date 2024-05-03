<div align="center">
  <a href="http://nestjs.com/" target="_blank">
    <img src="https://nestjs.com/img/logo_text.svg" width="150" alt="Nest Logo" />
  </a>
</div>
<div align="center">
  <a href="https://nestjs.com" target="_blank">
    <img src="https://img.shields.io/badge/built%20with-NestJs-red.svg" alt="Built with NestJS">
  </a>
  <a href="https://nodejs.org/es/" target="_blank">
    <img src="https://img.shields.io/badge/node-%3E%3D%2016.13.1-blue" alt="node version">
  </a>
  <a href="https://nodejs.org/es/" target="_blank">
    <img src="https://img.shields.io/badge/npm-%3E%3D%208.1.2-blue" alt="npmversion">
  </a>
  <a href="https://nestjs.com" target="_blank">
    <img src="https://img.shields.io/badge/nestjs-8.0.0-blue" alt="nesjsversion">
  </a>
</div>


# Proyecto Microservicios para Blockchain voting system
**ESTADO**: ACTIVO
### Tabla de contenidos
1. [Actores](#actores)
2. [Fases del proyecto](#fases)
3. [Aspectos funcionales](#aspectos-funcionales)
4. [Aspectos técnicos](#aspectos-técnicos)
5. [Procedimiento de instalación](#procedimiento-de-instalación)
6. [Otros documentos](#otros-documentos)

## Actores
* **David Tacuri**
* **Luis Nuñez**
* **Juan Guanolema** 
## Fases
- [ ] Planificación
- [ ] Implementación
- [ ] Producción

### Objetivo:

Back-end de sistema de conteo de votos en blockchain

### A quien va dirigido:
Personal a cargo de votos

## Aspectos Técnicos

### Plataforma tecnológica
| Característica | Detalle |
| ------ | ------ |
| Tipo de aplicación | Microservicios Monorepo de Blockchain voting system |
| Framework de Desarrollo | NestJS - Express |
| Servidor de Aplicaciones | PM2 |
| Servidor de Base de Datos | CORNAC |
| Lenguaje de programación | NodeJS - TypeScript |

### Prerrequisitos

* Instalación de [NodeJs v16.13.1](https://nodejs.org/es/)
* Instalación de [NestJS v8.9](https://docs.nestjs.com/) (cli): `npm i -g @nestjs/cli`
* Instalación de [Instant Client](https://www.oracle.com/database/technologies/instant-client/downloads.html) (Conexión a base de datos Oracle).

## Instalación
* Clonar el repositorio
```bash
https://github.com/democracyonchain/asuncion-backend.git
```
* Instalar dependencias
```bash
npm install
```
### Ejecución de la aplicación
#### Modo desarrollo

```bash
# Una consola por aplicación
npm run start:dev api-gateway
npm run start:dev ms-administracion
```

#### Modo producción en un solo servidor
```bash
npm run build:all
npm run start:prod:all
```

#### Modo producción en 2 servidores uno para gateway y otro para micros (Usando PM2)
```bash
#En el servidor para Gateways
npm run build:gateway
npm run start:prod:gateway

#En el servidor para Microservicios
npm run build:microservices
npm run start:prod:microservices
```

### Ejecución de pruebas

```bash
# Pruebas unitarias 
npm run test

# Pruebas de cobertura
npm run test:cov
```

### Manuales para el despliegue en los diferentes ambientes: 
* Manual de Instalación para el Ambiente de Desarrollo
* Manual de Instalación para el Ambiente de Pruebas
* Manual de Instalación para el Ambiente de Producción

# Plataforma de Gestión de Incidentes Urbanos

Civix es una plataforma web full-stack que permite a los ciudadanos reportar 
incidentes urbanos (baches, luminarias rotas, veredas dañadas, etc.) y a los municipios gestionarlos 
de forma organizada, asignando cuadrillas y realizando seguimiento del estado.

Proyecto desarrollado como Práctica Profesional de la Tecnicatura Universitaria en Programación de la U.T.N F.R.C, con enfoque en arquitectura real, seguridad 
y experiencia de usuario.

El sistema permite:  
- Registro de incidentes por parte de los ciudadanos.  
- Clasificación de los reportes por la administración.  
- Asignación a cuadrillas o áreas de servicio.  
- Gestión de recursos y materiales necesarios para la resolución.  
- Seguimiento de tiempos de resolución.  
- Notificación automática al ciudadano sobre el estado del incidente.  
- Generación de métricas y reportes para la toma de decisiones.  

Este proyecto busca **mejorar la comunicación entre ciudadanos y la comuna**, optimizar 
la gestión interna de incidentes urbanos y ofrecer información valiosa para la planificación y 
la eficiencia en la prestación de servicios públicos.

---

## Seguridad

- Autenticación basada en JWT

- Control de acceso por roles

- Rutas protegidas tanto en frontend como backend

- Validación de tokens en cada request

## Arquitectura

- Backend desacoplado (API REST)

- Separación clara de responsabilidades

- Persistencia en base de datos

- Frontend totalmente responsive

## Tecnologías utilizadas
### Backend

- Java

- Spring Boot

- Spring Security

- JWT

- JPA / Hibernate

- PostgreSQL

### Frontend

- Angular

- Bootstrap 5

- HTML / CSS / TypeScript

## Infraestructura

- Docker

- Docker Compose

- Variables de entorno

- Deploy en entorno cloud


---

## Usuarios de prueba

Podés ingresar sin registrarte usando los siguientes perfiles:

**Ciudadano**

- Email: user@test.com

- Password: demo123

**Administrador**

- Email: admin@test.com

- Password: demo123

**Cuadrilla**

- Email: squad@test.com

- Password: demo123

**Cada rol tiene vistas y permisos diferentes.**

---

## Funcionalidades principales
### Ciudadano:
- Crear reportes de incidentes urbanos

- Ver el estado de sus reportes

- Acceso seguro con autenticación JWT

### Administrador:

- Ver todos los reportes

- Cambiar estados (Pendiente / En proceso / Resuelto)

- Asignar cuadrillas a reportes

- Gestionar inventario para llevar un control de los recursos

- Gestión general del sistema

### Supervisor de cuadrilla:

- Ver reportes asignados a sus cuadrillas

- Cambiar estado de los reportes indicando recursos utilizados si se resuelve este

- Ver cuadrillas a su cargo


## Mejoras futuras:
- Recuperación de contraseña vía email
- Notificaciones automáticas
- Historial detallado de cambios de estado

## Autor
**Rodrigo Nicolas Moran**

Desarrollador Full-Stack

Email: rodrigomoran143@gmail.com

Linkedin:

Github:



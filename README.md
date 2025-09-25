# Plataforma de Gestión de Incidentes Urbanos

Plataforma web desarrollada para una comuna, cuyo objetivo principal es brindar a los ciudadanos una herramienta intuitiva para **reportar incidentes urbanos** y permitir a la administración gestionar el ciclo completo de resolución.  

El sistema permite:  
- Registro de incidentes por parte de los ciudadanos.  
- Clasificación de los reportes por la administración.  
- Asignación a cuadrillas o áreas de servicio.  
- Gestión de recursos y materiales necesarios para la resolución.  
- Seguimiento de tiempos de resolución.  
- Notificación automática al ciudadano sobre el estado del incidente.  
- Generación de métricas y reportes para la toma de decisiones.  

Este proyecto busca **mejorar la comunicación entre ciudadanos y la comuna**, optimizar la gestión interna de incidentes urbanos y ofrecer información valiosa para la planificación y la eficiencia en la prestación de servicios públicos.

---

##  Tecnologías utilizadas
- **Frontend**: Angular + Bootstrap 5  
- **Backend**: Spring Boot (Java), Spring Cloud Gateway, Spring Security + JWT  
- **Base de datos**: PostgreSQL  
- **Contenedores**: Docker & Docker Compose  
- **Herramientas**: Maven, Git, Postman  

---

##  Instalación y ejecución
1. Clonar este repositorio:  
   ```bash
   git clone https://github.com/usuario/nombre-repo.git

2. Configurar las variables de entorno (DB, JWT, etc.).

3. Levantar los servicios con Docker Compose:

    docker-compose up --build

4. Acceder a la aplicación en:

    http://localhost:4200

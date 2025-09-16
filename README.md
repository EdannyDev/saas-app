# 🚀SaaS de KPIs - Frontend

## 📌Descripción
Este es el **frontend** del sistema **SaaS de KPIs y gestión de startups**, desarrollado con **Next.js y TypeScript**.  
Permite a usuarios y administradores gestionar métricas, startups y su progreso, con notificaciones y roles automáticos.

**Usuarios pueden:**  
- Ver y gestionar sus métricas asignadas.  
- Acceder al panel de su startup (tenant).  
- Resetear contraseña temporal mediante correo electrónico.  

**Administradores (globales) pueden:**  
- Gestionar startups (tenants), usuarios y métricas de todas las startups.  
- Recibir notificaciones de métricas importantes.  
- Asignar roles y permisos automáticamente según métricas.  

## 🛠️Tecnologías utilizadas

- **Next.js + TypeScript**  
- **Axios** (Consumo de API REST)  
- **Emotion Styled** (Estilos CSS-in-JS)  
- **FontAwesome** (Iconos)  
- **Yarn** (Gestión de paquetes)  
- **Jest + React Testing Library** (Testing)

## ⚙️Instalación y ejecución

```bash
# 1. Clonar el repositorio
git clone https://github.com/EdannyDev/saas-kpis-frontend.git

# 2. Instalar dependencias
yarn install

# 3. Ejecutar la aplicación
yarn dev

# 4. Abrir en el navegador
http://localhost:3000

```

## ✨Características principales
- Panel de métricas por startup.
- Gestión de usuarios y roles con autenticación y seguridad.
- Reset de contraseña vía correo Gmail/OAuth2.
- CRUD de métricas y tenants desde el frontend.
- Visualización de métricas valiosas y asignación de roles automática.

## 🔗Enlaces útiles
Backend: https://github.com/EdannyDev/backend-saas
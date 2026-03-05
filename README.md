📊 Portfolio de Inversiones

API REST desarrollada con ASP.NET Core Web API, Entity Framework Core y SQL Server, con un frontend en React para gestionar operaciones de inversión.

El objetivo del proyecto es permitir a un usuario registrar, consultar y administrar operaciones financieras como compra y venta de activos.

🚀 Tecnologías utilizadas
Backend
ASP.NET Core Web API
Entity Framework Core
SQL Server
JWT Authentication
LINQ

Frontend
React
Vite
JavaScript
CSS

Herramientas
Visual Studio Code
SQL Server Management Studio
Postman
Git / GitHub

🏗 Arquitectura del proyecto
El proyecto sigue una arquitectura cliente-servidor:
React (Frontend)
        │
        │ HTTP Requests (JSON)
        ▼
ASP.NET Core Web API (Backend)
        │
        │ Entity Framework Core
        ▼
SQL Server (Base de datos)

🔐 Autenticación
El sistema utiliza JWT (JSON Web Token) para autenticar usuarios.

Flujo:
El usuario realiza login
El backend valida las credenciales
Se genera un token JWT
El frontend guarda el token

Las requests protegidas incluyen:
Authorization: Bearer {token}

📂 Funcionalidades
Usuarios
Registro de usuario
Login
Autenticación mediante JWT
Operaciones
Crear operaciones de inversión
Consultar operaciones
Ordenar operaciones por fecha
Gestión de activos financieros

🗄 Base de datos
La base de datos se gestiona con Entity Framework Core (Code First).
Migraciones utilizadas para generar el esquema.
- Precio
- Comision
- FechaOperacion

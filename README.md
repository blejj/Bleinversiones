# 📊 Portfolio de Inversiones

API REST desarrollada con **ASP.NET Core Web API**, **Entity Framework Core** y **SQL Server**, con un **frontend en React** para gestionar operaciones de inversión.

El objetivo del proyecto es permitir a un usuario **registrar, consultar y administrar operaciones financieras** como compra y venta de activos.

---

# 🚀 Tecnologías utilizadas

## Backend
- C#
- ASP.NET Core Web API
- Entity Framework Core
- SQL Server
- JWT Authentication
- LINQ

## Frontend
- React
- Vite
- JavaScript
- CSS

## Herramientas
- Visual Studio Code
- SQL Server Management Studio
- Postman
- Git / GitHub

---

# 🏗 Arquitectura del proyecto

El proyecto sigue una arquitectura **cliente-servidor**:
React (Frontend) - HTTP Requests (JSON) -> ASP.NET Core Web API (Backend) - Entity Framework Core -> SQL Server (Base de datos).

---

# 🔐 Autenticación

El sistema utiliza **JWT (JSON Web Token)** para autenticar usuarios.

## Flujo de autenticación

1. El usuario realiza **login**
2. El backend valida las credenciales
3. Se genera un **token JWT**
4. El frontend guarda el token
5. Las requests protegidas incluyen el token en el header:
Authorization: Bearer {token}

# 📂 Funcionalidades

## 👤 Usuarios
- Registro de nuevos usuarios
- Inicio de sesión (login)
- Autenticación mediante **JWT**
- Protección de endpoints mediante token

## 💰 Operaciones de inversión
- Crear operaciones de inversión
- Consultar operaciones registradas
- Ordenar operaciones por fecha
- Gestión de activos financieros

---

# 🗄 Base de datos

La base de datos se gestiona utilizando **Entity Framework Core con enfoque Code First**, permitiendo generar el esquema automáticamente a partir de los modelos de la aplicación.

Se utilizan **migraciones** para crear y actualizar la estructura de la base de datos.

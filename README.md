# Sistema de Gestión de Recursos Humanos

Este proyecto es una aplicación web creada con **React** para la gestión de procesos de recursos humanos, incluyendo el control de requisiciones de personal, la administración de perfiles de candidatos y la gestión de usuarios del sistema.

---

## 🚀 Empezando
Estas instrucciones te guiarán para obtener una copia del proyecto en funcionamiento en tu máquina local para propósitos de desarrollo y pruebas.

---

## ✅ Prerrequisitos
Necesitarás tener **Node.js** y **npm** (o **pnpm**) instalados en tu sistema.

---

## ⚙️ Instalación

Clona el repositorio:

```bash
git clone https://URL-DE-TU-REPOSITORIO.git
cd NOMBRE-DEL-DIRECTORIO
```

Instala las dependencias del proyecto:

```bash
npm install
```

---

## 🧠 Configuración de la Base de Datos

Este proyecto utiliza **JSON Server** para simular una API REST.

**Crea un usuario administrador:**

Abre el archivo `db.json` que se encuentra en la raíz del proyecto y, dentro del array `users`, agrega el siguiente objeto para crear un usuario con permisos de administrador.

```json
{
  "users": [
    {
      "id": 1,
      "name": "Marcos Almonte",
      "password": "admin123",
      "email": "admin@dni.gob.do",
      "role": "admin",
      "status": 1,
      "createdAt": "2025-08-06"
    }
    // ... otros usuarios
  ],
  "requisitions": [
    // ...
  ],
  "candidateProfiles": [
    // ...
  ]
}
```

---

## ▶️ Ejecutando el Proyecto

**Inicia el servidor de la API (JSON Server):**

Para que la aplicación pueda consumir los datos, ejecuta el siguiente comando en tu terminal. Esto levantará un servidor en `http://localhost:3000`.

```bash
npx json-server db.json
```

**Inicia la aplicación de React:**

En una nueva terminal, ejecuta el siguiente comando para iniciar el servidor de desarrollo de **Vite**.

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`.

---

## ✨ Funcionalidades

El sistema cuenta con varios módulos clave para la gestión de recursos humanos.

### 🔐 Autenticación y Control de Acceso
- **Login de Usuario:** Formulario de inicio de sesión que valida las credenciales contra `db.json`.
- **Rutas Privadas:** Sistema de rutas protegidas que solo permite acceso a usuarios autenticados y restringe secciones como "Control de Acceso" a administradores.
- **Gestión de Contexto de Autenticación:** Estado global de autenticación con **AuthContext**.

### 👤 Gestión de Usuarios (Control de Acceso)
- **CRUD Usuarios:** Crear, leer, actualizar y eliminar usuarios.
- **Búsqueda y Filtro:** Búsqueda por nombre o correo.

### 📄 Gestión de Requisiciones
- **Creación de Solicitudes:** Formulario para solicitar nuevo personal con datos como departamento, puesto, cantidad y perfil.
- **Listado y Búsqueda:** Lista paginada con filtros.
- **Visualización y Descarga:** Vista para imprimir y simular descarga PDF.

### 👨‍💼 Perfiles de Candidatos
- **Registro de CV:** Formulario con datos personales, experiencia, educación, habilidades, certificaciones y referencias.
- **Gestión de Perfiles:** Visualización en tarjetas, búsqueda y modal de detalles.
- **Manejo de Datos:** Uso de **CandidateProfileContext**.

---

## 📂 Estructura del Proyecto

```
src/
  components/
    Auth/           # Componentes de autenticación
    Form/           # Componentes de formulario
    Layout/         # Header, Sidebar y Layout general
    PrivateRoute.tsx
  context/
    AuthContext.tsx
    DataContext.tsx
    CandidateProfileContext.tsx
    AppProvider.tsx
  pages/            # Páginas principales (Dashboard, UserManagement, etc.)
  types/            # Interfaces de TypeScript
  data/             # Datos estáticos
  App.tsx           # Rutas principales
  main.tsx          # Punto de entrada
```

---

## 📌 Notas
- Se utiliza **react-router-dom** para el manejo de rutas.
- Se recomienda mantener actualizadas las dependencias para evitar problemas de seguridad.

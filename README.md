<div align="center">

# Viera's Coffee — Sistema Gestor de Cafetería

Sistema web para la gestión integral de cafeterías: pedidos por mesa, control de stock, ventas, reportes y generación de tickets PDF.

**Laravel 13 · React 19 · Inertia.js v3 · SQLite · Tailwind CSS v4**

[Documentación del Diseño](DESIGN.md)

</div>

---

## Tabla de Contenidos

- [Descripción](#descripción)
- [Requerimientos del Sistema](#requerimientos-del-sistema)
- [Tecnologías Utilizadas](#tecnologías-utilizadas)
- [Arquitectura](#arquitectura)
- [Funcionalidades](#funcionalidades)
- [Instalación y Puesta en Marcha](#instalación-y-puesta-en-marcha)
- [Usuario por Defecto](#usuario-por-defecto)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Tests](#tests)
- [Ciclo de Vida](#ciclo-de-vida)

---

## Descripción

**Viera's Coffee** es un sistema orientado a cafeterías en el que los **vendedores** registran pedidos solicitados en cada mesa, generan facturas o cancelan pedidos. Por otro lado, el **gerente** puede visualizar reportes de stock y ventas, y administrar productos y usuarios del sistema.

### Mejoras Aplicadas

- **Rendimiento:** Migración a SQLite local, eliminando la latencia del servidor gratuito anterior.
- **Seguridad:** Cifrado de contraseñas mediante Laravel Fortify.
- **Reportes mejorados:** Filtros por período de tiempo (día, mes, rango personalizado), ventas por producto, métodos de pago, y comparativa stock actual vs. stock de reposición (top 10 productos).
- **Paginación y búsqueda:** Tablas paginadas con barras de búsqueda en listados y al realizar pedidos.
- **Generación de PDF:** Tickets de venta funcionales sin bloquear nuevas operaciones en la mesa.
- **Tiempo real:** Actualización del estado de mesas en segundos entre distintos usuarios mediante Laravel Reverb.
- **Tests unitarios:** Cobertura sobre formularios de ingreso/modificación, control de stock y actualización de datos.

---

## Requerimientos del Sistema

- ABMC de pedidos.
- ABM de usuarios.
- ABM de productos.
- Listado de usuarios inhabilitados.
- Listado de productos con stock.
- Reporte de stock de productos.
- Reporte de ventas con filtros por período.
- Emitir ticket de venta en PDF.
- Actualización en tiempo real del estado de mesas.

---

## Tecnologías Utilizadas

| Tecnología | Versión | Propósito |
|---|---|---|
| **Laravel** | 13 | Framework PHP para el backend |
| **React** | 19 | Librería UI para el frontend |
| **Inertia.js** | 3 | Monolito que conecta backend y frontend (SPA con SSR) |
| **SQLite** | — | Base de datos local |
| **Laravel Reverb** | 1 | WebSockets para actualizaciones en tiempo real |
| **Laravel Fortify** | 1 | Autenticación (login, registro, 2FA, verificación email) |
| **Laravel Wayfinder** | — | Tipado TypeScript para rutas Laravel |
| **Laravel DomPDF** | — | Generación de tickets PDF |
| **Tailwind CSS** | 4 | Estilos utilitarios |
| **Radix UI** | — | Primitivas de interfaz accesibles |
| **TanStack Table** | — | Tablas de datos con paginación y búsqueda |
| **Recharts** | — | Gráficos de reportes |
| **Pest** | 4 | Tests unitarios y de funcionalidad |
| **Laravel Pint** | 1 | Formateo de código PHP |

---

## Arquitectura

El sistema sigue una arquitectura monolítica moderna con **Laravel** en el backend y **React** renderizado del lado del cliente mediante **Inertia.js v3**:

```
Cliente (React)  ←→  Inertia.js  ←→  Laravel (Controladores)
                      ↕
               SQLite (Base de datos)
```

### Patrón State

Las mesas implementan el patrón **State** con dos estados:

- `MesaLibre` — permite asignar pedidos.
- `MesaOcupada` — bloquea nuevos pedidos hasta liberar la mesa.

### Eventos en Tiempo Real

- `MesaActualizada` — broadcast en canal `mesas` con evento `mesa.actualizada`.
- `StockActualizado` — broadcast en canal `stock` con evento `stock.actualizado`.

Ambos eventos se replican entre todos los clientes conectados mediante Laravel Reverb + Laravel Echo.

---

## Funcionalidades

### Gestión de Mesas
- ABM de mesas con capacidad.
- Visualización del estado en tiempo real (libre / ocupada).
- Asignación de pedidos por mesa.

### Gestión de Pedidos
- Creación, modificación y cancelación de pedidos.
- Búsqueda de productos al armar un pedido.
- Actualización automática del stock al confirmar/cancelar.

### Gestión de Ventas
- Finalización de pedidos con selección de método de pago.
- Aplicación de descuento según método de pago.
- Generación de ticket PDF descargable.
- Liberación automática de la mesa tras el cobro.

### Gestión de Productos
- ABM con categorías, precio y stock.
- Baja lógica (desactivación sin eliminar).
- Control de stock mínimo para reposición.

### Gestión de Usuarios
- ABM con roles (admin / vendedor).
- Baja lógica con registro de causa.
- Listado de usuarios inhabilitados.
- Autenticación con Fortify: registro, login, verificación de email, 2FA, recuperación de contraseña.

### Reportes
- Ventas por período (día, mes, rango personalizado).
- Productos más vendidos.
- Ventas por método de pago.
- Comparativa stock actual vs. stock de reposición (top 10).

### Perfil y Configuración
- Edición de perfil.
- Cambio de contraseña.
- Configuración de apariencia (tema claro/oscuro).
- Gestión de autenticación de dos factores (2FA).

---

## Instalación y Puesta en Marcha

### Requisitos

- PHP 8.5+
- Composer
- Node.js 22+
- pnpm

### Pasos

```bash
# Clonar el repositorio
git clone https://github.com/daniace/sistema-gestor-cafeteria.git
cd sistema-gestor-cafeteria

# Instalar dependencias de PHP
composer install

# Instalar dependencias de Node.js
pnpm install

# Copiar archivo de entorno y generar clave
cp .env.example .env
php artisan key:generate

# Ejecutar migraciones y seeders (crea la base de datos SQLite)
php artisan migrate --seed

# (Opcional) Generar rutas tipadas para TypeScript
php artisan wayfinder:generate

# Iniciar el servidor de desarrollo
composer run dev
```

Esto inicia simultáneamente:
- Servidor HTTP de Laravel (`php artisan serve`)
- Servidor de desarrollo de Vite (`pnpm run dev`)
- Servidor de Laravel Reverb (WebSockets)

Abrir `http://localhost:8000` en el navegador.

---

## Usuario por Defecto

El seeder crea un usuario administrador:

| Campo | Valor |
|---|---|
| Email | `admin@example.com` |
| Contraseña | `password` |

---

## Estructura del Proyecto

```
├── app/
│   ├── Actions/              # Acciones de Fortify
│   ├── Events/               # Eventos (MesaActualizada, StockActualizado)
│   ├── Http/
│   │   ├── Controllers/      # Controladores (Mesa, Pedido, Producto, Venta, User, Report)
│   │   ├── Middleware/        # CheckRole, HandleInertiaRequests, HandleAppearance
│   │   └── Requests/         # Form Requests con validación
│   ├── Models/               # Eloquent Models (User, Mesa, Pedido, Producto, Venta, etc.)
│   ├── Policies/             # Políticas de autorización
│   └── States/Mesa/          # Patrón State (MesaLibre, MesaOcupada)
├── config/                   # Configuración de Laravel
├── database/
│   ├── factories/            # 6 factories
│   ├── migrations/           # 15 migraciones
│   └── seeders/              # 9 seeders
├── resources/js/
│   ├── actions/              # Wayfinder (rutas tipadas)
│   ├── components/           # Componentes React reutilizables
│   ├── hooks/                # Custom hooks (appearance, 2FA, clipboard, etc.)
│   ├── layouts/              # Layouts (app-layout, auth-layout, settings)
│   ├── pages/                # Páginas Inertia (auth, inicio, mesas, productos, etc.)
│   ├── routes/               # Wayfinder (nombres de rutas)
│   └── types/                # Tipos TypeScript
├── routes/
│   ├── web.php               # Rutas web principales
│   ├── settings.php          # Rutas de configuración de perfil
│   └── channels.php          # Canales de broadcasting
├── tests/                    # Tests con Pest
├── DESIGN.md                 # Documentación del sistema de diseño
└── AGENTS.md                 # Guías para asistentes de IA
```

---

## Tests

El proyecto utiliza **Pest** para testing. Los tests cubren:

- Formularios de ingreso y modificación de datos.
- Control de stock y actualizaciones.
- Liberación de mesas y flujo completo de pedido → venta → ticket.

```bash
# Ejecutar todos los tests
php artisan test --compact

# Ejecutar un test específico
php artisan test --compact --filter=nombre_del_test
```

---

## Ciclo de Vida

El sistema se desarrolló utilizando un ciclo de vida **iterativo e incremental**, permitiendo agregar funcionalidades de forma progresiva y corregir errores detectados en iteraciones anteriores.

---

## Licencia

Este proyecto fue desarrollado como parte del curso de Ingeniería de Software — UTN FRBA.

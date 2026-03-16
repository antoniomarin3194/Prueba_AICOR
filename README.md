# AICOR - Backend (Laravel API)

API de e-commerce para productos, carrito, pedidos y panel de administración.

## Requisitos

- PHP `^8.2`
- Composer
- Node.js `18+` y npm
- Base de datos MySQL/MariaDB (o SQLite para local)

## Instalación (backend)

1. Entrar en la carpeta del backend:

	```bash
	cd aicor_backend
	```

2. Instalar dependencias PHP y JS:

	```bash
	composer install
	npm install
	```

3. Crear archivo de entorno:

	```bash
	cp .env.example .env
	```

	En Windows PowerShell si `cp` no funciona:

	```powershell
	Copy-Item .env.example .env
	```

4. Generar claves:

	```bash
	php artisan key:generate
	php artisan jwt:secret
	```

5. Configurar base de datos en `.env` y ejecutar migraciones + seeders:

	```bash
	php artisan migrate --seed
	```

## Variables de entorno importantes

- `APP_URL` (ejemplo: `http://localhost:8000`)
- `DB_CONNECTION`, `DB_HOST`, `DB_PORT`, `DB_DATABASE`, `DB_USERNAME`, `DB_PASSWORD`
- `JWT_SECRET` (se genera con `php artisan jwt:secret`)
- `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `GOOGLE_REDIRECT_URI` 

> Nota: en cada equipo nuevo debes configurar de nuevo las variables de Google en el `.env` local.
> La URI de callback debe coincidir con la autorizada en Google Cloud Console (por ejemplo: `http://localhost:8000/api/auth/google/callback`).

## Ejecución en desarrollo

Servidor API:

```bash
php artisan serve
```

Compilación de assets de Laravel (si aplica):

```bash
npm run dev
```

Comando combinado disponible en el proyecto:

```bash
composer run dev
```

## Frontend React 

El frontend está en la carpeta hermana `../aicor_frontend`.

1. Abrir otra terminal y entrar en la carpeta:

	```bash
	cd ../aicor_frontend
	npm install
	npm run dev
	```

2. Por defecto, el frontend consume la API en `http://localhost:8000`.

## Uso rápido

- Productos públicos: `GET /api/products`
- Login admin: `POST /api/admin/login`
- Rutas admin protegidas con `auth:api` + middleware `admin`
- Carrito y pedidos protegidos con `auth:api`

Consulta las rutas en `routes/api.php` para el detalle completo.

## Credenciales de prueba

Se crea un admin por seeder:

- Email: `admin@aicor.com`
- Password: `1234`

## Tests

```bash
php artisan test
```

## Documentación Swagger (OpenAPI)

La API está documentada con **L5-Swagger**.

### Rutas de documentación

- UI Swagger: `GET /api/documentation`
- JSON OpenAPI: `GET /docs`

### Regenerar documentación

Ejecutar este comando cuando se cambien endpoints:

php artisan l5-swagger:generate

Archivo generado:

- `storage/api-docs/api-docs.json`

### Autenticación en Swagger

Los endpoints protegidos usan JWT Bearer:

- Header: `Authorization: Bearer <token>`
- Esquema de seguridad en Swagger: `bearerAuth`

### Pruebas del Panel de Control (AdminPanelTest.php)
- **8 pruebas**
- Cubrimiento: autenticación admin, autorización por rol y endpoints críticos de administración
- Incluye: login admin, denegación a no-admin, rutas protegidas, CRUD admin de productos y actualización de estado de órdenes


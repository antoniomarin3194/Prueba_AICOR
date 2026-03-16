# Pruebas Unitarias - Guía de Ejecución

## Requisitos Previos

- PHP 8.1 o superior
- Composer
- Laravel 11
- PHPUnit

## Archivos de Pruebas Creados

### Feature Tests (tests/Feature/)

Estos son tests de integración que prueban los endpoints de la API completos:

1. **CarritoTest.php**
   - Pruebas del controller de carrito
   - Obtener número de productos
   - Agregar productos al carrito
   - Remover productos
   - Sincronizar carrito

2. **OrdenTest.php**
   - Pruebas del controller de órdenes
   - Crear órdenes
   - Obtener órdenes individuales
   - Listar órdenes del usuario
   - Validación de stock

3. **AutenticacionTest.php**
   - Pruebas de autenticación JWT
   - Validación de tokens
   - Acceso a endpoints protegidos

4. **ProductosAPITest.php**
   - Pruebas de la API de productos
   - Obtener lista de productos
   - Validación de estructura de respuesta

5. **AdminPanelTest.php**
   - Pruebas del panel de control (admin)
   - Login de administrador y rechazo de no-admin
   - Protección de rutas (`401` sin token, `403` sin permisos)
   - Operaciones admin: listar usuarios, crear/eliminar productos, actualizar estado de orden

### Unit Tests (tests/Unit/)

1. **ProductoModeloTest.php**
   - Pruebas del modelo Product
   - Validación de tipos de datos de producto

2. **OrdenModeloTest.php**
   - Pruebas del modelo Order
   - Validación de tipos de datos y relación con usuario

## Comandos de Ejecución

### Ejecutar TODAS las pruebas

php artisan test


### Pruebas de Carrito (CarritoTest.php)
- **14 pruebas**
- Cubrimiento: Agregar, remover, sincronizar, obtener carrito
- Incluye: Validación de autenticación, productos inexistentes, datos inválidos

### Pruebas de Órdenes (OrdenTest.php)
- **15 pruebas**
- Cubrimiento: Crear, obtener, listar órdenes
- Incluye: Validación de stock, permisos de usuario, integridad de datos

### Pruebas de Autenticación (AutenticacionTest.php)
- **11 pruebas**
- Cubrimiento: Tokens JWT, autorización, acceso protegido
- Incluye: Validación de formato, expiración, tokens inválidos


### Pruebas de Productos (ProductosAPITest.php)
- **6 pruebas**
- Cubrimiento: Obtener productos, validación de estructura
- Incluye: Lista vacía, campos requeridos, formato de datos

### Pruebas de Modelos
- **7 pruebas**
- Cubrimiento: Creación de modelos, validación de tipos
- Incluye: Producto, Orden, relaciones básicas

## Documentación Swagger (OpenAPI)

La API está documentada con **L5-Swagger**.

### Rutas de documentación

- UI Swagger: `GET /api/documentation`
- JSON OpenAPI: `GET /docs`

### Regenerar documentación

Ejecuta este comando cuando cambies endpoints:

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


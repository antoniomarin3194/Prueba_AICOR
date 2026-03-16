<?php

namespace App\OpenApi;

use OpenApi\Attributes as OA;

#[OA\Info(
    version: '1.0.0',
    title: 'Aicor API',
    description: 'Documentación de endpoints de autenticación, productos, carrito, órdenes y administración.'
)]
#[OA\Server(url: '{scheme}://{host}', variables: [
    new OA\ServerVariable(serverVariable: 'scheme', default: 'http', enum: ['http', 'https']),
    new OA\ServerVariable(serverVariable: 'host', default: 'localhost:8000'),
])]
#[OA\Tag(name: 'Auth')]
#[OA\Tag(name: 'Productos')]
#[OA\Tag(name: 'Carrito')]
#[OA\Tag(name: 'Órdenes')]
#[OA\Tag(name: 'Admin')]
#[OA\SecurityScheme(
    securityScheme: 'bearerAuth',
    type: 'http',
    scheme: 'bearer',
    bearerFormat: 'JWT'
)]
class ApiDocumentation
{
    #[OA\Get(path: '/api/auth/google/redirect', tags: ['Auth'], summary: 'Redirige a Google OAuth', responses: [new OA\Response(response: 302, description: 'Redirección')])]
    public function googleRedirect(): void
    {
    }

    #[OA\Get(path: '/api/auth/google/callback', tags: ['Auth'], summary: 'Callback Google', responses: [new OA\Response(response: 302, description: 'Redirección al frontend con token')])]
    public function googleCallback(): void
    {
    }

    #[OA\Get(
        path: '/api/products',
        tags: ['Productos'],
        summary: 'Lista productos',
        responses: [
            new OA\Response(
                response: 200,
                description: 'Lista de productos',
                content: new OA\JsonContent(type: 'array', items: new OA\Items(type: 'object'))
            ),
        ]
    )]
    public function products(): void
    {
    }

    #[OA\Post(
        path: '/api/admin/login',
        tags: ['Admin'],
        summary: 'Login admin',
        requestBody: new OA\RequestBody(
            required: true,
            content: new OA\JsonContent(
                required: ['email', 'password'],
                properties: [
                    new OA\Property(property: 'email', type: 'string', format: 'email', example: 'admin@example.com'),
                    new OA\Property(property: 'password', type: 'string', example: '123456'),
                ]
            )
        ),
        responses: [
            new OA\Response(response: 200, description: 'Login correcto'),
            new OA\Response(response: 401, description: 'Credenciales inválidas'),
            new OA\Response(response: 403, description: 'Sin permisos admin'),
        ]
    )]
    public function adminLogin(): void
    {
    }

    #[OA\Post(path: '/api/admin/logout', tags: ['Admin'], summary: 'Logout admin', security: [['bearerAuth' => []]], responses: [new OA\Response(response: 200, description: 'OK'), new OA\Response(response: 401, description: 'No autenticado')])]
    public function adminLogout(): void
    {
    }

    #[OA\Get(path: '/api/admin/me', tags: ['Admin'], summary: 'Admin autenticado', security: [['bearerAuth' => []]], responses: [new OA\Response(response: 200, description: 'Usuario actual'), new OA\Response(response: 401, description: 'No autenticado'), new OA\Response(response: 403, description: 'Sin permisos admin')])]
    public function adminMe(): void
    {
    }

    #[OA\Post(
        path: '/api/admin/products',
        tags: ['Admin'],
        summary: 'Crear producto',
        security: [['bearerAuth' => []]],
        requestBody: new OA\RequestBody(
            required: true,
            content: new OA\JsonContent(
                required: ['name', 'price', 'stock'],
                properties: [
                    new OA\Property(property: 'name', type: 'string'),
                    new OA\Property(property: 'description', type: 'string', nullable: true),
                    new OA\Property(property: 'price', type: 'number', format: 'float'),
                    new OA\Property(property: 'stock', type: 'integer'),
                    new OA\Property(property: 'image_url', type: 'string', nullable: true),
                ]
            )
        ),
        responses: [new OA\Response(response: 201, description: 'Creado'), new OA\Response(response: 422, description: 'Validación')]
    )]
    public function adminStoreProduct(): void
    {
    }

    #[OA\Put(
        path: '/api/admin/products/{product}',
        tags: ['Admin'],
        summary: 'Actualizar producto',
        security: [['bearerAuth' => []]],
        parameters: [new OA\Parameter(name: 'product', in: 'path', required: true, schema: new OA\Schema(type: 'integer'))],
        requestBody: new OA\RequestBody(
            required: true,
            content: new OA\JsonContent(
                required: ['name', 'price', 'stock'],
                properties: [
                    new OA\Property(property: 'name', type: 'string'),
                    new OA\Property(property: 'description', type: 'string', nullable: true),
                    new OA\Property(property: 'price', type: 'number', format: 'float'),
                    new OA\Property(property: 'stock', type: 'integer'),
                    new OA\Property(property: 'image_url', type: 'string', nullable: true),
                ]
            )
        ),
        responses: [new OA\Response(response: 200, description: 'Actualizado'), new OA\Response(response: 404, description: 'No encontrado'), new OA\Response(response: 422, description: 'Validación')]
    )]
    public function adminUpdateProduct(): void
    {
    }

    #[OA\Delete(path: '/api/admin/products/{product}', tags: ['Admin'], summary: 'Eliminar producto', security: [['bearerAuth' => []]], parameters: [new OA\Parameter(name: 'product', in: 'path', required: true, schema: new OA\Schema(type: 'integer'))], responses: [new OA\Response(response: 200, description: 'Eliminado'), new OA\Response(response: 404, description: 'No encontrado')])]
    public function adminDeleteProduct(): void
    {
    }

    #[OA\Post(
        path: '/api/admin/users',
        tags: ['Admin'],
        summary: 'Crear usuario admin',
        security: [['bearerAuth' => []]],
        requestBody: new OA\RequestBody(
            required: true,
            content: new OA\JsonContent(
                required: ['name', 'email', 'password'],
                properties: [
                    new OA\Property(property: 'name', type: 'string'),
                    new OA\Property(property: 'email', type: 'string', format: 'email'),
                    new OA\Property(property: 'password', type: 'string'),
                ]
            )
        ),
        responses: [new OA\Response(response: 201, description: 'Creado'), new OA\Response(response: 422, description: 'Validación')]
    )]
    public function adminCreateUser(): void
    {
    }

    #[OA\Get(path: '/api/admin/users', tags: ['Admin'], summary: 'Listar usuarios', security: [['bearerAuth' => []]], responses: [new OA\Response(response: 200, description: 'Listado')])]
    public function adminUsers(): void
    {
    }

    #[OA\Get(path: '/api/admin/orders', tags: ['Admin'], summary: 'Listar órdenes', security: [['bearerAuth' => []]], responses: [new OA\Response(response: 200, description: 'Listado')])]
    public function adminOrders(): void
    {
    }

    #[OA\Put(
        path: '/api/admin/orders/{order}/status',
        tags: ['Admin'],
        summary: 'Actualizar estado de orden',
        security: [['bearerAuth' => []]],
        parameters: [new OA\Parameter(name: 'order', in: 'path', required: true, schema: new OA\Schema(type: 'integer'))],
        requestBody: new OA\RequestBody(
            required: true,
            content: new OA\JsonContent(
                required: ['status'],
                properties: [new OA\Property(property: 'status', type: 'string', enum: ['pending', 'shipped', 'completed', 'cancelled'])]
            )
        ),
        responses: [new OA\Response(response: 200, description: 'Actualizado'), new OA\Response(response: 422, description: 'Validación')]
    )]
    public function adminUpdateOrder(): void
    {
    }

    #[OA\Get(path: '/api/carrito/num-productos', tags: ['Carrito'], summary: 'Número total de productos', security: [['bearerAuth' => []]], responses: [new OA\Response(response: 200, description: 'Conteo')])]
    public function cartCount(): void
    {
    }

    #[OA\Get(path: '/api/cart', tags: ['Carrito'], summary: 'Obtener carrito', security: [['bearerAuth' => []]], responses: [new OA\Response(response: 200, description: 'Carrito')])]
    public function cartGet(): void
    {
    }

    #[OA\Post(
        path: '/api/cart/add',
        tags: ['Carrito'],
        summary: 'Agregar al carrito',
        security: [['bearerAuth' => []]],
        requestBody: new OA\RequestBody(
            required: true,
            content: new OA\JsonContent(
                required: ['product_id'],
                properties: [
                    new OA\Property(property: 'product_id', type: 'integer'),
                    new OA\Property(property: 'quantity', type: 'integer', default: 1),
                ]
            )
        ),
        responses: [new OA\Response(response: 200, description: 'Agregado'), new OA\Response(response: 404, description: 'Producto no encontrado')]
    )]
    public function cartAdd(): void
    {
    }

    #[OA\Post(
        path: '/api/cart/merge',
        tags: ['Carrito'],
        summary: 'Sincronizar carrito',
        security: [['bearerAuth' => []]],
        requestBody: new OA\RequestBody(
            required: true,
            content: new OA\JsonContent(
                required: ['cart'],
                properties: [
                    new OA\Property(
                        property: 'cart',
                        properties: [
                            new OA\Property(
                                property: 'items',
                                type: 'array',
                                items: new OA\Items(
                                    type: 'object',
                                    properties: [
                                        new OA\Property(property: 'product_id', type: 'integer'),
                                        new OA\Property(property: 'quantity', type: 'integer'),
                                        new OA\Property(property: 'price', type: 'number', format: 'float'),
                                    ]
                                )
                            ),
                        ],
                        type: 'object'
                    ),
                ]
            )
        ),
        responses: [new OA\Response(response: 200, description: 'Sincronizado'), new OA\Response(response: 400, description: 'Datos inválidos')]
    )]
    public function cartMerge(): void
    {
    }

    #[OA\Post(
        path: '/api/cart/removeFromCart',
        tags: ['Carrito'],
        summary: 'Remover del carrito',
        security: [['bearerAuth' => []]],
        requestBody: new OA\RequestBody(
            required: true,
            content: new OA\JsonContent(
                required: ['product_id'],
                properties: [new OA\Property(property: 'product_id', type: 'integer')]
            )
        ),
        responses: [new OA\Response(response: 200, description: 'Removido'), new OA\Response(response: 404, description: 'No encontrado')]
    )]
    public function cartRemove(): void
    {
    }

    #[OA\Post(
        path: '/api/order/create',
        tags: ['Órdenes'],
        summary: 'Crear orden',
        security: [['bearerAuth' => []]],
        requestBody: new OA\RequestBody(
            required: true,
            content: new OA\JsonContent(
                required: ['cart'],
                properties: [
                    new OA\Property(
                        property: 'cart',
                        type: 'array',
                        items: new OA\Items(
                            type: 'object',
                            properties: [
                                new OA\Property(property: 'product_id', type: 'integer'),
                                new OA\Property(property: 'quantity', type: 'integer'),
                            ]
                        )
                    ),
                ]
            )
        ),
        responses: [new OA\Response(response: 200, description: 'Orden creada'), new OA\Response(response: 400, description: 'Datos inválidos o stock insuficiente'), new OA\Response(response: 404, description: 'Producto no encontrado')]
    )]
    public function orderCreate(): void
    {
    }

    #[OA\Get(path: '/api/order/{id}', tags: ['Órdenes'], summary: 'Obtener orden por id', security: [['bearerAuth' => []]], parameters: [new OA\Parameter(name: 'id', in: 'path', required: true, schema: new OA\Schema(type: 'integer'))], responses: [new OA\Response(response: 200, description: 'Detalle de orden'), new OA\Response(response: 404, description: 'Orden no encontrada')])]
    public function orderGet(): void
    {
    }

    #[OA\Get(path: '/api/orders', tags: ['Órdenes'], summary: 'Listar órdenes del usuario', security: [['bearerAuth' => []]], responses: [new OA\Response(response: 200, description: 'Listado')])]
    public function orders(): void
    {
    }
}

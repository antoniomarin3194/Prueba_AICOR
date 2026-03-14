<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\User;
use App\Models\Product;
use App\Models\Order;
use Tymon\JWTAuth\Facades\JWTAuth;

class OrdenTest extends TestCase
{
    use RefreshDatabase;

    private $user;
    private $token;
    private $product;

    protected function setUp(): void
    {
        parent::setUp();
        
        // Crear usuario de prueba
        $this->user = User::factory()->create();
        
        // Generar token JWT
        $this->token = JWTAuth::fromUser($this->user);
        
        // Crear producto de prueba
        $this->product = Product::factory()->create([
            'name' => 'Producto Test Orden',
            'price' => 49.99,
            'stock' => 100
        ]);
    }

    /**
     * Prueba: Crear una orden exitosamente
     */
    public function test_crear_orden_exitosamente()
    {
        $response = $this->withHeaders(['Authorization' => "Bearer {$this->token}"])
                        ->postJson('/api/order/create', [
                            'cart' => [
                                [
                                    'product_id' => $this->product->id,
                                    'quantity' => 2
                                ]
                            ]
                        ]);

        $response->assertStatus(200)
                 ->assertJson(['message' => 'Orden creada exitosamente'])
                 ->assertJsonStructure(['order_id']);
    }

    /**
     * Prueba: Crear orden sin autenticación
     */
    public function test_crear_orden_sin_autenticacion()
    {
        $response = $this->postJson('/api/order/create', [
            'cart' => [
                [
                    'product_id' => $this->product->id,
                    'quantity' => 1
                ]
            ]
        ]);

        $response->assertStatus(401);
    }

    /**
     * Prueba: Crear orden con datos inválidos
     */
    public function test_crear_orden_datos_invalidos()
    {
        $response = $this->withHeaders(['Authorization' => "Bearer {$this->token}"])
                        ->postJson('/api/order/create', [
                            'cart' => 'datos-invalidos'
                        ]);

        $response->assertStatus(400)
                 ->assertJson(['error' => 'Datos del carrito inválidos']);
    }

    /**
     * Prueba: Crear orden con producto inexistente
     */
    public function test_crear_orden_producto_inexistente()
    {
        $response = $this->withHeaders(['Authorization' => "Bearer {$this->token}"])
                        ->postJson('/api/order/create', [
                            'cart' => [
                                [
                                    'product_id' => 999,
                                    'quantity' => 1
                                ]
                            ]
                        ]);

        $response->assertStatus(404)
                 ->assertJson(['error' => 'Producto no encontrado: 999']);
    }

    /**
     * Prueba: Crear orden con stock insuficiente
     */
    public function test_crear_orden_stock_insuficiente()
    {
        $producto = Product::factory()->create([
            'name' => 'Producto Stock Bajo',
            'price' => 29.99,
            'stock' => 1
        ]);

        $response = $this->withHeaders(['Authorization' => "Bearer {$this->token}"])
                        ->postJson('/api/order/create', [
                            'cart' => [
                                [
                                    'product_id' => $producto->id,
                                    'quantity' => 5
                                ]
                            ]
                        ]);

        $response->assertStatus(400)
                 ->assertJson(['error' => 'Stock insuficiente del producto: ' . $producto->name]);
    }

    /**
     * Prueba: Obtener una orden existente
     */
    public function test_obtener_orden_existente()
    {
        // Crear una orden
        $order = Order::factory()->create([
            'user_id' => $this->user->id,
            'total_price' => 99.98
        ]);

        $response = $this->withHeaders(['Authorization' => "Bearer {$this->token}"])
                        ->getJson("/api/order/{$order->id}");

        $response->assertStatus(200)
                 ->assertJson([
                     'order' => [
                         'id' => $order->id,
                         'total_price' => 99.98
                     ]
                 ])
                 ->assertJsonStructure(['order' => ['id', 'total_price', 'created_at', 'items']]);
    }

    /**
     * Prueba: Obtener orden sin autenticación
     */
    public function test_obtener_orden_sin_autenticacion()
    {
        $order = Order::factory()->create();

        $response = $this->getJson("/api/order/{$order->id}");

        $response->assertStatus(401);
    }

    /**
     * Prueba: Obtener orden inexistente
     */
    public function test_obtener_orden_inexistente()
    {
        $response = $this->withHeaders(['Authorization' => "Bearer {$this->token}"])
                        ->getJson('/api/order/999');

        $response->assertStatus(404)
                 ->assertJson(['error' => 'Orden no encontrada']);
    }

    /**
     * Prueba: Obtener orden de otro usuario
     */
    public function test_obtener_orden_otro_usuario()
    {
        $otroUsuario = User::factory()->create();
        $order = Order::factory()->create(['user_id' => $otroUsuario->id]);

        $response = $this->withHeaders(['Authorization' => "Bearer {$this->token}"])
                        ->getJson("/api/order/{$order->id}");

        $response->assertStatus(404)
                 ->assertJson(['error' => 'Orden no encontrada']);
    }

    /**
     * Prueba: Obtener todas las órdenes del usuario
     */
    public function test_obtener_todas_las_ordenes_del_usuario()
    {
        // Crear múltiples órdenes
        Order::factory()->count(3)->create(['user_id' => $this->user->id]);

        $response = $this->withHeaders(['Authorization' => "Bearer {$this->token}"])
                        ->getJson('/api/orders');

        $response->assertStatus(200)
                 ->assertJsonStructure(['orders' => [['id', 'total_price', 'created_at', 'items']]])
                 ->assertJsonCount(3, 'orders');
    }

    /**
     * Prueba: Obtener órdenes sin autenticación
     */
    public function test_obtener_ordenes_sin_autenticacion()
    {
        $response = $this->getJson('/api/orders');

        $response->assertStatus(401);
    }

    /**
     * Prueba: Obtener órdenes cuando el usuario no tiene ninguna
     */
    public function test_obtener_ordenes_usuario_sin_ordenes()
    {
        $response = $this->withHeaders(['Authorization' => "Bearer {$this->token}"])
                        ->getJson('/api/orders');

        $response->assertStatus(200)
                 ->assertJson(['orders' => []]);
    }

    /**
     * Prueba: El stock se reduce después de crear una orden
     */
    public function test_stock_se_reduce_despues_de_orden()
    {
        $stockInicial = $this->product->stock;

        $this->withHeaders(['Authorization' => "Bearer {$this->token}"])
             ->postJson('/api/order/create', [
                 'cart' => [
                     [
                         'product_id' => $this->product->id,
                         'quantity' => 3
                     ]
                 ]
             ]);

        $this->product->refresh();
        
        $this->assertEquals($stockInicial - 3, $this->product->stock);
    }

    /**
     * Prueba: El carrito se vaciá después de crear una orden
     */
    public function test_carrito_se_vacia_despues_de_orden()
    {
        // Agregar producto al carrito
        $this->withHeaders(['Authorization' => "Bearer {$this->token}"])
             ->postJson('/api/cart/add', [
                 'product_id' => $this->product->id,
                 'quantity' => 1
             ]);

        // Crear orden
        $this->withHeaders(['Authorization' => "Bearer {$this->token}"])
             ->postJson('/api/order/create', [
                 'cart' => [
                     [
                         'product_id' => $this->product->id,
                         'quantity' => 1
                     ]
                 ]
             ]);

        // Verificar que el carrito está vacío
        $response = $this->withHeaders(['Authorization' => "Bearer {$this->token}"])
                        ->getJson('/api/cart');

        $response->assertJson(['cart' => ['items' => []]]);
    }
}

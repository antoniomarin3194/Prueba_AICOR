<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\User;
use App\Models\Product;
use Tymon\JWTAuth\Facades\JWTAuth;

class CarritoTest extends TestCase
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
            'name' => 'Producto Test',
            'price' => 99.99,
            'stock' => 10
        ]);
    }

    /**
     * Prueba: Obtener número de productos en el carrito sin autenticación
     */
    public function test_obtener_numero_productos_sin_autenticacion()
    {
        $response = $this->getJson('/api/carrito/num-productos');

        // El endpoint está protegido por auth:api, debería devolver 401
        $response->assertStatus(401);
    }

    /**
     * Prueba: Obtener número de productos en el carrito con autenticación
     */
    public function test_obtener_numero_productos_con_autenticacion()
    {
        $response = $this->withHeaders(['Authorization' => "Bearer {$this->token}"])
                        ->getJson('/api/carrito/num-productos');

        $response->assertStatus(200)
                 ->assertJson(['num_productos' => 0]);
    }

    /**
     * Prueba: Obtener carrito vacío
     */
    public function test_obtener_carrito_vacio()
    {
        $response = $this->withHeaders(['Authorization' => "Bearer {$this->token}"])
                        ->getJson('/api/cart');

        $response->assertStatus(200)
                 ->assertJson([
                     'cart' => [
                         'id' => null,
                         'items' => []
                     ]
                 ]);
    }

    /**
     * Prueba: Agregar producto al carrito exitosamente
     */
    public function test_agregar_producto_al_carrito()
    {
        $response = $this->withHeaders(['Authorization' => "Bearer {$this->token}"])
                        ->postJson('/api/cart/add', [
                            'product_id' => $this->product->id,
                            'quantity' => 2,
                            'price' => $this->product->price
                        ]);

        $response->assertStatus(200)
                 ->assertJson(['message' => 'Producto agregado al carrito']);
    }

    /**
     * Prueba: Agregar producto sin autenticación
     */
    public function test_agregar_producto_sin_autenticacion()
    {
        $response = $this->postJson('/api/cart/add', [
            'product_id' => $this->product->id,
            'quantity' => 1
        ]);

        $response->assertStatus(401);
    }

    /**
     * Prueba: Agregar producto que no existe
     */
    public function test_agregar_producto_inexistente()
    {
        $response = $this->withHeaders(['Authorization' => "Bearer {$this->token}"])
                        ->postJson('/api/cart/add', [
                            'product_id' => 999,
                            'quantity' => 1
                        ]);

        $response->assertStatus(404)
                 ->assertJson(['error' => 'Producto no encontrado']);
    }

    /**
     * Prueba: Incrementar cantidad de producto existente en carrito
     */
    public function test_incrementar_cantidad_producto_en_carrito()
    {
        // Agregar producto primera vez
        $this->withHeaders(['Authorization' => "Bearer {$this->token}"])
             ->postJson('/api/cart/add', [
                 'product_id' => $this->product->id,
                 'quantity' => 1
             ]);

        // Agregar mismo producto segunda vez
        $response = $this->withHeaders(['Authorization' => "Bearer {$this->token}"])
                        ->postJson('/api/cart/add', [
                            'product_id' => $this->product->id,
                            'quantity' => 2
                        ]);

        $response->assertStatus(200);
        
        // Verificar que la cantidad se incrementó
        $numProductos = $this->withHeaders(['Authorization' => "Bearer {$this->token}"])
                             ->getJson('/api/carrito/num-productos')
                             ->json('num_productos');
        
        $this->assertEquals(3, $numProductos);
    }

    /**
     * Prueba: Remover producto del carrito
     */
    public function test_remover_producto_del_carrito()
    {
        // Agregar producto
        $this->withHeaders(['Authorization' => "Bearer {$this->token}"])
             ->postJson('/api/cart/add', [
                 'product_id' => $this->product->id,
                 'quantity' => 1
             ]);

        // Remover producto
        $response = $this->withHeaders(['Authorization' => "Bearer {$this->token}"])
                        ->postJson('/api/cart/removeFromCart', [
                            'product_id' => $this->product->id
                        ]);

        $response->assertStatus(200)
                 ->assertJson(['message' => 'Producto removido del carrito']);
    }

    /**
     * Prueba: Remover producto que no está en el carrito
     */
    public function test_remover_producto_no_en_carrito()
    {
        $response = $this->withHeaders(['Authorization' => "Bearer {$this->token}"])
                        ->postJson('/api/cart/removeFromCart', [
                            'product_id' => $this->product->id
                        ]);

        // Puede devolver "Carrito no encontrado" o "Producto no está en el carrito"
        $response->assertStatus(404);
    }

    /**
     * Prueba: Sincronizar carrito
     */
    public function test_sincronizar_carrito()
    {
        $response = $this->withHeaders(['Authorization' => "Bearer {$this->token}"])
                        ->postJson('/api/cart/merge', [
                            'cart' => [
                                'items' => [
                                    [
                                        'product_id' => $this->product->id,
                                        'quantity' => 3,
                                        'price' => $this->product->price
                                    ]
                                ]
                            ]
                        ]);

        $response->assertStatus(200)
                 ->assertJson(['message' => 'Carrito sincronizado correctamente']);
    }

    /**
     * Prueba: Sincronizar carrito sin autenticación
     */
    public function test_sincronizar_carrito_sin_autenticacion()
    {
        $response = $this->postJson('/api/cart/merge', [
            'cart' => ['items' => []]
        ]);

        $response->assertStatus(401);
    }

    /**
     * Prueba: Sincronizar carrito con datos inválidos
     */
    public function test_sincronizar_carrito_datos_invalidos()
    {
        $response = $this->withHeaders(['Authorization' => "Bearer {$this->token}"])
                        ->postJson('/api/cart/merge', [
                            'cart' => []
                        ]);

        $response->assertStatus(400)
                 ->assertJson(['error' => 'Datos del carrito inválidos']);
    }
}

<?php

namespace Tests\Unit;

use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Models\Product;
use App\Models\Order;
use App\Models\User;

class ProductoModeloTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Prueba: Un producto puede ser creado
     */
    public function test_un_producto_puede_ser_creado()
    {
        $producto = Product::factory()->create([
            'name' => 'Producto Test',
            'price' => 99.99,
            'stock' => 10
        ]);

        $this->assertNotNull($producto->name);
        $this->assertEquals('Producto Test', $producto->name);
        $this->assertEquals(99.99, $producto->price);
    }

    /**
     * Prueba: El precio de un producto es numérico
     */
    public function test_precio_producto_es_numerico()
    {
        $producto = Product::factory()->create([
            'price' => 49.99
        ]);

        $this->assertIsFloat($producto->price);
    }

    /**
     * Prueba: El stock de un producto es entero
     */
    public function test_stock_producto_es_entero()
    {
        $producto = Product::factory()->create([
            'stock' => 50
        ]);

        $this->assertIsInt($producto->stock);
    }
}

class OrdenModeloTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Prueba: Una orden puede ser creada
     */
    public function test_una_orden_puede_ser_creada()
    {
        $orden = Order::factory()->create([
            'total_price' => 199.99
        ]);

        $this->assertNotNull($orden->total_price);
        $this->assertEquals(199.99, $orden->total_price);
    }

    /**
     * Prueba: El total de la orden es numérico
     */
    public function test_total_orden_es_numerico()
    {
        $orden = Order::factory()->create([
            'total_price' => 299.99
        ]);

        $this->assertIsFloat($orden->total_price);
    }

    /**
     * Prueba: Una orden tiene un ID de usuario
     */
    public function test_orden_tiene_id_usuario()
    {
        $user = User::factory()->create();
        $orden = Order::factory()->create([
            'user_id' => $user->id
        ]);

        $this->assertNotNull($orden->user_id);
        $this->assertEquals($user->id, $orden->user_id);
    }
}

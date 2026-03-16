<?php

namespace Tests\Unit;

use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Models\Product;

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

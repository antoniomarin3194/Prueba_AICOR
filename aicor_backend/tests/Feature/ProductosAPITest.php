<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\Product;

class ProductosAPITest extends TestCase
{
    use RefreshDatabase;

    /**
     * Prueba: Obtener lista de productos
     */
    public function test_obtener_lista_productos()
    {
        // Crear productos de prueba
        Product::factory()->count(5)->create();

        $response = $this->getJson('/api/products');

        $response->assertStatus(200)
                 ->assertJsonCount(5)
                 ->assertJsonStructure([['id', 'name', 'price']]);
    }

    /**
     * Prueba: La lista de productos devuelve cantidad correcta
     */
    public function test_cantidad_productos_en_lista()
    {
        Product::factory()->count(3)->create();

        $response = $this->getJson('/api/products');

        $products = $response->json();
        $this->assertCount(3, $products);
    }

    /**
     * Prueba: Producto tiene campos requeridos
     */
    public function test_producto_tiene_campos_requeridos()
    {
        Product::factory()->create([
            'name' => 'Producto Test',
            'price' => 79.99,
            'description' => 'Descripción test'
        ]);

        $response = $this->getJson('/api/products');

        $response->assertJsonStructure([
            [
                'id',
                'name',
                'price',
                'description'
            ]
        ]);
    }

    /**
     * Prueba: Lista de productos está vacía sin productos
     */
    public function test_lista_productos_vacia()
    {
        $response = $this->getJson('/api/products');

        $response->assertStatus(200)
                 ->assertJsonCount(0);
    }

    /**
     * Prueba: El precio del producto es formato correcto
     */
    public function test_precio_producto_formato_correcto()
    {
        Product::factory()->create([
            'price' => 99.99
        ]);

        $response = $this->getJson('/api/products');

        $product = $response->json()[0];
        $this->assertIsNumeric($product['price']);
        $this->assertEquals(99.99, $product['price']);
    }
}

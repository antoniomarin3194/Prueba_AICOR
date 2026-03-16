<?php

namespace Tests\Unit;

use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Models\Order;
use App\Models\User;

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

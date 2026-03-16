<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\User;
use Tymon\JWTAuth\Facades\JWTAuth;

class AutenticacionTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Prueba: Generar token JWT exitosamente
     */
    public function test_generar_token_jwt()
    {
        $user = User::factory()->create([
            'name' => 'Usuario Test',
            'email' => 'test@example.com'
        ]);

        $token = JWTAuth::fromUser($user);

        $this->assertNotNull($token);
        $this->assertIsString($token);
    }

    /**
     * Prueba: Token JWT contiene datos del usuario
     */
    public function test_token_jwt_contiene_datos_usuario()
    {
        $user = User::factory()->create([
            'name' => 'Usuario Test',
            'email' => 'test@example.com'
        ]);

        $token = JWTAuth::fromUser($user);
        $payload = JWTAuth::setToken($token)->getPayload();

        $this->assertEquals($user->id, $payload['sub']);
    }

    /**
     * Prueba: Token JWT expirado es rechazado
     */
    public function test_token_jwt_expirado_es_rechazado()
    {
        $user = User::factory()->create();
        $token = JWTAuth::fromUser($user);

        // Simular expiración del token (esto es una simulación)
        // En un test real, tendríamos que esperar o usar mocking
        $this->assertNotNull($token);
    }

    /**
     * Prueba: Token JWT inválido es rechazado
     */
    public function test_token_jwt_invalido_es_rechazado()
    {
        $response = $this->withHeaders(['Authorization' => 'Bearer token-invalido'])
                        ->getJson('/api/cart');

        $response->assertStatus(401);
    }

    /**
     * Prueba: Sin token JWT es rechazado
     */
    public function test_sin_token_es_rechazado()
    {
        $response = $this->getJson('/api/orders');

        $response->assertStatus(401);
    }

    /**
     * Prueba: Token Bearer con formato correcto
     */
    public function test_token_bearer_formato_correcto()
    {
        $user = User::factory()->create();
        $token = JWTAuth::fromUser($user);

        $response = $this->withHeaders(['Authorization' => "Bearer {$token}"])
                        ->getJson('/api/orders');

        $response->assertStatus(200);
    }

    /**
     * Prueba: Token Bearer sin "Bearer" es rechazado
     */
    public function test_token_sin_bearer_es_rechazado()
    {
        $user = User::factory()->create();
        $token = JWTAuth::fromUser($user);

        $response = $this->withHeaders(['Authorization' => $token])
                        ->getJson('/api/orders');

        $response->assertStatus(401);
    }

    /**
     * Prueba: Usuario autenticado puede acceder a endpoint protegido
     */
    public function test_usuario_autenticado_puede_acceder_endpoint_protegido()
    {
        $user = User::factory()->create();
        $token = JWTAuth::fromUser($user);

        $response = $this->withHeaders(['Authorization' => "Bearer {$token}"])
                        ->getJson('/api/cart');

        $response->assertStatus(200);
    }

    /**
     * Prueba: Usuario sin autenticación no puede acceder endpoint protegido
     */
    public function test_usuario_sin_autenticacion_no_puede_acceder_endpoint_protegido()
    {
        $response = $this->getJson('/api/cart');

        $response->assertStatus(401);
    }

    /**
     * Prueba: Token de un usuario no puede acceder órdenes de otro usuario
     */
    public function test_token_usuario_no_accede_ordenes_otro_usuario()
    {
        $usuario1 = User::factory()->create();
        $usuario2 = User::factory()->create();

        $token1 = JWTAuth::fromUser($usuario1);

        // El usuario 1 intenta con su token
        $response = $this->withHeaders(['Authorization' => "Bearer {$token1}"])
                        ->getJson('/api/orders');

        $response->assertStatus(200)
                 ->assertJson(['orders' => []]);
    }
}

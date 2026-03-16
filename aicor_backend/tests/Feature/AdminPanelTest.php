<?php

namespace Tests\Feature;

use App\Models\Order;
use App\Models\Product;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use Tymon\JWTAuth\Facades\JWTAuth;

class AdminPanelTest extends TestCase
{
    use RefreshDatabase;

    public function test_admin_login_exitoso_devuelve_token(): void
    {
        $admin = User::factory()->create([
            'email' => 'admin.panel@test.com',
            'password' => '1234',
            'is_admin' => true,
        ]);

        $response = $this->postJson('/api/admin/login', [
            'email' => $admin->email,
            'password' => '1234',
        ]);

        $response->assertStatus(200)
            ->assertJsonStructure([
                'message',
                'token',
                'user' => ['id', 'name', 'email', 'is_admin'],
            ]);

        $this->assertTrue((bool) $response->json('user.is_admin'));
    }

    public function test_usuario_no_admin_no_puede_hacer_login_admin(): void
    {
        $user = User::factory()->create([
            'email' => 'user.panel@test.com',
            'password' => '1234',
            'is_admin' => false,
        ]);

        $response = $this->postJson('/api/admin/login', [
            'email' => $user->email,
            'password' => '1234',
        ]);

        $response->assertStatus(403)
            ->assertJson([
                'message' => 'No tienes permisos de administrador.',
            ]);
    }

    public function test_ruta_admin_sin_token_devuelve_401(): void
    {
        $response = $this->getJson('/api/admin/users');

        $response->assertStatus(401);
    }

    public function test_ruta_admin_con_usuario_normal_devuelve_403(): void
    {
        $user = User::factory()->create([
            'is_admin' => false,
        ]);

        $response = $this
            ->withHeaders($this->authHeaderFor($user))
            ->getJson('/api/admin/users');

        $response->assertStatus(403)
            ->assertJson([
                'message' => 'Acceso restringido a administradores.',
            ]);
    }

    public function test_admin_puede_listar_usuarios(): void
    {
        User::factory()->count(3)->create();
        $admin = User::factory()->create([
            'is_admin' => true,
        ]);

        $response = $this
            ->withHeaders($this->authHeaderFor($admin))
            ->getJson('/api/admin/users');

        $response->assertStatus(200)
            ->assertJsonStructure([
                'users' => [
                    ['id', 'name', 'email', 'is_admin', 'created_at'],
                ],
            ]);
    }

    public function test_admin_puede_crear_producto(): void
    {
        $admin = User::factory()->create([
            'is_admin' => true,
        ]);

        $payload = [
            'name' => 'Producto Admin Test',
            'description' => 'Producto creado desde test',
            'price' => 49.99,
            'stock' => 20,
            'image_url' => 'https://example.com/producto.png',
        ];

        $response = $this
            ->withHeaders($this->authHeaderFor($admin))
            ->postJson('/api/admin/products', $payload);

        $response->assertStatus(201)
            ->assertJsonPath('product.name', 'Producto Admin Test');

        $this->assertDatabaseHas('products', [
            'name' => 'Producto Admin Test',
            'stock' => 20,
        ]);
    }

    public function test_admin_puede_actualizar_estado_de_orden(): void
    {
        $admin = User::factory()->create([
            'is_admin' => true,
        ]);

        $order = Order::factory()->create([
            'status' => 'pending',
        ]);

        $response = $this
            ->withHeaders($this->authHeaderFor($admin))
            ->putJson("/api/admin/orders/{$order->id}/status", [
                'status' => 'shipped',
            ]);

        $response->assertStatus(200)
            ->assertJsonPath('order.status', 'shipped');

        $this->assertDatabaseHas('orders', [
            'id' => $order->id,
            'status' => 'shipped',
        ]);
    }

    public function test_admin_puede_eliminar_producto(): void
    {
        $admin = User::factory()->create([
            'is_admin' => true,
        ]);

        $product = Product::factory()->create();

        $response = $this
            ->withHeaders($this->authHeaderFor($admin))
            ->deleteJson("/api/admin/products/{$product->id}");

        $response->assertStatus(200)
            ->assertJson([
                'message' => 'Producto eliminado correctamente.',
            ]);

        $this->assertDatabaseMissing('products', [
            'id' => $product->id,
        ]);
    }

    private function authHeaderFor(User $user): array
    {
        $token = JWTAuth::fromUser($user);

        return [
            'Authorization' => "Bearer {$token}",
        ];
    }
}

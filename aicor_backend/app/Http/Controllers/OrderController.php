<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\Order;

class OrderController extends Controller
{
    public function createOrder(Request $request)
{
    $user = $request->user();

    if (!$user) {
        return response()->json(['error' => 'No autorizado'], 401);
    }

    $cartItems = $request->input('cart');

    if (!$cartItems || !is_array($cartItems)) {
        return response()->json(['error' => 'Datos del carrito inválidos'], 400);
    }

    $total = 0;

    foreach ($cartItems as $item) {

    $product = Product::find($item['product_id']);

    if (!$product) {
        return response()->json([
            'error' => 'Producto no encontrado: ' . $item['product_id']
        ], 404);
    }

        $total += $item['quantity'] * $product->price;

        if ($product->stock < $item['quantity']) {
            return response()->json([
                'error' => 'Stock insuficiente del producto: ' . $product->name
            ], 400);
        }else{
            // Reducir el stock del producto
            $product->stock -= $item['quantity'];
            $product->save();
        }
        
    }

    
    $order = Order::create([
        'user_id' => $user->id,
        'total_price' => $total,
    ]);

    foreach ($cartItems as $item) {
        $product = Product::find($item['product_id']);
        $order->items()->create([
            'product_id' => $item['product_id'],
            'quantity' => $item['quantity'],
            'price' => $product->price,
        ]);
    }

    $user->cart()->delete();

    return response()->json([
        'message' => 'Orden creada exitosamente',
        'order' => $order->items(),
        'order_id' => $order->id
    ]);
}

    public function getOrder(Request $request, $id)
    {
        $user = $request->user();

        if (!$user) {
            return response()->json(['error' => 'No autorizado'], 401);
        }

        $order = Order::with('items.product')->where('id', $id)->where('user_id', $user->id)->first();

        if (!$order) {
            return response()->json(['error' => 'Orden no encontrada'], 404);
        }

        return response()->json([
            'order' => [
                'id' => $order->id,
                'total_price' => $order->total_price,
                'status' => $order->status,
                'created_at' => $order->created_at,
                'items' => $order->items->map(function ($item) {
                    return [
                        'id' => $item->id,
                        'product_id' => $item->product_id,
                        'name' => $item->product->name ?? 'Producto no disponible',
                        'quantity' => $item->quantity,
                        'price' => $item->price,
                        'subtotal' => $item->quantity * $item->price
                    ];
                })
            ]
        ]);
    }

    public function getUserOrders(Request $request)
    {
        $user = $request->user();

        if (!$user) {
            return response()->json(['error' => 'No autorizado'], 401);
        }

        $orders = Order::with('items.product')->where('user_id', $user->id)->get();

        return response()->json([
            'orders' => $orders->map(function ($order) {
                return [
                    'id' => $order->id,
                    'total_price' => $order->total_price,
                    'status' => $order->status,
                    'created_at' => $order->created_at,
                    'items' => $order->items->map(function ($item) {
                        return [
                            'id' => $item->id,
                            'product_id' => $item->product_id,
                            'name' => $item->product->name ?? 'Producto no disponible',
                            'quantity' => $item->quantity,
                            'price' => $item->price,
                            'subtotal' => $item->quantity * $item->price
                        ];
                    })
                ];
            })
        ]);
    }

}

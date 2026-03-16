<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;

class CartController extends Controller
{
    
    public function numProductos(Request $request){
        $user = $request->user();

        if (!$user) {
            return response()->json(['num_productos' => 0]);
        }

        // Obtener el carrito del usuario
        $cart = $user->cart;

        if (!$cart) {
            return response()->json(['num_productos' => 0]);
        }

        // Sumar la cantidad de todas las líneas
        $numProductos = $cart->items()->sum('quantity');

        return response()->json([
            'num_productos' => $numProductos
        ]);
    }      


    public function getCart(Request $request){
        $user = $request->user();

        if (!$user || !$user->cart) {
            return response()->json([
                'cart' => [
                    'id' => null,
                    'items' => [],
                ]
            ]);
        }

        $items = $user->cart->items()->with('product')->get()->map(function ($item) {
            return [
                'id' => $item->id,
                'product_id' => $item->product_id,
                'name' => $item->product->name,
                'price' => $item->product->price,
                'image' => $item->product->image_url,
                'quantity' => $item->quantity,
            ];
        });

        return response()->json([
            'cart' => [
                'id' => $user->cart->id,
                'items' => $items,
            ]
        ]);
    }

    public function addToCart(Request $request)
    {
        $user = $request->user();
        if (!$user) {
            return response()->json(['error' => 'No autorizado'], 401);
        }

        $productId = $request->input('product_id');
        $quantity = $request->input('quantity', 1);
        $price = $request->input('price');
        $product = Product::find($productId);
        if (!$product) {
            return response()->json(['error' => 'Producto no encontrado'], 404);
        }

        $cart = $user->cart()->firstOrCreate([]);

        $cartItem = $cart->items()->where('product_id', $productId)->first();
        if ($cartItem) {
            $cartItem->quantity += $quantity;
            $cartItem->save();
        } else {
            $cart->items()->create([
                'product_id' => $productId,
                'quantity' => $quantity,
                'price' => $product->price,
            ]);
        }

        return response()->json(['message' => 'Producto agregado al carrito']);
    }


    function mergeCart(Request $request) {
        $user = $request->user();
        if (!$user) {
            return response()->json(['error' => 'No autorizado'], 401);
        }

        $cartData = $request->input('cart');
        if (!$cartData || !isset($cartData['items'])) {
            return response()->json(['error' => 'Datos del carrito inválidos'], 400);
        }

        $cart = $user->cart()->firstOrCreate([]);

        foreach ($cartData['items'] as $item) {

            $productId = $item['product_id'];
            $quantity = $item['quantity'];
            $product = Product::find($productId);

            if (!$product) {
                return response()->json(['error' => 'Producto incorrecto, no está en la base de datos'], 400);
            }
            
            $price = $item['price'] ?? $product->price;
            $cartItem = $cart->items()->where('product_id', $productId)->first();
            if ($cartItem) {
                $cartItem->quantity += $quantity;
                $cartItem->save();
            } else {
                $cart->items()->create([
                    'product_id' => $productId,
                    'quantity' => $quantity,
                    'price' => $price,
                ]);
            }
        }

        return response()->json(['message' => 'Carrito sincronizado correctamente']);
    }

    function removeFromCart(Request $request) {
        $user = $request->user();
        if (!$user) {
            return response()->json(['error' => 'No autorizado'], 401);
        }

        $productId = $request->input('product_id');
        $cart = $user->cart;
        if (!$cart) {
            return response()->json(['error' => 'Carrito no encontrado'], 404);
        }

        $cartItem = $cart->items()->where('product_id', $productId)->first();
        if (!$cartItem) {
            return response()->json(['error' => 'Producto no está en el carrito'], 404);
        }

        $cartItem->delete();

        return response()->json(['message' => 'Producto removido del carrito']);
    }
}
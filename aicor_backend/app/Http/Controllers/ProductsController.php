<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;

class ProductsController extends Controller
{
    public function returnProducts()
    {
        $products = Product::all();
        return response()->json($products);
    }

    public function adminStore(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'price' => ['required', 'numeric', 'min:0'],
            'stock' => ['required', 'integer', 'min:0'],
            'image_url' => ['nullable', 'string', 'max:2048'],
        ]);

        $product = Product::create($validated);

        return response()->json([
            'message' => 'Producto creado correctamente.',
            'product' => $product,
        ], 201);
    }

    public function adminUpdate(Request $request, Product $product)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'price' => ['required', 'numeric', 'min:0'],
            'stock' => ['required', 'integer', 'min:0'],
            'image_url' => ['nullable', 'string', 'max:2048'],
        ]);

        $product->update($validated);

        return response()->json([
            'message' => 'Producto actualizado correctamente.',
            'product' => $product,
        ]);
    }

    public function adminDestroy(Product $product)
    {
        $product->delete();

        return response()->json([
            'message' => 'Producto eliminado correctamente.',
        ]);
    }
}

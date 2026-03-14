<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;

class AdminOrdersController extends Controller
{
    public function index()
    {
        $orders = Order::with(['user:id,name,email', 'items.product:id,name'])
            ->orderByDesc('id')
            ->get();

        return response()->json([
            'orders' => $orders,
        ]);
    }

    public function updateStatus(Request $request, Order $order)
    {
        $validated = $request->validate([
            'status' => ['required', 'in:pending,shipped,completed,cancelled'],
        ]);

        $order->update([
            'status' => $validated['status'],
        ]);

        return response()->json([
            'message' => 'Estado de orden actualizado correctamente.',
            'order' => $order->load(['user:id,name,email', 'items.product:id,name']),
        ]);
    }
}

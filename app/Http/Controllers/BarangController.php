<?php

namespace App\Http\Controllers;

use App\Models\Barang;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BarangController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = Barang::latest();

        if (request("search")) {
            $query->where('nama', 'like', '%' . request('search') . '%')
                ->orWhere('kategori', 'like', '%' . request('search') . '%')
                ->orWhere('harga', 'like', '%' . request('search') . '%');
        }

        return Inertia::render('Barang', [
            "allProducts" => $query->with('pembelian')->paginate(5),
        ]);
    }

    public function create()
    {
        return Inertia::render('AddBarang');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            "nama" => "required|string|min:2|max:255",
            "kategori" => "required|string",
            "stock" => "required|numeric|min:1",
            "harga" => "required|numeric|min:1",
        ]);

        $validatedData["harga"] = intval($request->harga);
        $validatedData["stock"] = intval($request->stock);

        Barang::create($validatedData);

        return redirect()->intended(route('barang.index', absolute: false));
    }

    public function edit(Barang $barang)
    {
        return Inertia::render('EditBarang', [
            "product" => $barang
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Barang $barang)
    {
        $validatedData = $request->validate([
            "nama" => "required|string|min:2|max:255",
            "kategori" => "required|string",
            "stock" => "required|numeric|min:1",
            "harga" => "required|numeric|min:1",
        ]);

        $validatedData["harga"] = intval($request->harga);
        $validatedData["stock"] = intval($request->stock);

        $barang->update($validatedData);

        return redirect()->intended(route('barang.index', absolute: false));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Barang $barang)
    {
        $barang->delete();

        return redirect("/dashboard/barang");
    }
}

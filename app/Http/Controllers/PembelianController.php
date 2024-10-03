<?php

namespace App\Http\Controllers;

use App\Models\Barang;
use App\Models\Pembelian;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PembelianController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = Pembelian::latest();

        if (request("search")) {
            $searchTerm = request("search");

            $query->where('total_harga', 'like', '%' . $searchTerm . '%')
                ->orWhere('jumlah', 'like', '%' . $searchTerm . '%');

            $query->orWhereHas('barang', function ($q) use ($searchTerm) {
                $q->where('nama', 'like', '%' . $searchTerm . '%')
                    ->orWhere('kategori', 'like', '%' . $searchTerm . '%')
                    ->orWhere('harga', 'like', '%' . $searchTerm . '%');
            });
        }

        return Inertia::render('Pembelian', [
            "allPembelian" => $query->with('barang')->paginate(5),
        ]);
    }

    public function create()
    {
        return Inertia::render('AddPembelian', [
            "barang" => Barang::latest()->get()
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            "barang_id" => "required|string|exists:barangs,id",
            "jumlah" => "required|string",
        ]);

        $barang = Barang::where('id', $validatedData['barang_id'])->first();

        $validatedData["total_harga"] = intval($validatedData['jumlah']) * $barang['harga'];

        Barang::where('id', $validatedData['barang_id'])->update([
            'stock' => $barang['stock'] - intval($validatedData['jumlah'])
        ]);

        Pembelian::create($validatedData);

        return redirect()->intended(route('pembelian.index', absolute: false));
    }

    public function edit(Pembelian $pembelian)
    {
        return Inertia::render('EditPembelian', [
            "pembelian" => $pembelian,
            "barang" => Barang::latest()->get()
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Pembelian $pembelian)
    {
        $validatedData = $request->validate([
            "barang_id" => "required|string|exists:barangs,id",
            "jumlah" => "required|string",
        ]);

        $barang = Barang::where('id', $validatedData['barang_id'])->first();

        $validatedData["total_harga"] = intval($validatedData['jumlah']) * $barang['harga'];

        if ($pembelian->barang_id == $validatedData['barang_id']) {
            Barang::where('id', $validatedData['barang_id'])->update([
                'stock' => $barang['stock'] + $pembelian->jumlah - intval($validatedData['jumlah'])
            ]);
        } else {
            Barang::where('id', $validatedData['barang_id'])->update([
                'stock' => $barang['stock'] - intval($validatedData['jumlah'])
            ]);

            $prevBarang = Barang::where('id', $pembelian->barang_id)->first();
            Barang::where('id', $pembelian->barang_id)->update([
                'stock' => $prevBarang['stock'] + $pembelian->jumlah
            ]);
        }

        $pembelian->update($validatedData);

        return redirect()->intended(route('pembelian.index', absolute: false));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Pembelian $pembelian)
    {
        $pembelian->delete();

        return redirect("/dashboard/pembelian");
    }
}

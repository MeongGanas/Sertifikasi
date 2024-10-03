<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class PetugasController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = User::where('role', 'petugas')->latest();

        if (request("search")) {
            $query->where('name', 'like', '%' . request('search') . '%')
                ->orWhere('username', 'like', '%' . request('search') . '%');
        }

        return Inertia::render("Petugas", [
            "petugas" => $query->paginate(5)
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render("AddPetugas");
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            "name" => "required|string",
            "username" => "required|string|unique:users",
            "password" => "required|string"
        ]);

        $validatedData["password"] = Hash::make($validatedData["password"]);
        $validatedData["role"] = "petugas";

        User::create($validatedData);

        return redirect()->intended('/dashboard/petugas');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        $user->delete();

        return redirect()->intended('/dashboard/petugas');
    }
}

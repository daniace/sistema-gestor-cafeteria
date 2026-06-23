<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('productos', function (Blueprint $table) {
            $table->unsignedBigInteger('categoria_id')->nullable();
        });

        DB::table('productos')->update([
            'categoria_id' => DB::raw('categoria'),
        ]);

        Schema::table('productos', function (Blueprint $table) {
            $table->foreign('categoria_id')->references('id')->on('categoria_producto');
        });

        Schema::table('productos', function (Blueprint $table) {
            $table->dropColumn('categoria');
        });
    }

    public function down(): void
    {
        Schema::table('productos', function (Blueprint $table) {
            $table->integer('categoria')->nullable();
        });

        DB::table('productos')->update([
            'categoria' => DB::raw('categoria_id'),
        ]);

        Schema::table('productos', function (Blueprint $table) {
            $table->dropForeign(['categoria_id']);
            $table->dropColumn('categoria_id');
        });
    }
};

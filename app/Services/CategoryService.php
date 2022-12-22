<?php

namespace App\Services;
use \App\Models\Category;
use Illuminate\Database\Eloquent\Collection;

class CategoryService
{
  public function getTaskCategories(): Collection|array
  {
    return Category::where('type', 'task')->get();
  }
}

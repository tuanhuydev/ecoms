<?php

namespace App\Http\Traits;
use Illuminate\Support\Str;


trait TransformArrayTrait {

  public function toCamel(Array $array): Array
  {
    $result = [];
    foreach($array as $key => $value) {
      $result[Str::camel($key)] = $value;
    }
    return $result;
  }

  public function toSnake(Array $array): Array
  {
    $result = [];
    foreach($array as $key => $value) {
      $result[Str::snake($key)] = $value;
    }
    return $result;
  }
}

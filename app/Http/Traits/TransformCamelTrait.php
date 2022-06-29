<?php

namespace App\Http\Traits;
use Illuminate\Support\Str;


trait TransformCamelTrait {

  public function transformCamel(Array $array): Array
  {
    $result = [];
    foreach($array as $key => $value) {
      $result[Str::camel($key)] = $value;
    }
    return $result;
  }
}

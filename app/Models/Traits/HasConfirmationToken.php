<?php
namespace App\Models\Traits;

use Illuminate\Support\Str;

trait HasConfirmationToken
{
    protected static function bootHasConfirmationToken()
    {
        static::creating(function($model) {
          if(empty($model->confirmation_token)) {
              $model->confirmation_token = rand(100000, 999999);
          }
        });
    }
}
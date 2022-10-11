<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\Traits\HasUuid;

class Account extends Model
{
    use HasFactory, HasUuid;

    protected $primaryKey = 'account_id';
    protected $keyType = 'string';

    // Prevent save as uuid but return 0
    public $incrementing = false;

        /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
      'user_id',
      'status',
      'availability',
      'age',
  ];

    public function user()
    {
      return $this->belongsTo(User::class, 'user_id');
    }
}

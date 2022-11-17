<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;
use App\Models\Traits\HasUuid;
use App\Models\Traits\HasConfirmationToken;


class User extends Authenticatable
{
    use HasFactory, Notifiable, HasApiTokens, HasUuid, HasConfirmationToken;

    protected $primaryKey = 'id';
    protected $keyType = 'string';

    // Prevent saving as uuid but return 0
    public $incrementing = false;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'first_name',
        'last_name',
        'email',
        'password',
        'avatar',
        'status',
        'permission',
        'reset_password_token',
        'email_verified_at'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'created_at',
        'updated_at',
        'deleted_at',
        'password',
        'confirmation_token',
        'reset_password_token',
        'email_verified_at'
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function getFullName(): string
    {
        return ucfirst($this->first_name)." ".ucfirst($this->last_name);
    }


    public function articles(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(Article::class, 'id', 'author_id');
    }

    public function tasks(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(Task::class);
    }

    public function account(): \Illuminate\Database\Eloquent\Relations\HasOne
    {
      return $this->hasOne(Account::class);
    }
}

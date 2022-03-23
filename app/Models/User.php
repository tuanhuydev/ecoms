<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;
use App\Models\Article;
use App\Models\Traits\HasUuid;
use App\Models\Traits\HasConfirmationToken;


class User extends Authenticatable
{
    use HasFactory, Notifiable, HasApiTokens, HasUuid, HasConfirmationToken;

    protected $primaryKey = 'id';
    protected $keyType = 'string';
    
    // Prevent save as uuid but return 0
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
        'avatar'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password',
        'confirmation_token'
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function articles() 
    {
        return $this->hasMany(Article::class, 'foreign_key', 'author_id');
    }
}

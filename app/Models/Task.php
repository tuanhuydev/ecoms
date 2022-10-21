<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Str;
use App\Models\User;
use Laravel\Scout\Searchable;


class Task extends Model
{
    use HasFactory, SoftDeletes, Searchable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'title',
        'description',
        'status',
        'due_date',
        'updated_by',
        'acceptance',
        'severity',
        'created_by'
    ];

    public function getCreatedBy()
    {
      return $this->belongsTo(User::class, 'created_by', 'id')->first();
    }

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'due_date' => 'datetime',
    ];

     /**
     * Get the value used to index the model.
     *
     * @return mixed
     */
    public function getScoutKey()
    {
        return $this->title;
    }

    /**
     * Get the indexable data array for the model.
     *
     * @return array
     */
    public function toSearchableArray()
    {
      return [
      'title' => $this->title,
      'status' => $this->status,
      'due_date' => $this->due_date,
      'created_at' => $this->created_at,
      'severity' => $this->severity
      ];
    }
}

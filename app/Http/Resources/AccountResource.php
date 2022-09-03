<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Traits\TransformArrayTrait;

class AccountResource extends JsonResource
{
  use TransformArrayTrait;
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        $camelResource = $this->toCamel($this->resource->toArray());
        $camelResource['user'] = $this->toCamel($camelResource['user']);
        return $camelResource;
    }
}

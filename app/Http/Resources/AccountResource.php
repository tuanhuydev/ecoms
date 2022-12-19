<?php

namespace App\Http\Resources;

use Illuminate\Contracts\Support\Arrayable;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Traits\TransformArrayTrait;
use JsonSerializable;

class AccountResource extends JsonResource
{
  use TransformArrayTrait;
    /**
     * Transform the resource into an array.
     *
     * @param  Request  $request
     * @return array|Arrayable|JsonSerializable
     */
    public function toArray($request)
    {
        $camelResource = $this->toCamel($this->resource->toArray());
        $camelResource['user'] = $this->toCamel($camelResource['user']);
        return $camelResource;
    }
}

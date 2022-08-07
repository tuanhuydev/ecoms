<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Traits\TransformArrayTrait;

class TaskResource extends JsonResource
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
      $result = $this->toCamel($this->resource->toArray());
      $result['createdBy'] = $this->toCamel($this->getCreatedBy()->toArray());
      return $result;
    }
}

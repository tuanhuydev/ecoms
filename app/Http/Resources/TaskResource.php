<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Traits\TransformCamelTrait;

class TaskResource extends JsonResource
{
    use TransformCamelTrait;
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
      $result = $this->transformCamel($this->resource->toArray());
      $result['createdBy'] = $this->transformCamel($this->getCreatedBy()->toArray());
      return $result;
    }
}

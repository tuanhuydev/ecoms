<?php

namespace App\Http\Resources;

use Illuminate\Contracts\Support\Arrayable;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Traits\TransformArrayTrait;
use JsonSerializable;

class TaskResource extends JsonResource
{
    use TransformArrayTrait;
    /**
     * Transform the resource into an array.
     *
     * @param  Request  $request
     * @return array|Arrayable|JsonSerializable
     */
    public function toArray($request): array|JsonSerializable|Arrayable
    {
      $taskResource = $this->toCamel($this->resource->toArray());
      $taskResource['createdBy'] = $this->toCamel($this->getCreatedBy()->toArray());
//      if (!empty($this->category())) {
//        $taskResource['category'] = $this->toCamel($this->category()->toArray());
//      }
      return $taskResource;
    }
}

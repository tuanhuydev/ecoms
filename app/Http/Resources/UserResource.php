<?php

namespace App\Http\Resources;

use Illuminate\Contracts\Support\Arrayable;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use JsonSerializable;

class UserResource extends JsonResource
{


    /**
     * Transform the resource into an array.
     *
     * @param  Request  $request
     * @return array|Arrayable|JsonSerializable
     */
    public function toArray($request)
    {
        return [
          'userId' => $this->id,
          'firstName' => $this->first_name,
          'lastName' => $this->last_name,
          'fullName' => $this->getFullName(),
          'email' => $this->email,
          'avatar' => $this->avatar,
          'status' => $this->status,
          'permission' => $this->permission
        ];
    }
}

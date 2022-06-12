<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class TaskResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
      return [
        'id' => $this->id,
        'title' => $this->title,
        'description' => $this->description,
        'acceptance' => $this->acceptance,
        'status' => $this->status,
        'dueDate' => $this->due_date,
        'severity' => $this->severity,
        'createdAt' => $this->created_at,
        'updatedAt' => $this->updated_at,
        'createdBy' => $this->updated_by
      ];
    }
}

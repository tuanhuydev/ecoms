<?php

namespace App\Services;

use Illuminate\Http\Request;
use Illuminate\Support\Str;
use App\Models\Task;
use Illuminate\Support\Facades\Auth;

class TaskService
{

    /**
     * Get all active tasks
     */
    public function getAll(Request $request)
    {
      $query = $request->query();
      if (isset($query['action'])) {
        return Task::where('created_by',  $request->user()->id)->orderBy(Str::of($query['field'])->snake(), $query['value'])->get();
      }
      return Task::where('created_by',  $request->user()->id)->get();
    }

     /**
     * Get by task id
     */
    public function getById(string $id)
    {
        return Task::find($id);
    }

    /**
     * Create new task
     * @param Task data
     * @return string taskId
     *
     */
    public function create($data)
    {
        return Task::create($data);
    }

    /**
     * Update current task
     * @param Task data
     * @return boolean
     *
     */
    public function update($id, mixed $body)
    {
      $task = Task::find($id);
      if (empty($task)) {
        return false;
      }
      return $task->update($body);
    }


    public function delete(string $id)
    {
      $task = Task::find($id);
      if (empty($task)) {
        return false;
      }
      return $task->delete();
    }
}

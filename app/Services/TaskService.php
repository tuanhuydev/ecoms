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
    public function update($data)
    {
        $task = Task::find($data['id']);
        if ($task) {
            if (!empty($data['title'])) {
                $task->title = $data['title'];
            }
            if (!empty($data['description'])) {
                $task->description = $data['description'];
            }
            if (!empty($data['status'])) {
                $task->status = $data['status'];
            }
            if (!empty($data['due_date'])) {
                $task->due_date = $data['due_date'];
            }
            if (!empty($data['severity'])) {
              $task->severity = $data['severity'];
          }
          $task->updated_by = Auth::user()->user_id ?? null;
        }
        return $task->save();
    }


    public function delete(string $id)
    {
        $task = Task::find($id);
        if (!empty($task)) {
            return $task->delete();
        }
        return false;
    }
}

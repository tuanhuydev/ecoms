<?php

namespace App\Services;

use Illuminate\Http\Request;
use Illuminate\Support\Str;
use App\Models\Task;
use Illuminate\Pagination\CursorPaginator;
use Illuminate\Support\Facades\Auth;

class TaskService
{
    /**
     * Get all active tasks
     */
    public function getAll(Request $request)
    {
      // TODO: User Permission Enhancement
      $currentUser = $request->user()->id;
      $taskCollection = Task::where('created_by',  $currentUser);

      // Filter
      if ($request->has('filter')) {
        $filters = $request->query('filter');
        if (!empty($filters['search'])) {
          $taskCollection = Task::search($filters['search'])->where('created_by',  $currentUser);
        }

        foreach($filters as $key => $value) {
          if ($key !== 'search') {
            $taskCollection->where($key, $value);
          }
        }
      }

      // Order
      if ($request->has('sorter')) {
        $sorters = $request->query('sorter');
        $field = Str::of($sorters['field'])->snake();
        $value = Str::of($sorters['value'])->lower();
        if ($field && $value) {
          $taskCollection = $taskCollection->orderBy($field, $value);
        }
      }
      $perPage = $request->has('pageSize') ? (int) $request->query('pageSize') : 20;
      return $taskCollection->paginate($perPage);
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

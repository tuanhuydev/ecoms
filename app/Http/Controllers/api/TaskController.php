<?php

namespace App\Http\Controllers\api;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Http\Traits\TransformArrayTrait;
use App\Http\Controllers\Controller;
use App\Services\TaskService;
use Illuminate\Validation\Rules\Enum;
use App\Exceptions\InvalidParamException;
use App\Http\Resources\TaskResource;
use BenSampo\Enum\Rules\EnumValue;
use Illuminate\Pagination\Paginator;
use App\Enums\SeverityType;
use Throwable;

class TaskController extends Controller
{
    use TransformArrayTrait;
    protected TaskService $taskService;

    function __construct(TaskService $taskService)
    {
        $this->taskService = $taskService;
    }

  /**
   * Get all tasks
   *
   * @param Request $request
   * @return JsonResponse
   */
    public function getAllTasks(Request $request)
    {
      $tasks = $this->taskService->getAll($request);
      return response()->json([
        'tasks' => TaskResource::collection($tasks),
        'pagination' => [
          'total' => $tasks->total(),
          'hasMorePage' => $tasks->hasMorePages(),
          'currentPage' => $tasks->currentPage(),
          'lastPage'=> $tasks->lastPage(),
          'perPage' => $tasks->perPage()
        ]
      ]);
    }

  /**
   * Get task data by id
   *
   * @param string $id
   * @return JsonResponse
   */
    public function getTaskById(string $id): JsonResponse
    {
      $task = $this->taskService->getById($id);
        return response()->json(['task' => new TaskResource($task)]);
    }


    /**
     * Create new task
     *
     * @param Request $request
     *
     */
    public function createTask(Request $request): JsonResponse
    {
        $validatedData = $request->validate([
            'title' => 'required|max:255',
        ]);
        if ($request->has('categoryId')) {
          $validatedData['category_id'] = $request->categoryId;
        }
        $validatedData['created_by'] = $request->user()->id;
        $newTask = $this->taskService->create($validatedData);
        return response()->json(['id' => $newTask->id]);
    }

  /**
   * Create new task
   *
   * @param string $id
   * @return JsonResponse
   */
    public function deleteTask(string $id): JsonResponse
    {
      return response()->json(['success' => $this->taskService->delete($id)]);
    }

  /**
   * Update task
   *
   * @param Request $request
   * @return JsonResponse
   * @throws InvalidParamException
   */
    public function updateTask(Request $request): JsonResponse
    {
      if (empty($request->id)) {
        throw new InvalidParamException();
      }
      $validatedData = $request->validate([
        'title' => 'nullable',
        'description' => 'nullable',
        'acceptance' => 'nullable',
        'status' => "nullable|in:BACKLOG,PROGRESS,DONE",
        'dueDate' => 'nullable',
        'severity' =>  ['nullable', new EnumValue(SeverityType::class)],
      ]);
      $validatedData['createdBy'] = $request->user()->id;
      return response()->json(['success' => $this->taskService->update($request->id, $this->toSnake($validatedData))]);
    }
}

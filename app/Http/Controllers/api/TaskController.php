<?php

namespace App\Http\Controllers\api;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Http\Controllers\Controller;
use App\Services\TaskService;
use Illuminate\Validation\Rules\Enum;
use App\Http\Resources\TaskResource;
use BenSampo\Enum\Rules\EnumValue;
use App\Enums\SeverityType;


class TaskController extends Controller
{
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
    public function getAllTasks(Request $request): JsonResponse
    {
      $tasks = $this->taskService->getAll($request);
      return response()->json(['tasks' => TaskResource::collection($tasks)]);
    }

  /**
   * Get task data by id
   *
   * @param string $id
   * @return JsonResponse
   */
    public function getTaskById(string $id): JsonResponse
    {
      $newTask = $this->taskService->getById($id);
        return response()->json(['task' => new TaskResource($newTask)]);
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
   */
    public function updateTask(Request $request): JsonResponse
    {
        // TODO: handle validation fail
        $validatedData = $request->validate([
            'id' => 'required',
            'title' => 'nullable',
            'description' => 'nullable',
            'status' => "in:BACKLOG,PROGRESS,DONE",
            'due_date' => 'nullable',
            'severity' =>  ['required', new EnumValue(SeverityType::class)],
            'updated_by' => 'unique:users,id'
        ]);
        return response()->json(['success' => $this->taskService->update($validatedData)]);
    }
}

<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Http\Controllers\Controller;
use App\Services\TaskService;
use Illuminate\Validation\Rules\Enum;

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
     *
     */
    public function getAllTasks(Request $request) 
    {
        return response()->json(['tasks' => $taskId = $this->taskService->getAll()]);
    }

    /**
     * Get task data by id
     * 
     * @param Request $request
     *
     */
    public function getTaskById(string $id) 
    {
        return response()->json(['task' => $this->taskService->getById($id)]);
    }


    /**
     * Create new task
     * 
     * @param Request $request
     *
     */
    public function createTask(Request $request) 
    {
        $validatedData = $request->validate([
            'title' => 'required|max:255',
        ]);
        $newTask = $this->taskService->create($validatedData);
        return response()->json(['taskId' => $newTask->task_id]);
    }

    /**
     * Create new task
     * 
     * @param Request $request
     *
     */
    public function deleteTask(string $id) 
    {
        return response()->json(['success' => $this->taskService->delete($id)]);
    }

    /**
     * Update task
     * 
     * @param Request $request
     *
     */
    public function updateTask(Request $request) 
    {
        // TODO: handle validation fail
        $validatedData = $request->validate([
            'task_id' => 'required',
            'title' => 'nullable',
            'description' => 'nullable',
            'status' => "in:BACKLOG,PROGRESS,DONE",
            'due_date' => 'nullable',
            'updated_by' => 'nullable' // Should required as user uuid string
        ]);
        return response()->json(['success' => $this->taskService->update($validatedData)]);
    }
}

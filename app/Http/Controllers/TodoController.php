<?php

namespace App\Http\Controllers;

use App\Http\Requests\AddTodoRequest;
use App\Models\Todo;
use App\Services\AddTodoService;
use App\Services\UpdateTodoService;
use Illuminate\Http\Request;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class TodoController extends Controller
{
    use AuthorizesRequests;
    public function task(AddTodoRequest $request , AddTodoService $service)
    {
        $service->create($request->validated(),auth()->id());
        return response()->json([
            'success'=>true,
            'message'=>'task created successfuly',
        ],201);
    }
    public function getTodo(Request $request)
    {
        $task = Todo::where('user_id',auth()->id())->get();
        return response()->json([
            'success'=>true,
            'message'=>'get all task successfuly',
            'task'=>$task,
        ],200);
    }
    public function taskCompleted(Request $request , Todo $todo)
    {
        $this->authorize('update',$todo);
        $todo->is_completed = !$todo->is_completed;
        $todo->save();
        return response()->json($todo);
    }

    public function taskDelete(Request $request , Todo $todo)
    {
        $this->authorize('delete',$todo);
        $todo->delete();
        return response()->json([
            'success'=>true,
            'message'=>'delete task is successfuly',
        ],200);
    }
    public function taskUpdate(AddTodoRequest $request ,Todo $todo, UpdateTodoService $service)
    {
        $service->updateTask($todo , $request->validated());
        return response()->json([
            'success'=>true,
            'message'=>'update is successfuly',
        ]);
    }
}

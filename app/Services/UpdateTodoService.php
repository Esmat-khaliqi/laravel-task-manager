<?php
namespace App\Services;

use App\Models\Todo;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class UpdateTodoService
{
    use AuthorizesRequests;
    public function updateTask(Todo $todo, array $data):Todo
    {
        $this->authorize('update',$todo);
        $todo->update([
            'title'=>$data['title'],
            'description'=>$data['description'] ??null,
            'task_day'=>$data['task_day'],
            'due_date'=>$data['due_date'] ??null,
        ]);
        return $todo;
    }
}
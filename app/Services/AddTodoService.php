<?php
namespace App\Services;

use App\Models\Todo;

class AddTodoService
{
    public function create(array $data , int $userId):Todo
    {
        return Todo::create([
            'title'=>$data['title'],
            'description'=>$data['description'] ??null,
            'task_day'=>$data['task_day'],
            'due_date'=>$data['due_date'] ??null,
            'user_id'=>auth()->id(),
        ]);
    }
}
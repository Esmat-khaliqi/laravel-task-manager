<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Todo extends Model
{
    protected $fillable = 
    [
        'title',
        'description',
        'task_day',
        'due_date',
        'is_completed',
        'user_id',
    ];
}

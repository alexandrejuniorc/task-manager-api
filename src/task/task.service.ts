import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { TaskDto } from './task.dto';

@Injectable()
export class TaskService {
  private tasks: TaskDto[] = [];

  create(task: TaskDto) {
    this.tasks.push(task);
    console.log(this.tasks);
  }

  findById(id: string): TaskDto {
    const foundTask = this.tasks.filter((task) => task.id === id);

    if (foundTask.length === 0) {
      throw new HttpException(
        `Task with id ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }

    return foundTask[0];
  }

  update(task: TaskDto) {
    const taskIndex = this.tasks.findIndex((task) => task.id === task.id);

    if (taskIndex === -1) {
      throw new HttpException(
        `Task with id ${task.id} not found`,
        HttpStatus.BAD_REQUEST,
      );
    }

    this.tasks[taskIndex] = task;
    return;
  }
}

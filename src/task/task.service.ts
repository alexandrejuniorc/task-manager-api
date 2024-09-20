import { FindAllParameters, TaskDto } from './task.dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class TaskService {
  private tasks: TaskDto[] = [];

  create(task: TaskDto) {
    this.tasks.push(task);
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

  findAll(params: FindAllParameters): TaskDto[] {
    return this.tasks.filter((task) => {
      const match = true;

      if (params.title !== undefined && task.title !== params.title) {
        return false;
      }

      if (params.status !== undefined && task.status !== params.status) {
        return false;
      }

      return match;
    });
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

  delete(id: string) {
    const taskIndex = this.tasks.findIndex((task) => task.id === id);

    if (taskIndex === -1) {
      throw new HttpException(
        `Task with id ${id} not found`,
        HttpStatus.BAD_REQUEST,
      );
    }

    this.tasks.splice(taskIndex, 1);
    return;
  }
}

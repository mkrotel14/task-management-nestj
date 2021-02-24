import { Injectable } from '@nestjs/common';
import { TaskDTO } from './dto/task.dto';
import { GetTasksFilterDTO } from './dto/get-tasks-filter-dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskRepository } from './task.repository';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';
import { User } from 'src/auth/user.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository,
  ) {}

  async getTasks(filter: GetTasksFilterDTO, user: User): Promise<Task[]> {
    return await this.taskRepository.getTasks(filter, user);
  }

  async getTaskById(id: number, user: User): Promise<Task> {
    return await this.taskRepository.getTaskById(id, user);
  }

  async createTask(task: TaskDTO, user: User): Promise<Task> {
    return await this.taskRepository.createTask(task, user);
  }

  async deleteTask(id: number, user: User): Promise<void> {
    return await this.taskRepository.deleteTask(id, user);
  }

  async updateTaskStatus(
    id: number,
    status: TaskStatus,
    user: User,
  ): Promise<Task> {
    return await this.taskRepository.updateTask(id, status, user);
  }
}

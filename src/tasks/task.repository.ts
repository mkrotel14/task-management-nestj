import {
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { User } from 'src/auth/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { GetTasksFilterDTO } from './dto/get-tasks-filter-dto';
import { TaskDTO } from './dto/task.dto';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  private logger = new Logger('taskRepository');

  async getTasks(
    { status, search }: GetTasksFilterDTO,
    user: User,
  ): Promise<Task[]> {
    const query = this.createQueryBuilder('task');

    query.where('task.userId = :userId', { userId: user.id });

    status ? query.andWhere('task.status = :status', { status }) : '';

    search
      ? query.andWhere(
          '(task.title LIKE :search OR task.description LIKE :search)',
          { search: `%${search}%` },
        )
      : '';

    try {
      return await query.getMany();
    } catch (error) {
      this.logger.error(
        `Failed to get tasks for user ${user.username}`,
        error.stack,
      );
      throw new InternalServerErrorException();
    }
  }

  async getTaskById(id: number, user: User): Promise<Task> {
    const found = await this.findOne({ where: { id, userId: user.id } });

    if (!found) throw new NotFoundException(`Task with id '${id}' not found`);

    return found;
  }

  async createTask({ title, description }: TaskDTO, user: User): Promise<Task> {
    const task = new Task();

    task.title = title;
    task.description = description;
    task.status = TaskStatus.OPEN;
    task.user = user;
    await task.save();

    delete task.user;
    return task;
  }

  async updateTask(id: number, status: TaskStatus, user: User): Promise<Task> {
    const task = await this.getTaskById(id, user);

    task.status = status;
    task.save();

    return task;
  }

  async deleteTask(id: number, user): Promise<void> {
    const result = await this.delete({ id, userId: user.id });

    if (result.affected === 0)
      throw new NotFoundException(`Task with 'id' ${id} not found`);
  }
}

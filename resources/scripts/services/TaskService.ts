import { DefaultObjectType } from 'scripts/interfaces/Meta';
import { Task } from '../interfaces/Task';
import { httpClientWithAuth } from '../configs/httpClient';

class TaskService {
  public readonly path: string = '/tasks';

  getTasks = (sorter?: DefaultObjectType) => {
    if (sorter) {
      return httpClientWithAuth.get(this.path, {
        params: {
          ...sorter,
          action: 'sort'
        }
      });
    }
    return httpClientWithAuth.get(this.path);
  }

  public getTaskById = (id: number) => {
    return httpClientWithAuth.get(`${this.path}/${id}`);
  }

  public createTask = (task: Partial<Task>) => {
    return httpClientWithAuth.post(this.path, task);
  }

  public updateTask = (data: any) => {
    const { id, ...restData } = data;
    const url = `${this.path}/${id}`;
    return httpClientWithAuth.patch(url, restData);
  }

  public deleteTask = (id: number) => {
    return httpClientWithAuth.delete(`${this.path}/${id}`);
  }
}

export default TaskService;

import { Task } from '@utils/interfaces';
import { TaskParams } from '@store/slices/taskSlice';
import { httpClientWithAuth } from '@utils/httpClient';

class TaskService {
  public readonly path: string = '/tasks';

  makeParams(params?: TaskParams) {
    const { paginator, ...restParams } = params;
    return {
      ...restParams,
      page: paginator.currentPage,
      pageSize: paginator.perPage
    };
  }

  getTasks = (taskParams?: TaskParams) => {
    const params = this.makeParams(taskParams);
    return httpClientWithAuth.get(this.path, { params });
  };

  public getTaskById = (id: number) => {
    return httpClientWithAuth.get(`${this.path}/${id}`);
  };

  public createTask = (task: Partial<Task>) => {
    return httpClientWithAuth.post(this.path, task);
  };

  public updateTask = (data: any) => {
    const { id, ...restData } = data;
    const url = `${this.path}/${id}`;
    return httpClientWithAuth.patch(url, restData);
  };

  public deleteTask = (id: number) => {
    return httpClientWithAuth.delete(`${this.path}/${id}`);
  };
}

export default TaskService;

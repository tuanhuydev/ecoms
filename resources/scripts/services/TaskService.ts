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

  getTaskById = (id: number) => {
    return httpClientWithAuth.get(`${this.path}/${id}`);
  };

  createTask = (task: Partial<Task>) => {
    return httpClientWithAuth.post(this.path, task);
  };

  updateTask = (data: Partial<Task>) => {
    const { id, ...restData } = data;
    const url = `${this.path}/${id}`;
    return httpClientWithAuth.patch(url, restData);
  };

  deleteTask = (id: number) => {
    return httpClientWithAuth.delete(`${this.path}/${id}`);
  };

  getTaskCategories = () => {
    return httpClientWithAuth.get(`${this.path}/categories`);
  }
}

export default TaskService;

import { Account } from 'scripts/interfaces/Model';
import { httpClientWithAuth } from '../configs/httpClient';

class AccountService {
  static path: string = '/account';

  static updateAccount(data: Partial<Account>) {
    return httpClientWithAuth.patch(AccountService.path, data);
  }
}

export default AccountService;

import { Account } from '@utils/interfaces';
import { httpClientWithAuth } from '@utils/httpClient';

class AccountService {
  path: string = '/accounts';

  public patchAccount = (data: Partial<Account>) => {
    const { accountId, ...restData } = data;
    const url = `${this.path}/${accountId}`;
    return httpClientWithAuth.patch(url, restData);
  };
}

export default AccountService;

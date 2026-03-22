import axios from 'axios';

export interface RegisterAccount {
  email: string;
  langKey: string;
  login: string;
  password: string;
}

export default class RegisterService {
  processRegistration(account: RegisterAccount): Promise<void> {
    return axios.post('api/register', account);
  }
}

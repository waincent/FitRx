import { useMutation } from '@tanstack/vue-query';

import RegisterService, { type RegisterAccount } from './register.service';

export const useRegisterMutation = (registerService = new RegisterService()) =>
  useMutation({
    mutationFn: async (account: RegisterAccount) => {
      await registerService.processRegistration(account);
    },
  });

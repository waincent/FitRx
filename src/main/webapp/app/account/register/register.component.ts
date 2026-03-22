import { type Ref, computed, defineComponent, inject, ref } from 'vue';
import { useI18n } from 'vue-i18n';

import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Message from 'primevue/message';
import Password from 'primevue/password';
import { useField, useForm } from 'vee-validate';

import { useLoginModal } from '@/account/login-modal';
import { EMAIL_ALREADY_USED_TYPE, LOGIN_ALREADY_USED_TYPE } from '@/shared/jhipster/error.constants';

import type { RegisterAccount } from './register.service';
import { useRegisterMutation } from './use-register-mutation';

const loginPattern = /^[a-zA-Z0-9!$&*+=?^_`{|}~.-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$|^[_.@A-Za-z0-9-]+$/;

interface RegisterFormValues {
  confirmPassword: string;
  email: string;
  login: string;
  password: string;
}

export default defineComponent({
  name: 'Register',
  components: {
    Button,
    InputText,
    Message,
    Password,
  },
  setup() {
    const { showLogin } = useLoginModal();
    const currentLanguage = inject('currentLanguage', () => computed(() => navigator.language ?? 'zh-cn'), true);
    const registerService = inject('registerService', undefined, true);

    const error: Ref<string> = ref('');
    const errorEmailExists: Ref<string> = ref('');
    const errorUserExists: Ref<string> = ref('');
    const success: Ref<boolean> = ref(false);

    const { handleSubmit, setFieldValue } = useForm<RegisterFormValues>({
      initialValues: {
        confirmPassword: '',
        email: '',
        login: '',
        password: '',
      },
    });

    const { t } = useI18n();
    const registerMutation = useRegisterMutation(registerService);

    const buildRequiredValidator =
      (messageKey: string) =>
      (value: string | undefined): true | string =>
        value ? true : t(messageKey);
    const buildMinLengthValidator =
      (messageKey: string, length: number) =>
      (value: string | undefined): true | string =>
        !value || value.length >= length ? true : t(messageKey);
    const buildMaxLengthValidator =
      (messageKey: string, length: number) =>
      (value: string | undefined): true | string =>
        !value || value.length <= length ? true : t(messageKey);

    const {
      value: login,
      errorMessage: loginErrorMessage,
      meta: loginMeta,
    } = useField('login', value => {
      if (!value) return t('register.messages.validate.login.required');
      if (value.length < 1) return t('register.messages.validate.login.minlength');
      if (value.length > 50) return t('register.messages.validate.login.maxlength');
      if (!loginPattern.test(value)) return t('register.messages.validate.login.pattern');
      return true;
    });

    const {
      value: email,
      errorMessage: emailErrorMessage,
      meta: emailMeta,
    } = useField('email', value => {
      if (!value) return t('global.messages.validate.email.required');
      if (value.length < 5) return t('global.messages.validate.email.minlength');
      if (value.length > 254) return t('global.messages.validate.email.maxlength');
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? true : t('global.messages.validate.email.invalid');
    });

    const {
      value: password,
      errorMessage: passwordErrorMessage,
      meta: passwordMeta,
    } = useField('password', value => {
      if (!value) return t('global.messages.validate.newpassword.required');
      if (value.length < 4) return t('global.messages.validate.newpassword.minlength');
      if (value.length > 50) return t('global.messages.validate.newpassword.maxlength');
      return true;
    });

    const {
      value: confirmPassword,
      errorMessage: confirmPasswordErrorMessage,
      meta: confirmPasswordMeta,
    } = useField('confirmPassword', value => {
      const requiredResult = buildRequiredValidator('global.messages.validate.confirmpassword.required')(value);
      if (requiredResult !== true) return requiredResult;
      const minLengthResult = buildMinLengthValidator('global.messages.validate.confirmpassword.minlength', 4)(value);
      if (minLengthResult !== true) return minLengthResult;
      const maxLengthResult = buildMaxLengthValidator('global.messages.validate.confirmpassword.maxlength', 50)(value);
      if (maxLengthResult !== true) return maxLengthResult;
      return value === password.value ? true : t('global.messages.error.dontmatch');
    });

    const registerAccount = computed<RegisterAccount>(() => ({
      email: email.value,
      langKey: currentLanguage.value,
      login: login.value,
      password: password.value,
    }));

    const register = handleSubmit(async () => {
      error.value = '';
      errorUserExists.value = '';
      errorEmailExists.value = '';

      try {
        await registerMutation.mutateAsync(registerAccount.value);
        success.value = true;
      } catch (registrationError: any) {
        success.value = false;

        if (registrationError.response?.status === 400 && registrationError.response?.data?.type === LOGIN_ALREADY_USED_TYPE) {
          errorUserExists.value = 'ERROR';
        } else if (registrationError.response?.status === 400 && registrationError.response?.data?.type === EMAIL_ALREADY_USED_TYPE) {
          errorEmailExists.value = 'ERROR';
        } else {
          error.value = 'ERROR';
        }
      }
    });

    return {
      confirmPassword,
      confirmPasswordErrorMessage,
      confirmPasswordMeta,
      showLogin,
      currentLanguage,
      error,
      errorEmailExists,
      errorUserExists,
      success,
      registerAccount,
      login,
      loginErrorMessage,
      loginMeta,
      email,
      emailErrorMessage,
      emailMeta,
      password,
      passwordErrorMessage,
      passwordMeta,
      register,
      setFieldValue,
      isSubmitting: registerMutation.isPending,
      t$: t,
    };
  },
});

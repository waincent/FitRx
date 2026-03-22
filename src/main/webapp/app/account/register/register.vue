<template>
  <div>
    <div class="d-flex justify-content-center">
      <div class="col-md-8 toastify-container">
        <h1 id="register-title" data-cy="registerTitle">{{ t$('register.title') }}</h1>

        <Message v-if="success" severity="success">{{ t$('register.messages.success') }}</Message>
        <Message v-if="error" severity="error">{{ t$('register.messages.error.fail') }}</Message>
        <Message v-if="errorUserExists" severity="error">{{ t$('register.messages.error.userexists') }}</Message>
        <Message v-if="errorEmailExists" severity="error">{{ t$('register.messages.error.emailexists') }}</Message>
      </div>
    </div>
    <div class="d-flex justify-content-center">
      <div class="col-md-8">
        <form id="register-form" name="registerForm" @submit.prevent="register()" v-if="!success" no-validate>
          <div class="mb-3">
            <label class="form-control-label" for="username">{{ t$("global.form['username.label']") }}</label>
            <InputText
              id="username"
              v-model="login"
              name="login"
              class="w-100"
              :class="{ 'p-invalid': loginMeta.touched && loginErrorMessage }"
              :placeholder="t$('global.form[\'username.placeholder\']')"
              data-cy="username"
            />
            <small v-if="loginMeta.touched && loginErrorMessage" class="form-text text-danger">{{ loginErrorMessage }}</small>
          </div>
          <div class="mb-3">
            <label class="form-control-label" for="email">{{ t$("global.form['email.label']") }}</label>
            <InputText
              id="email"
              v-model="email"
              name="email"
              type="email"
              class="w-100"
              :class="{ 'p-invalid': emailMeta.touched && emailErrorMessage }"
              :placeholder="t$('global.form[\'email.placeholder\']')"
              data-cy="email"
            />
            <small v-if="emailMeta.touched && emailErrorMessage" class="form-text text-danger">{{ emailErrorMessage }}</small>
          </div>
          <div class="mb-3">
            <label class="form-control-label" for="firstPassword">{{ t$("global.form['newpassword.label']") }}</label>
            <Password
              id="firstPassword"
              v-model="password"
              name="password"
              class="w-100"
              :feedback="false"
              toggle-mask
              :input-class="passwordMeta.touched && passwordErrorMessage ? 'p-invalid w-100' : 'w-100'"
              :placeholder="t$('global.form[\'newpassword.placeholder\']')"
              data-cy="firstPassword"
            />
            <small v-if="passwordMeta.touched && passwordErrorMessage" class="form-text text-danger">{{ passwordErrorMessage }}</small>
          </div>
          <div class="mb-3">
            <label class="form-control-label" for="secondPassword">{{ t$("global.form['confirmpassword.label']") }}</label>
            <Password
              id="secondPassword"
              name="confirmPasswordInput"
              v-model="confirmPassword"
              class="w-100"
              :feedback="false"
              toggle-mask
              :input-class="confirmPasswordMeta.touched && confirmPasswordErrorMessage ? 'p-invalid w-100' : 'w-100'"
              :placeholder="t$('global.form[\'confirmpassword.placeholder\']')"
              data-cy="secondPassword"
            />
            <small v-if="confirmPasswordMeta.touched && confirmPasswordErrorMessage" class="form-text text-danger">
              {{ confirmPasswordErrorMessage }}
            </small>
          </div>

          <Button type="submit" :disabled="isSubmitting" data-cy="submit">{{ t$('register.form.button') }}</Button>
        </form>
        <p></p>
        <Message severity="warn">
          <span>{{ t$('global.messages.info.authenticated.prefix') }}</span>
          <a class="alert-link" @click="showLogin()">{{ t$('global.messages.info.authenticated.link') }}</a>
          <span>{{ t$('global.messages.info.authenticated.suffix') }}</span>
        </Message>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./register.component.ts"></script>

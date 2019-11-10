<template>
  <form @submit.prevent="submitForm">
    <div class="row q-mb-md">
      <q-banner dense class="bg-grey-3 col">
        <template v-slot:avatar>
          <q-icon name="account_circle" color="primary" />
        </template>
        {{ tab | titleCase }} Register to access your Todos anywhere!
      </q-banner>
    </div>
    <div class="row q-mb-md">
      <q-input
        outlined
        v-model="formData.email"
        class="col"
        stack-label
        label="Email"
        lazy-rules
        ref="email"
        :rules="[ val => isVAlidEmailAddress(val) || 'Please enter a valid email address.']"
      />
    </div>
    <div class="row q-mb-md">
      <q-input
        type="password"
        outlined
        v-model="formData.password"
        class="col"
        stack-label
        label="Password"
        lazy-rules
        ref="password"
        :rules="[ val => val.length >= 6 || 'Please enter at least 6 characters.']"
      />
    </div>
    <div class="row">
      <q-space />
      <q-btn color="primary" type="submit" :label="tab"></q-btn>
    </div>
  </form>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  props: ['tab'],
  data() {
    return {
      formData: {
        email: '',
        password: ''
      }
    };
  },
  methods: {
    ...mapActions('auth', ['registerUser', 'loginUser']),
    isVAlidEmailAddress(email) {
      var re = /\S+@\S+\.\S+/;

      return re.test(email);
    },
    submitForm() {
      this.$refs.email.validate();
      this.$refs.password.validate();
      if (!this.$refs.email.hasError && !this.$refs.password.hasError) {
        if (this.tab === 'login') {
          this.loginUser(this.formData);
        } else {
          this.registerUser(this.formData);
        }
      }
    }
  },
  filters: {
    titleCase(value) {
      return value.charAt(0).toUpperCase() + value.slice(1);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
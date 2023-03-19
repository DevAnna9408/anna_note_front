<template>
  <div id="sample-validation">
    <Form @submit="onSubmit" v-slot="{ errors }">
      <Field name="email" :rules="{ required: true }" />
      <span>{{ errors.email }}</span>
      <br />
      <Field
        name="password"
        :rules="{
          required: true,
          max: 16,
          regex:
            /(?=.*\d{1,})(?=.*[~`!@#$%\^&*()-+=]{1,})(?=.*[a-z]{1,})(?=.*[A-Z]{1,}).{8,16}$/,
        }"
      />
      <ErrorMessage name="password" />
      <br />
      <button class="btn btn-primary">Submit</button>
    </Form>
  </div>
</template>

<script>
import { Form, Field, ErrorMessage } from 'vee-validate'
export default {
  name: 'sample-validation',
  components: {
    Form,
    Field,
    ErrorMessage
  },
  setup () {
    const onSubmit = (values) => {
      // display form values on success
      alert('SUCCESS!! :-)\n\n' + JSON.stringify(values, null, 4))
    }
    return { onSubmit }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>

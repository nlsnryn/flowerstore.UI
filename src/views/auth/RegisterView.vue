<script setup>
import { reactive } from 'vue'
import DefaultInput from '@/components/DefaultInput.vue'
import DefaultButton from '@/components/DefaultButton.vue'
import { useAuthStore } from '@/stores/auth.store'
import { RouterLink } from 'vue-router'
import { useErrorStore } from '@/stores/error.store'
import { useField, useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as zod from 'zod'

const authStore = useAuthStore()
const errorStore = useErrorStore()

const validationSchema = toTypedSchema(
  zod.object({
    first_name: zod
      .string()
      .nonempty('Firstname is required')
      .min(6, { message: 'Firstname must atleast 6 char' }),
    last_name: zod
      .string()
      .nonempty('Last name is required')
      .min(2, { message: 'Lastname must a atleast 6 char' }),
    email: zod.string().nonempty('Email is required').email({ message: 'Invalid email format' }),
    password: zod
      .string()
      .nonempty('Password is required')
      .min(8, { message: 'Password must atleast 8 characters' }),
    password_confirmation: zod
      .string()
      .nonempty('Confirm password is required.')
      .refine((value) => value === password.value, {
        message: 'Passwords do not match.',
        path: ['password_confirmation']
      }),
    mobile_number: zod
      .string()
      .nonempty('Contact number is required.')
      .regex(/^\d+$/, {
        message: 'Contact number should contain only numbers.'
      })
      .length(11, { message: 'Contact number must be 11 digits.' }),
    address: zod.string().nonempty('Address is required')
  })
)

const { handleSubmit, errors } = useForm({ validationSchema })

const { value: first_name } = useField('first_name')
const { value: last_name } = useField('last_name')
const { value: email } = useField('email')
const { value: password } = useField('password')
const { value: password_confirmation } = useField('password_confirmation')
const { value: mobile_number } = useField('mobile_number')
const { value: address } = useField('address')

const onSubmit = handleSubmit(
  ({ first_name, last_name, email, password, password_confirmation, mobile_number, address }) => {
    authStore.register({
      first_name,
      last_name,
      email,
      password,
      password_confirmation,
      mobile_number,
      address
    })
  }
)

function getErrorBorder(field) {
  return errors.value[field]
    ? 'focus:ring-red-700 mb-0 border-red-700'
    : 'focus:ring-blue-700 focus:border-blue-700 mb-2'
}
</script>

<template>
  <section class="flex justify-center items-center min-h-screen">
    <div class="max-w-md w-full">
      <div v-if="errorStore.hasErrors" class="max-w-md mx-auto mb-2 px-2">
        <span class="text-xs font-medium uppercase tracking-wide text-red-500">{{
          errorStore.state.message
        }}</span>
      </div>
      <form @submit="onSubmit" class="border-2 border-blue-700 rounded-md px-6 py-5">
        <h1 class="text-blue-700 font-semibold text-3xl mb-10">Registration Form</h1>

        <div class="flex gap-3">
          <div class="flex flex-col w-1/2">
            <label for="fname">First name:</label>
            <default-input
              type="text"
              name="first_name"
              id="fname"
              placeholder="Nelson Ryan"
              :modelValue="first_name"
              @newValue="(newValue) => (first_name = newValue)"
              :errorBorder="getErrorBorder('first_name')"
              required
            />
            <span v-show="errors.first_name" class="text-xs ml-1 text-red-700 block mb-2">{{
              errors.first_name
            }}</span>
          </div>

          <div class="flex flex-col w-1/2">
            <label for="lname">Last name:</label>
            <default-input
              type="text"
              name="last_name"
              id="lname"
              placeholder="Arabit"
              :modelValue="last_name"
              @newValue="(newValue) => (last_name = newValue)"
              :errorBorder="getErrorBorder('last_name')"
              required
            />
            <span v-show="errors.last_name" class="text-xs ml-1 text-red-700 block mb-2">{{
              errors.last_name
            }}</span>
          </div>
        </div>

        <label for="email">Email:</label>
        <default-input
          type="email"
          name="email"
          id="email"
          placeholder="nelsonarabit@gmail.com"
          :modelValue="email"
          @newValue="(newValue) => (email = newValue)"
          :errorBorder="getErrorBorder('email')"
          required
        />
        <span v-show="errors.email" class="text-xs ml-1 text-red-700 block mb-2">{{
          errors.email
        }}</span>

        <label for="password">Password:</label>
        <default-input
          type="password"
          name="password"
          id="password"
          placeholder="********"
          :modelValue="password"
          @newValue="(newValue) => (password = newValue)"
          :errorBorder="getErrorBorder('password')"
          required
        />
        <span v-show="errors.password" class="text-xs ml-1 text-red-700 block mb-2">{{
          errors.password
        }}</span>

        <label for="confirm_password">Confirm Password:</label>
        <default-input
          type="password"
          name="password_confirmation"
          id="confirm_password"
          placeholder="********"
          :modelValue="password_confirmation"
          @newValue="(newValue) => (password_confirmation = newValue)"
          :errorBorder="getErrorBorder('password_confirmation')"
          required
        />
        <span v-show="errors.password_confirmation" class="text-xs ml-1 text-red-700 block mb-2">{{
          errors.password_confirmation
        }}</span>

        <div class="flex gap-3">
          <div class="flex flex-col w-1/2">
            <label for="number">Mobile number:</label>
            <default-input
              type="text"
              name="mobile_number"
              id="number"
              placeholder="09305782924"
              :modelValue="mobile_number"
              @newValue="(newValue) => (mobile_number = newValue)"
              :errorBorder="getErrorBorder('mobile_number')"
            />
            <span v-show="errors.mobile_number" class="text-xs ml-1 text-red-700 block mb-2">{{
              errors.mobile_number
            }}</span>
          </div>

          <div class="flex flex-col w-1/2">
            <label for="address">Address:</label>
            <default-input
              type="text"
              name="address"
              id="address"
              placeholder="Libid Binangonan Rizal"
              :modelValue="address"
              @newValue="(newValue) => (address = newValue)"
              :errorBorder="getErrorBorder('address')"
            />
            <span v-show="errors.address" class="text-xs ml-1 text-red-700 block mb-2">{{
              errors.address
            }}</span>
          </div>
        </div>

        <default-button type="submit" class="mt-5">REGISTER</default-button>
        <p class="text-sm text-blue-700 mt-2 font-medium">
          Already have an account?
          <span class="underline cursor-pointer"
            ><router-link :to="{ name: 'login' }">Login</router-link></span
          >
        </p>
      </form>
    </div>
  </section>
</template>

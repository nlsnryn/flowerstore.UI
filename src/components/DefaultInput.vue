<script setup>
import { defineProps, defineEmits } from 'vue'

defineEmits(['newValue'])
const props = defineProps({
  modelValue: [String, Number],
  errorBorder: String
})
</script>

<template>
  <input
    :class="props.errorBorder"
    class="input-text"
    :value="modelValue"
    @input="$emit('newValue', $event.target.value)"
  />
</template>

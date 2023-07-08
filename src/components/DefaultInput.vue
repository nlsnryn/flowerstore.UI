<script setup>
import { defineProps, defineEmits } from 'vue'

defineEmits(['newValue'])
const props = defineProps({
  modelValue: [String, Number]
})
</script>

<template>
  <input class="input-text" :value="modelValue" @input="$emit('newValue', $event.target.value)" />
</template>

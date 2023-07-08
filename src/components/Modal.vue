<script setup>
import { defineProps, defineEmits } from 'vue'

defineEmits(['store-order', 'close-modal'])
defineProps({
  activeModal: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <div
    v-show="activeModal"
    class="absolute w-full bg-black bg-opacity-30 h-screen top-0 left-0 flex justify-center px-8"
  >
    <div
      v-if="activeModal"
      class="p-4 bg-white self-start mt-40 sm:mt-32 max-w-screen-md rounded-md"
    >
      <slot />
      <div class="flex gap-3">
        <button
          @click="$emit('store-order')"
          class="text-white mt-3 sm:mt-8 bg-blue-800 py-1 px-3 sm:py-1 sm:px-6 rounded-md duration-150 hover:bg-blue-700 text-sm sm:text-base"
        >
          Okay
        </button>
        <button
          @click="$emit('close-modal')"
          class="text-gray-600 font-semibold mt-3 sm:mt-8 bg-gray-100 border-2 border-gray-600 py-1 px-3 sm:py-1 sm:px-6 rounded-md duration-150 text-sm sm:text-base"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
</template>

<template>
    <div class="app-container">
        <el-calendar v-model="value" class="maxwidth-1000">
        </el-calendar>
    </div>
</template>

<script>
  export default {
    data() {
      return {
        value: new Date()
      }
    }
  }
</script>

<style scoped>
.maxwidth-1000{
    max-width: 1000px;
}
</style>
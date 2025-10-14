<template>
  <div class="logo" @click.stop="handleLogoClick">LVMAOYA</div>
</template>

<script setup>
const handleLogoClick = async () => {
  await navigateTo("/home");
};
onMounted(() => {})
</script>

<style lang="scss" scoped>
.logo {
  cursor: pointer;
  color: #303030;
  user-select: none;

  img {
    width: auto;
    height: 22px;
  }

}
</style>

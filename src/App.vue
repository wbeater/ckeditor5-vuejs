<template>
  <v-app>
    <router-link class="nav-link" to="/grapes">Grapes Editor</router-link>&nbsp;
    <router-link class="nav-link" to="/image">Image Editor</router-link>&nbsp;
    <router-link class="nav-link" to="/inline">Inline Editor</router-link>

    <router-view />
  </v-app>
</template>

<script>
export default {
    data() {
      return {
        
      }
    }
}
</script>
<template>
  <v-app-bar app color="primary" dark class="text-uppercase">
    <v-icon large>mdi-book-open-variant</v-icon>
    <span class="font-weight-light">&nbsp; &nbsp; Book</span>
    <span>Retreat</span>

    <v-spacer></v-spacer>
    <router-link to="/Login">
      <v-btn tile outlined color="white">
        <v-icon left>mdi-login</v-icon> <span>Login</span>
      </v-btn>
    </router-link>

    <router-link to="/Sign-Up">
      <v-btn outlined color="white">Sign Up</v-btn>
    </router-link>
  </v-app-bar>
</template>

<script>
export default {
  name: "WelcomeBar",
};
</script>

<style>
</style>

<template>
  <v-card>
    <v-row justify="center">
      <v-avatar color="primary" size="62">
        <v-icon x-large color="white" class="">mdi-help-circle-outline</v-icon>
      </v-avatar>
    </v-row>
    <v-card-title class="justify-center"> Help and Documentation</v-card-title>
    <v-card-text
      >To view help and documentation for this menu, please click the help
      button below.</v-card-text
    >
    <a href="https://github.com/AdamBlunn/BookRetreatHelpDocs" target="blank"
      ><v-btn block tile dark color="primary">Help</v-btn></a
    >
  </v-card>
</template>

<script>
export default {
  name: "Help",
};
</script>

<style>
</style>
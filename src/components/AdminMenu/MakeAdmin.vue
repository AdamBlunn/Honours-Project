<template>
  <v-card>
    <v-row justify="center">
      <v-avatar color="primary" size="62">
        <v-icon x-large color="white">mdi-account-plus</v-icon>
      </v-avatar>
    </v-row>
    <v-card-title class="justify-center"> Make Admin</v-card-title>
    <v-card-text>
      Create a new Administrator user, giving them access to this dashboard. To
      do so enter the user's email address into the box below and press "Make
      Admin". Please note that the user must already have a book retreat
      account.
    </v-card-text>
    <v-form lazy-validation v-model="validAddress" ref="adminForm">
      <v-dialog v-model="dialog" persistent max-width="500">
        <template v-slot:activator="{ attrs }">
          <v-text-field
            outlined
            clearable
            label="Enter Email"
            v-model="email"
            :rules="[rules.requiredField.required, rules.emailRules.valid]"
          ></v-text-field>

          <v-btn
            color="primary"
            block
            v-bind="attrs"
            @click="findUser"
            :disabled="!validAddress"
          >
            Search
          </v-btn>
        </template>

        <!-- Dialogue form -->
        <v-card>
          <v-card-title class="headline">
            Make {{ this.email }} an Admin?
          </v-card-title>
          <v-card-text
            >Are you Sure you wish to make {{ this.email }} an Administrator
            user?
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" text @click="dialog = false"> No </v-btn>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="addAdmin"> Yes </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-form>
    <!-- Find user Error Message Snackbar -->
    <v-snackbar v-model="snackbar" color="error">
      {{ error }}

      <template v-slot:action="{ attrs }">
        <v-btn color="white" text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-card>
</template>

<script>
import { db } from "@/main.js";
export default {
  name: "MakeAdmin",
  data: () => ({
    email: "",
    validAddress: false,
    dialog: false,
    snackbar: false,
    error:
      "User does not exist in our system, Please ensure that you have the correct email address",
    rules: {
      requiredField: {
        required: (value) => !!value || "This is a required field", //if field is empty fail validation
      },
      emailRules: {
        valid: (value) =>
          /.+@.+/.test(value) || "Please enter a valid email address", //email address must have an @ symbol
      },
    },
  }),
  methods: {
    findUser() {
      let validForm = this.$refs.adminForm.validate();
      if (validForm == true) {
        let user = this.email;
        const docReference = db.collection("Users").doc(user);

        docReference.get().then((doc) => {
          if (doc.exists) {
            this.dialog = true;
          } else {
            console.log("Doc ref not found");
            this.snackbar = true;
          }
        });
      }
    },
    addAdmin() {
      db.collection("Users").doc(this.email).update({
        Admin: true,
      });
      this.dialog = false;
      this.$refs.adminForm.reset();
    },
  },
};
</script>

<style>
</style>
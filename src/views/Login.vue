<template>
  <div id="login">
    <v-card color="grey lighten-4" flat height="auto" tile>
      <!-- Banner -->
      <v-toolbar color="primary" dark dense>
        <router-link to="/">
          <v-icon class="pr-4">mdi-arrow-left</v-icon>
        </router-link>
        <v-icon large>mdi-book-open-variant</v-icon>
        <span class="font-weight-light">&nbsp; &nbsp; Book</span>
        <span>Retreat</span>
        <v-spacer></v-spacer>
        <v-toolbar-title class="align-center">Login</v-toolbar-title>

        <v-spacer></v-spacer>
      </v-toolbar>
    </v-card>

    <v-row justify="center">
      <v-col cols="11">
        <v-form ref="loginForm" id="login-Form" v-model="valid" lazy-validation>
          <v-row justify="center">
            <v-col cols="12">
              <v-text-field
                v-model="emailAddress"
                clearable
                :rules="[emailAddressRules.required, emailAddressRules.valid]"
                label="E-mail"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="password"
                clearable
                :append-icon="hide ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="[passwordRules.required, passwordRules.min]"
                :type="hide ? 'text' : 'password'"
                name="input-10-1"
                label="Password"
                hint="Password must be at least 8 characters long"
                counter
                @click:append="hide = !hide"
              ></v-text-field>
            </v-col>
            <!-- Password Input -->

            <v-spacer></v-spacer>
            <v-col cols="12">
              <v-btn block color="primary" @click="login" :disabled="!valid">
                Log In
              </v-btn>
            </v-col>
            <v-col cols="12">
              <v-btn block color="primary" to="/">Back</v-btn>
            </v-col>
          </v-row>
          <v-snackbar v-model="errorSnackbar" color="error">
            {{ errorMsg }}
            <template v-slot:action="{ attrs }">
              <v-btn
                color="white"
                text
                v-bind="attrs"
                @click="snackbar = false"
              >
                Close
              </v-btn>
            </template>
          </v-snackbar>
        </v-form>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import format from "date-fns/format";
import { auth } from "@/main.js";
import { db } from "@/main.js";
// import { fbFunctions } from "@/main.js";
export default {
  data: () => ({
    valid: false,
    link: "",
    emailAddress: "",
    emailAddressRules: {
      required: (value) => !!value || "Please enter your email address",
      valid: (value) =>
        /.+@.+/.test(value) || "Please enter a valid email address", //email address must have an @ symbol
    },
    password: "",
    hide: false,
    passwordRules: {
      required: (value) => !!value || "Password is Required.",
      min: (v) => v.length >= 8 || "Minimum 8 characters",
    },

    errorSnackbar: false,
    errorMsg: "",
  }),
  computed: {
    dateFormatted() {
      return this.date ? format(new Date(this.date), "dd/MM/yyyy") : "";
    },
  },
  methods: {
    //login function
    login() {
      const email = this.emailAddress;
      const password = this.password;
      let validform = this.$refs.loginForm.validate();
      if (validform == true) {
        auth
          .signInWithEmailAndPassword(email, password)
          .then((cred) => {
            console.log(cred);
            this.setLink();
            this.$refs.form.reset();
          })
          .catch((err) => {
            this.errorMsg = err.message;
            this.errorSnackbar = true;
          });
      }
    },
    setLink() {
      db.collection("Users")
        .doc(this.emailAddress)
        .get()
        .then((doc) => {
          if (doc.exists) {
            if (doc.data().Admin == true) {
              this.link = "/Admin-Home";

              this.$router.push(this.link);
            } else {
              this.link = "/Home";

              this.$router.push(this.link);
            }
          } else {
            console.log("Does Not Exist");
          }
        });
    },
  },
};
</script>

<style>
</style>
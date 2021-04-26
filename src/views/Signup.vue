<template>
  <div id="Signup">
    <v-card color="grey lighten-4" flat height="auto" tile>
      <v-toolbar color="primary" dark dense>
        <router-link to="/">
          <v-icon class="pr-4">mdi-arrow-left</v-icon>
        </router-link>
        <v-icon large>mdi-book-open-variant</v-icon>
        <span class="font-weight-light">&nbsp; &nbsp; Book</span>
        <span>Retreat</span>
        <v-spacer></v-spacer>
        <v-toolbar-title class="align-center">Sign Up</v-toolbar-title>

        <v-spacer></v-spacer>
      </v-toolbar>
    </v-card>
    <v-container>
      <!-- Signup Form -->
      <v-row justify="space-between">
        <v-col cols="12">
          <v-form
            ref="signupForm"
            id="signup-form"
            v-model="valid"
            lazy-validation
          >
            <v-row>
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
                <!-- Password Input -->
                <v-text-field
                  v-model="password"
                  clearable
                  :append-icon="hide ? 'mdi-eye' : 'mdi-eye-off'"
                  :rules="[passwordRules.required, passwordRules.min]"
                  :type="hide ? 'text' : 'password'"
                  label="Password"
                  hint="Password must be at least 8 characters long"
                  counter
                  @click:append="hide = !hide"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-btn
                  color="primary"
                  block
                  tile
                  id="Signup"
                  @click="signUp"
                  :disabled="!valid"
                  >Sign Up</v-btn
                >
              </v-col>
              <v-col cols="12">
                <v-btn color="primary" block tile to="/" :disabled="!valid"
                  >Cancel</v-btn
                >
              </v-col>
            </v-row>
          </v-form>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import format from "date-fns/format";
import { db } from "@/main.js";
import { auth } from "@/main.js";
export default {
  data: () => ({
    valid: true,

    emailAddress: "",
    emailAddressRules: {
      required: (blank) => !!blank || "Please enter your email address",
      valid: (value) =>
        /.+@.+/.test(value) || "Please enter a valid email address", //email address must have an @ symbol
    },
    password: "",
    hide: false,
    passwordRules: {
      required: (value) => !!value || "Required.",
      min: (v) => v.length >= 8 || "Minimum 8 characters",
    },
    date: new Date().toISOString().substr(0, 10),
  }),
  computed: {
    dateFormatted() {
      return this.date ? format(new Date(this.date), "dd/MM/yyyy") : "";
    },
  },
  methods: {
    signUp() {
      const email = this.emailAddress;
      const password = this.password;
      let validform = this.$refs.signupForm.validate();
      if (validform == true) {
        auth.createUserWithEmailAndPassword(email, password).then((cred) => {
          console.log(cred);
          db.collection("Users").doc(this.emailAddress).set({
            Admin: false,
          });
          db.collection("Users")
            .doc(this.emailAddress)
            .collection("Cart")
            .doc("Cart")
            .set({
              Titles: [],
            });
          db.collection("Users")
            .doc(this.emailAddress)
            .collection("Invoices")
            .add({});
          this.$refs.form.reset();
        });
        console.log("Account Created");
        this.$router.push("/");
      }
    },
  },
};
</script>

<style>
</style>
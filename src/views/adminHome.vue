<template>
  <div>
    <v-toolbar color="primary" dark dense>
      <v-icon large>mdi-book-open-variant</v-icon>
      <span class="font-weight-light">&nbsp; &nbsp; Book</span>
      <span>Retreat</span>
      <v-spacer></v-spacer>
      <v-toolbar-title class="align-center">Administrator Menu</v-toolbar-title>

      <v-spacer></v-spacer>
      <router-link to="/">
        <v-btn primary dark text @click="logout">Logout</v-btn>
      </router-link>
    </v-toolbar>
    <!-- Card Menu -->
    <v-container>
      <v-row>
        <!--  Add Book -->
        <v-col cols="12" lg="4" xl="4">
          <AddBook />
        </v-col>

        <!-- Add Stock -->
        <v-col cols="12" lg="4" xl="4">
          <AddStock />
        </v-col>
        <!-- Edit Book -->
        <v-col cols="12" lg="4" xl="4">
          <EditBook />
        </v-col>
      </v-row>
      <v-row>
        <!-- Delete Book -->
        <v-col cols="12" lg="4" xl="4">
          <DeleteBook />
        </v-col>
        <v-col cols="12" lg="4">
          <Discount />
        </v-col>
        <!-- Make Admin -->
        <v-col cols="12" lg="4" xl="4">
          <MakeAdmin />
        </v-col>
      </v-row>
      <v-row justify-lg="center">
        <!-- Help -->
        <v-col cols="12" lg="4" xl="4">
          <Help />
        </v-col>
      </v-row>
    </v-container>
    <v-spacer></v-spacer>
  </div>
</template>

<script>
import AddBook from "../components/AdminMenu/AddBook";
import AddStock from "../components/AdminMenu/AddStock";
import EditBook from "../components/AdminMenu/EditBook";
import DeleteBook from "../components/AdminMenu/DeleteBook";
import MakeAdmin from "../components/AdminMenu/MakeAdmin";
import Discount from "../components/AdminMenu/Discount";
import Help from "../components/AdminMenu/Help";
import { auth } from "@/main.js";
export default {
  name: "AdminHome",
  components: {
    AddBook,
    AddStock,
    EditBook,
    DeleteBook,
    Discount,
    MakeAdmin,
    Help,
  },
  methods: {
    logout() {
      auth.signOut().then(() => {
        console.log("Logging out...");
      });
    },
  },
};
</script>

<style>
</style>
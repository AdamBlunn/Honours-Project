<template>
  <!-- Delete Menu Card -->
  <v-card>
    <v-row justify="center">
      <v-avatar color="primary" size="62">
        <v-icon x-large color="white" class="">mdi-book-remove</v-icon>
      </v-avatar>
    </v-row>
    <v-card-title class="justify-center"> Delete Book</v-card-title>
    <v-card-text
      >Permenantly Delete a book from the database. Only to be done if
      absolutely neccesary. To find the book, please enter the book's ISBN into
      the text box below and click search. Please note that the book's page will
      still need to be manually wiped
    </v-card-text>
    <v-form lazy-validation v-model="validBook" ref="deleteSearch">
      <v-dialog v-model="dialog" persistent max-width="500">
        <template v-slot:activator="{ attrs }">
          <v-text-field
            outlined
            clearable
            label="Enter ISBN"
            v-model="isbn"
            :rules="[rules.requiredField.required, rules.book.check]"
          ></v-text-field>
          <v-btn
            color="red darken-1"
            class="white--text"
            block
            v-bind="attrs"
            @click="findBook"
            :disabled="!validBook"
          >
            Delete Book
          </v-btn>
        </template>

        <!-- Dialogue form -->
        <v-card>
          <v-card-title class="headline">
            Delete {{ this.title }}?
          </v-card-title>
          <v-card-text
            >Are you Sure you wish to delete {{ this.title }} by
            {{ this.author }}?</v-card-text
          >
          <v-card-actions>
            <v-btn color="primary" text @click="dialog = false"> No </v-btn>
            <v-spacer></v-spacer>
            <v-btn color="red darken-1" text @click="deleteBook"> Yes </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-form>
    <!-- Find book Error Message Snackbar -->
    <v-snackbar v-model="snackbarSearch" color="primary">
      {{ searchError }}

      <template v-slot:action="{ attrs }">
        <v-btn color="red" text v-bind="attrs" @click="snackbarSearch = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-card>
</template>

<script>
import { db } from "@/main.js";

export default {
  name: "DeleteBook",
  data: () => ({
    snackbarSearch: false,
    searchError:
      "Book does not exist in our system, Please ensure that you have the correct ISBN",
    dialog: false,
    menu: false,
    validBook: false,
    title: "",
    author: "",
    isbn: "",
    published: "",
    rules: {
      requiredField: {
        required: (value) => !!value || "This is a required field", //if field is empty fail validation
      },
      book: {
        check: (isbn) => isbn.length == 10 || "ISBN must be 10 characters",
      },
    },
  }),
  methods: {
    findBook() {
      let validForm = this.$refs.deleteSearch.validate();
      if (validForm == true) {
        let isbn = this.isbn;
        const docReference = db.collection("Books").doc(isbn);
        console.log(docReference);
        docReference.get().then((doc) => {
          if (doc.exists) {
            console.log(doc.data());
            this.title = doc.data().Title;
            this.author = doc.data().Author;

            this.dialog = true;
          } else {
            console.log("Doc ref not found");
            this.dialog = false;
            this.snackbarSearch = true;
          }
        });
      }
    },
    deleteBook() {
      let isbn = this.isbn;
      const docReference = db.collection("Books").doc(isbn);
      docReference.delete();
      this.$refs.deleteSearch.reset;
      this.dialog = false;
    },
  },
};
</script>

<style>
</style>
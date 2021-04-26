<template>
  <v-card>
    <v-row justify="center">
      <v-avatar color="primary" size="62">
        <v-icon x-large color="white" class="">mdi-book-plus</v-icon>
      </v-avatar>
    </v-row>
    <v-card-title class="justify-center"> Add Book</v-card-title>
    <v-card-text>
      Add New Books to the Online Database. Please note that this will only add
      them to the back end. Front-end webpages must still be added manually for
      each item.
    </v-card-text>
    <!-- Pop Up Menu -->
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn block tile color="primary" dark v-bind="attrs" v-on="on">
          Add Book
        </v-btn>
      </template>
      <v-card>
        <v-form lazy-validation v-model="isValid" ref="addBook">
          <v-card-title>
            <span class="headline">Add New Book</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model="isbn"
                    outlined
                    clearable
                    :rules="[rules.requiredField.required, rules.book.check]"
                    label="ISBN*"
                    hint="Enter the ISBN of the book"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="title"
                    outlined
                    clearable
                    :rules="[rules.requiredField.required]"
                    label="Book Title*"
                    hint="Enter The title of the book"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="author"
                    outlined
                    clearable
                    :rules="[rules.requiredField.required]"
                    label="Author*"
                    required
                    hint="Enter the name of the author"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-select
                    v-model="genre"
                    :items="[
                      'Fantasy',
                      'History',
                      'Cyberpunk',
                      'Science Fiction',
                      'Horror',
                      'Literary',
                      'Superhero',
                      'Guidebook',
                    ]"
                    :rules="[rules.requiredField.required]"
                    required
                    label="Genre*"
                    outlined
                    hint="Select a genre"
                  ></v-select>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="pages"
                    outlined
                    clearable
                    label="Length*"
                    :rules="[rules.requiredField.required]"
                    type="number"
                    hint="Enter the number of pages in the book"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model.number="price"
                    outlined
                    clearable
                    label="Price*"
                    :rules="[rules.requiredField.required]"
                    type="number"
                    hint="Enter the price of the Book"
                    prefix="£"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="4">
                  <v-select
                    v-model="bookFormat"
                    :items="['Paperback', 'Hardback', 'Graphic Novel']"
                    label="Format*"
                    :rules="[rules.requiredField.required]"
                    hint="Enter the format of the book"
                    outlined
                    required
                  ></v-select>
                </v-col>
                <v-col cols="12" md="4">
                  <v-select
                    :rules="[rules.requiredField.required]"
                    v-model="type"
                    :items="['Fiction', 'Non-Fiction']"
                    label="Type"
                    outlined
                    required
                    hint="Please Select a type of book"
                  ></v-select>
                </v-col>
                <v-col cols="12" md="4">
                  <!-- Date selector  -->
                  <v-menu
                    v-model="menu"
                    :close-on-content-click="false"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="pubDate"
                        label="Date Published"
                        prepend-icon="mdi-calendar"
                        readonly
                        required
                        :rules="[rules.requiredField.required]"
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="date"
                      @input="menu2 = false"
                    ></v-date-picker>
                  </v-menu>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="publisher"
                    clearable
                    label="Publisher"
                    outlined
                    :rules="[rules.requiredField.required]"
                    hint="Please enter the book's publisher"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model.number="stock"
                    outlined
                    clearable
                    label="Stock*"
                    type="number"
                    :rules="[rules.requiredField.required]"
                    hint="Enter how many of copies of the book are in stock"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="link"
                    outlined
                    clearable
                    :rules="[rules.requiredField.required]"
                    label="Vue Router Link*"
                    hint="Enter The Vue Router Link To the Book's Single File Component"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-textarea
                    v-model="description"
                    outlined
                    label="Description*"
                    type="text"
                    :rules="[rules.requiredField.required]"
                    hint="Enter the book's description"
                    auto-grow
                    required
                  ></v-textarea>
                </v-col>
                <v-col cols="12">
                  <v-file-input
                    outlined
                    show-size
                    counter
                    :rules="[rules.requiredField.required]"
                    hint="Upload the book's cover"
                    label="Cover Image"
                    prepend-inner-icon="mdi-camera"
                    prepend-icon=""
                    accept="image/*"
                    v-model="cover"
                  ></v-file-input>
                </v-col>
              </v-row>
            </v-container>
            <small>*indicates required field</small>
          </v-card-text>
          <v-card-actions>
            <v-btn color="blue darken-1" text @click="close"> Close </v-btn>
            <v-spacer></v-spacer>
            <v-btn
              color="blue darken-1"
              text
              @click="validateInputs"
              :disabled="!isValid"
            >
              Add To Database
            </v-btn>
            <v-snackbar v-model="snackbar" color="error">
              {{ errorMessage }}

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
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
import { db } from "@/main.js";
import { storage } from "@/main.js";
import format from "date-fns/format";

export default {
  name: "AddBook",
  data: () => ({
    snackbar: false,
    errorMessage:
      "You appear to have entered an incorrect value in the form, please enter the correct information",
    dialog: false,
    isValid: false,
    menu: false,
    title: "",
    author: "",
    link: "",
    genre: "",
    bookFormat: "",
    pages: 0,
    publisher: "",
    price: 0,
    stock: 0,
    description: "",
    type: "",
    isbn: "",
    cover: "",
    date: new Date().toISOString().substr(0, 10),
    rules: {
      requiredField: {
        required: (value) => !!value || "This is a required field", //if field is empty fail validation
      },
      book: {
        check: (isbn) => isbn.length == 10 || "ISBN must be 10 characters",
      },
    },
  }),
  computed: {
    pubDate() {
      return this.date ? format(new Date(this.date), "dd/MM/yyyy") : "";
    },
  },
  methods: {
    validateInputs() {
      let validForm = this.$refs.addBook.validate();
      if (validForm == true) {
        if (
          this.isbn.length == 10 &&
          Number.isInteger(parseInt(this.pages)) == true &&
          Number.isInteger(parseInt(this.stock)) == true
        ) {
          this.addBook();
        } else {
          this.snackbar = true;
          console.log(
            Number.isInteger(parseInt(this.pages)),
            Number.isInteger(parseInt(this.stock)),
            this.isbn.length
          );
        }
      }
    },
    close() {
      this.dialog = false;
      this.$refs.addBook.reset();
    },
    addBook() {
      let storageRef = storage.ref("Covers/" + this.title);
      db.collection("Books").doc(this.isbn).set({
        Title: this.title,
        Author: this.author,
        Genre: this.genre,
        Format: this.bookFormat,
        Pages: this.pages,
        Publisher: this.publisher,
        Price: this.price,
        Stock: this.stock,
        Description: this.description,
        Type: this.type,
        Published: this.pubDate,
        Cover: storageRef.toString(),
      });

      storageRef.put(this.cover);
      this.$refs.addBook.reset();

      this.dialog = false;
    },
  },
};
</script>

<style>
</style>
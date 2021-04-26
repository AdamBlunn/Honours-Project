<template>
  <v-card>
    <v-row justify="center">
      <v-avatar color="primary" size="62">
        <v-icon x-large color="white" class="">mdi-book-edit</v-icon>
      </v-avatar>
    </v-row>
    <v-card-title class="justify-center"> Edit Existing Book</v-card-title>
    <v-card-text
      >Edit the details of a book that already exists within the database. To
      find the book, please enter the book's ISBN into the text box below and
      click search.
    </v-card-text>

    <!-- Pop Up Menu -->
    <v-form lazy-validation v-model="validBook" ref="editSearch">
      <v-text-field
        outlined
        clearable
        label="Enter ISBN"
        :rules="[rules.requiredField.required, rules.book.check]"
        v-model="isbn"
      ></v-text-field>
      <v-dialog
        v-model="dialog"
        persistent
        max-width="600px"
        :disabled="!validBook"
      >
        <template v-slot:activator="{ attrs }">
          <v-btn
            block
            tile
            color="primary"
            v-bind="attrs"
            @click="findBook"
            :disabled="!validBook"
          >
            Search
          </v-btn>
        </template>

        <!-- Edit Book Form -->
        <v-card>
          <v-form lazy-validation v-model="isValid" ref="Edit">
            <v-card-title>
              <span class="headline"
                >Update {{ this.title }}&#39;s Details</span
              >
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <p>
                      Edit the details of {{ this.title }} and then click Update
                      Record <br />
                      <strong>Note:</strong> If you wish to update a Book's ISBN
                      You must delete the existing book and re-add it. <br />
                      <strong>ISBN:</strong> {{ this.isbn }}
                    </p>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      v-model="title"
                      outlined
                      clearable
                      label="Book Title*"
                      :rules="[rules.requiredField.required]"
                      hint="Enter The title of the book"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      v-model="author"
                      outlined
                      clearable
                      label="Author*"
                      :rules="[rules.requiredField.required]"
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
                      type="number"
                      :rules="[rules.requiredField.required]"
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
                      type="number"
                      :rules="[rules.requiredField.required]"
                      hint="Enter the price of the Book"
                      prefix="£"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="4">
                    <v-select
                      v-model="bookFormat"
                      :items="['Paperback', 'Hardback', 'Graphic Novel']"
                      label="Format*"
                      hint="Enter the format of the book"
                      outlined
                      :rules="[rules.requiredField.required]"
                      required
                    ></v-select>
                  </v-col>
                  <v-col cols="12" sm="4">
                    <v-select
                      v-model="type"
                      :items="['Fiction', 'Non-Fiction']"
                      label="Type"
                      outlined
                      :rules="[rules.requiredField.required]"
                      hint="Please Select a type of book"
                    ></v-select>
                  </v-col>
                  <v-col cols="12" sm="4">
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
                          clearable
                          label="Date Published"
                          prepend-icon="mdi-calendar"
                          readonly
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
                      clearable
                      label="Description*"
                      type="text"
                      hint="Enter the book's description"
                      auto-grow
                      :rules="[rules.requiredField.required]"
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
              <v-btn color="primary" text @click="dialog = false">
                Close
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn
                color="primary"
                text
                @click="validateInputs"
                :disabled="!isValid"
              >
                Update Record
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
    </v-form>
    <!-- Find Book Error -->
    <v-snackbar v-model="snackbarSearch" color="error">
      {{ searchError }}

      <template v-slot:action="{ attrs }">
        <v-btn
          color="white"
          text
          v-bind="attrs"
          @click="snackbarSearch = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-card>
</template>
 


<script>
import { db } from "@/main.js";
import { storage } from "@/main.js";
import format from "date-fns/format";

export default {
  name: "EditBook",
  data: () => ({
    dialog: false,
    menu: false,
    snackbar: false,
    snackbarSearch: false,
    validBook: false,
    isValid: false,
    searchError:
      "Book does not exist in our system, Please ensure that you have the correct ISBN",
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
    published: "",
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
    findBook() {
      let validForm = this.$refs.editSearch.validate();
      if (validForm == true) {
        console.log("Form Test ");
        let isbn = this.isbn;
        const docReference = db.collection("Books").doc(isbn);

        docReference.get().then((doc) => {
          if (doc.exists) {
            console.log(doc.data());
            this.title = doc.data().Title;
            this.author = doc.data().Author;
            this.genre = doc.data().Genre;
            this.bookFormat = doc.data().Format;
            this.publisher = doc.data().Publisher;
            this.stock = doc.data().Stock;
            this.pages = doc.data().Pages;
            this.price = doc.data().Price;
            this.pubDate = doc.data().Published;
            this.type = doc.data().Type;
            this.link = doc.data().Link;
            this.description = doc.data().Description;
            this.dialog = true;
          } else {
            console.log("Doc ref not found");
            this.snackbarSearch = true;
          }
        });
      } else {
        this.validBook = false;
        this.dialog = false;
      }
    },
    validateInputs() {
      let validForm = this.$refs.Edit.validate();
      if (validForm == true) {
        if (
          this.isbn.length == 10 &&
          Number.isInteger(parseInt(this.pages)) == true &&
          Number.isInteger(parseInt(this.stock)) == true
        ) {
          this.updateBook();
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
    updateBook() {
      let isbn = this.isbn;
      const docReference = db.collection("Books").doc(isbn);
      let storageRef = storage.ref("Covers/" + this.title);

      docReference.update({
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
        Link: this.link,
        Cover: storageRef.toString(),
      });
      storageRef.put(this.cover);
      this.$refs.Edit.reset();
      this.$refs.editSearch.reset();
      this.dialog = false;
    },
  },
};
</script>

<style>
</style>
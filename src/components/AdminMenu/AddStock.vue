<template>
  <!-- Add New Stock Admin Card -->
  <v-card>
    <v-row justify="center">
      <v-avatar color="primary" size="62">
        <v-icon x-large color="white" class="">mdi-book-plus-multiple</v-icon>
      </v-avatar>
    </v-row>
    <v-card-title class="justify-center">
      Add Stock to existing Book</v-card-title
    >
    <v-card-text
      >Add new stock to an existing book. To find the book, please enter the
      book's ISBN into the text box below and click search.
    </v-card-text>

    <v-form lazy-validation v-model="validBook" ref="stockSearch">
      <v-dialog v-model="dialog" persistent max-width="600px">
        <template v-slot:activator="{ attrs }">
          <v-text-field
            clearable
            outlined
            label="Enter ISBN"
            v-model="isbn"
            :rules="[rules.requiredField.required, rules.book.check]"
          ></v-text-field>
          <v-btn
            block
            tile
            color="primary"
            v-bind="attrs"
            :disabled="!validBook"
            @click="findBook"
          >
            Search For Book
          </v-btn>
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
        </template>
        <!-- Add New Stock Form -->
        <v-card>
          <v-form lazy-validation v-model="isValid" ref="stockAdd">
            <v-card-title>
              <span class="headline">Add New stock</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <h1>Book Details</h1>
                    <br />
                    <p>
                      <strong>Title:</strong> {{ this.title }} <br />
                      <strong>Author:</strong> {{ this.author }} <br />
                      <strong>Genre:</strong> {{ this.genre }} <br />
                      <strong>Publisher:</strong> {{ this.publisher }} <br />
                      <strong>Format:</strong> {{ this.format }} <br />
                      <strong>Current Stock:</strong> {{ this.existingStock }}
                    </p>
                    <p>
                      Enter how many copies of {{ this.title }} you would like
                      to add to stock
                    </p>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      v-model="stock"
                      outlined
                      type="number"
                      clearable
                      :rules="[rules.requiredField.required]"
                      label="Number of Copies"
                      hint="Enter the number of copies you have"
                      required
                    ></v-text-field>
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
                :disabled="!isValid"
                text
                @click="addStock"
              >
                Update Record
              </v-btn>

              <!-- Error Message -->
              <v-snackbar v-model="snackbarAdd" color="error">
                {{ addError }}

                <template v-slot:action="{ attrs }">
                  <v-btn
                    color="white"
                    text
                    v-bind="attrs"
                    @click="snackbarAdd = false"
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
  </v-card>
</template>

<script>
import { db } from "@/main.js";

export default {
  name: "AddStock",
  data: () => ({
    dialog: false,
    snackbarSearch: false,
    snackbarAdd: false,
    validBook: false,
    isValid: false,
    addError:
      "Please ensure that you have entered a number for the ammount of stock you wish to add",
    searchError:
      "Book does not exist in our system, Please ensure that you have the correct ISBN",
    isbn: "",
    title: "",
    author: "",
    genre: "",
    format: "",
    publisher: "",
    stock: 0,
    existingStock: 0,
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
      let validForm = this.$refs.stockSearch.validate();
      if (validForm == true) {
        let isbn = this.isbn;
        // create local book ref by fetching firebase ref (ISBN)
        const docReference = db.collection("Books").doc(isbn);
        console.log(docReference);
        //Get book via ref
        docReference.get().then((doc) => {
          if (doc.exists) {
            console.log(doc.data());
            this.title = doc.data().Title;
            this.author = doc.data().Author;
            this.genre = doc.data().Genre;
            this.format = doc.data().Format;
            this.publisher = doc.data().Publisher;
            this.existingStock = doc.data().Stock;
            this.dialog = true;
          } else {
            console.log("Doc ref not found");
            this.snackbarSearch = true;
          }
        });
      }
    },
    close() {
      this.dialog = false;
      this.$refs.stockAdd.reset();
    },
    addStock() {
      //Validation
      let validForm = this.$refs.stockAdd.validate();
      if (validForm == true) {
        if (Number.isInteger(parseInt(this.stock)) == true) {
          //Add Stock
          let isbn = this.isbn;
          const docReference = db.collection("Books").doc(isbn);
          let stockToAdd = parseInt(this.existingStock) + parseInt(this.stock);
          docReference.update({
            Stock: stockToAdd,
          });

          this.dialog = false;
        } else {
          // Display Error
          this.snackbarAdd = true;
        }
        this.$refs.stockSearch.reset();
        this.$refs.stockAdd.reset();
      }
    },
  },
};
</script>

<style>
</style>
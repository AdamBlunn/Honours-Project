<template>
  <!-- Admin Menu Card -->
  <v-card>
    <v-row justify="center">
      <v-avatar color="primary" size="62">
        <v-icon x-large color="white" class="">mdi-sale</v-icon>
      </v-avatar>
    </v-row>
    <v-card-title class="justify-center"> Apply Discount</v-card-title>
    <v-card-text>
      Apply a discount of either 25% or 50% to a book, changing it's sale price.
      To find the book, please enter the book's ISBN into the text box below and
      click search. Once the Book is found, select a discount type from the
      pop-up menu.
    </v-card-text>
    <v-form lazy-validation v-model="validBook" ref="discount">
      <v-dialog v-model="dialog" persistent max-width="500">
        <template v-slot:activator="{ attrs }">
          <v-text-field
            outlined
            clearable
            label="Enter ISBN"
            :rules="[rules.requiredField.required, rules.book.check]"
            v-model="isbn"
          ></v-text-field>
          <v-btn
            color="primary"
            block
            v-bind="attrs"
            @click="findBook"
            :disabled="!validBook"
          >
            Search for Book
          </v-btn>
        </template>

        <!-- Dialogue form -->
        <v-card>
          <v-form lazy-validation v-model="isValid" ref="DiscountApply">
            <v-card-title class="headline">
              Apply discount to {{ this.title }}?
            </v-card-title>
            <v-card-text>
              What kind of discount would you like to apply to
              {{ this.title }} by {{ this.author }}?
            </v-card-text>
            <v-row justify="center">
              <v-col cols="6">
                <v-select
                  v-model="discount"
                  :items="['No Discount', '25%', '50%']"
                  label="Discount"
                  outlined
                  :rules="[rules.requiredField.required]"
                  hint="Please Select a Discount to Apply to This Book "
                ></v-select>
              </v-col>
            </v-row>
            <v-card-actions>
              <v-btn color="primary" text @click="dialog = false"> No </v-btn>
              <v-spacer></v-spacer>
              <v-btn
                color="primary"
                text
                @click="applyDiscount"
                :disabled="!isValid"
              >
                Yes
              </v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-dialog>
    </v-form>
    <!-- Find book Error Message Snackbar -->
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

export default {
  name: "Discount",
  data: () => ({
    snackbarSearch: false,
    searchError:
      "Book does not exist in our system, Please ensure that you have the correct ISBN",
    dialog: false,
    menu: false,
    validBook: false,
    isValid: false,
    title: "",
    author: "",
    isbn: "",
    discount: "",
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
      let validForm = this.$refs.discount.validate();
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
            console.log(this.pubDate);
          } else {
            console.log("Doc ref not found");
            this.snackbarSearch = true;
            this.dialog = false;
          }
        });
      }
    },
    applyDiscount() {
      let validForm = this.$refs.DiscountApply.validate();
      if (validForm == true) {
        let isbn = this.isbn;
        const docReference = db.collection("Books").doc(isbn);
        docReference.update({
          Sale: this.discount,
        });
        this.$refs.discount.reset();
        this.$refs.DiscountApply.reset();

        this.dialog = false;
      }
    },
  },
};
</script>

<style>
</style>
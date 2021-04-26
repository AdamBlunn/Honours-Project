<template>
  <div>
    <Toolbar />
    <h1 class="text-h1 text-center">Cart</h1>

    <v-row justify="center">
      <v-col cols="11">
        <v-card>
          <v-stepper v-model="this.step">
            <v-stepper-header>
              <v-stepper-step :complete="this.step > 1" step="1">
                Cart Preview
              </v-stepper-step>

              <v-divider></v-divider>

              <v-stepper-step :complete="this.step > 2" step="2">
                Delivery Information
              </v-stepper-step>

              <v-divider></v-divider>

              <v-stepper-step step="3"> Payment Information </v-stepper-step>
            </v-stepper-header>

            <v-stepper-items>
              <!-- Cart -->
              <v-stepper-content step="1">
                <v-card class="mb-15">
                  <v-row>
                    <v-col
                      v-for="(book, index) in this.books"
                      v-bind:book="book"
                      v-bind:key="index"
                      cols="12"
                    >
                      <v-row>
                        <v-col cols="2">
                          <!-- Cover Image Col -->
                          <v-img
                            :src="book.cover"
                            contain
                            max-height="20vh"
                            max-width="20vw"
                          ></v-img>
                        </v-col>
                        <v-col cols="6">
                          <!-- Book Details Col -->
                          <v-card-title>{{ book.title }}</v-card-title>
                          <v-card-subtitle>{{ book.author }}</v-card-subtitle>
                        </v-col>
                        <v-col cols="4">
                          <!-- Pricing Col -->
                          <v-card-text v-if="book.sale == '50%'">
                            Was: £
                            <span class="text-decoration-line-through">
                              {{ book.RRP }}
                            </span>
                            <v-chip class="ml-3" color="accent" small dark
                              >{{ book.sale }} Off
                            </v-chip>
                          </v-card-text>
                          <v-card-text v-else-if="book.sale == '25%'">
                            Was: £
                            <span class="text-decoration-line-through">
                              {{ book.RRP }}
                            </span>
                            <v-chip class="ml-3" color="accent" small dark>
                              {{ book.sale }} Off
                            </v-chip>
                          </v-card-text>
                          <v-card-text class="primary--text">
                            £{{ book.price }}

                            <v-btn
                              text
                              color="primary"
                              @click="removeItem(index)"
                            >
                              Remove
                            </v-btn>
                          </v-card-text>
                        </v-col>
                      </v-row>
                      <v-divider></v-divider>
                    </v-col>
                    <v-col cols="12">
                      <v-card-title>
                        Subtotal: £{{ this.subtotal }}
                      </v-card-title>
                    </v-col>
                  </v-row>
                </v-card>

                <v-btn color="primary" @click="step = 2"> Continue </v-btn>

                <router-link to="/Home">
                  <v-btn text> Return To Home</v-btn>
                </router-link>
              </v-stepper-content>
              <!--Delivery Info -->
              <v-stepper-content step="2">
                <!-- Delivery Information Form -->
                <v-form v-model="validDelivery" ref="form" lazy-validation>
                  <v-card class="mb-12" elevation="0">
                    <v-row>
                      <v-col cols="12">
                        <v-card-title class="justify-center">
                          Please Enter Your Delivery Details Below:
                        </v-card-title>
                      </v-col>
                    </v-row>

                    <v-row>
                      <v-col cols="12" lg="6">
                        <v-text-field
                          outlined
                          clearable
                          placeholder="Enter First Name"
                          label="FirstName"
                          v-model="userInfo.firstName"
                          :rules="[rules.requiredField.required]"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" lg="6">
                        <v-text-field
                          outlined
                          clearable
                          placeholder="Surname"
                          label="Enter Surname"
                          v-model="userInfo.surname"
                          :rules="[rules.requiredField.required]"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                          outlined
                          clearable
                          placeholder="e.g. 192 Shoreditch Place"
                          label="Address Line 1"
                          v-model="userInfo.address1"
                          :rules="[rules.requiredField.required]"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                          outlined
                          clearable
                          placeholder="e.g. Pollock"
                          label="Address Line 2"
                          v-model="userInfo.address2"
                          :rules="[rules.requiredField.required]"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" lg="6">
                        <v-text-field
                          outlined
                          clearable
                          placeholder="e.g. Glasgow"
                          label="City"
                          v-model="userInfo.city"
                          :rules="[rules.requiredField.required]"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" lg="6">
                        <v-text-field
                          outlined
                          clearable
                          placeholder="G46 7RF"
                          label="Postcode"
                          v-model="userInfo.postcode"
                          :rules="[
                            rules.requiredField.required,
                            rules.postcoderules.valid,
                            rules.postcoderules.postcodeLength,
                          ]"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                          outlined
                          clearable
                          placeholder="e.g. Strathclyde"
                          label="County"
                          v-model="userInfo.county"
                          :rules="[rules.requiredField.required]"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-card>

                  <v-btn
                    color="primary"
                    @click="advanceToPayment"
                    :disabled="!validDelivery"
                  >
                    Continue
                  </v-btn>
                  <v-btn text @click="step = 1"> Back </v-btn>
                </v-form>
              </v-stepper-content>
              <!-- Payment -->
              <v-stepper-content step="3">
                <!-- Payment Information Form -->
                <v-form v-model="validPay" ref="Payform" lazy-validation>
                  <v-card class="mb-12" elevation="0">
                    <v-row>
                      <v-col cols="12">
                        <v-card-title class="justify-center info--text">
                          <v-icon color="info">mdi-information-outline</v-icon>
                          This page does not save any information and is merely
                          a proof of concept, for more info please refer to
                          project report.
                        </v-card-title>
                        <v-card-title class="justify-center">
                          Please Enter Your Payment Details Below:
                        </v-card-title>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="12">
                        <v-text-field
                          outlined
                          clearable
                          placeholder="Please enter the name on your card"
                          label="Name on Card"
                          v-model="paymentInfo.name"
                          :rules="[rules.requiredField.required]"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" lg="6">
                        <v-text-field
                          outlined
                          clearable
                          prepend-icon="mdi-credit-card"
                          placeholder="Please enter your card number"
                          label="Card Number"
                          v-model="paymentInfo.cardNo"
                          :rules="[
                            rules.requiredField.required,
                            rules.cardNumberRules,
                          ]"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" lg="6">
                        <v-text-field
                          outlined
                          clearable
                          prepend-icon="mdi-credit-card"
                          placeholder="Please enter your card's CVV"
                          label="CVV"
                          hint="The CVV is the three digit number found on the back of most credit/debit cards, If you have an American Express card, it is the four digit number on the front "
                          persistent-hint
                          v-model="paymentInfo.cvv"
                          :rules="[rules.requiredField.required, rules.max]"
                        ></v-text-field>
                      </v-col>
                      <v-card elevation="0">
                        <v-card-title>Final Price</v-card-title>

                        <v-card-subtitle>
                          Subtotal: £{{ this.subtotal }} <br />

                          Postage and Packaging: +£3.99
                        </v-card-subtitle>

                        <v-card-title>
                          Total Price: £{{ this.total }}
                        </v-card-title>
                      </v-card>
                    </v-row>
                  </v-card>

                  <v-btn
                    color="primary"
                    @click="completeTransaction"
                    :disabled="!validPay"
                  >
                    Complete transaction
                  </v-btn>

                  <v-btn text @click="step = 2"> Back </v-btn>
                </v-form>
              </v-stepper-content>
            </v-stepper-items>
          </v-stepper>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Toolbar from "../components/CustomerHome/Toolbar";
import { db } from "@/main.js";
import { auth } from "@/main.js";
import { storage } from "@/main.js";
import format from "date-fns/format";

// import vue from 'vue'
export default {
  name: "Cart",
  components: {
    Toolbar,
  },
  data: () => ({
    step: 1, // Stepper Value

    validDelivery: false, // Validation check Variable (false by default)
    validPay: false, //Validation Check for Payment Page (False by default)

    booklist: [], // List of books in cart as modified in individual product pages

    books: [{}], // Storage variable for book information
    subtotal: 0, //Subtotal of price
    shipping: 3.99,
    total: 0,
    date: new Date().toISOString().substr(0, 10),
    userInfo: {
      //user information from delivery form
      firstName: "",
      surname: "",
      address1: "",
      address2: "",
      city: "",
      postcode: "",
      county: "",
    },
    paymentInfo: {
      name: "",
      cardNo: "",
      cvv: "",
    },
    // Form Rules
    rules: {
      requiredField: {
        required: (value) => !!value || "This is a required field", //if field is empty fail validation
      },
      postcoderules: {
        valid: (value) =>
          /.+ .+/.test(value) || "Please enter a valid Postcode", //postcode must have a space (covers all uk postcodes, no char limit as some areas have 7 char postcodes (e.g. london))
        postcodeLength: (value) =>
          (value.length <= 8 && value.length >= 6) ||
          "Postcode must be between 6 & 8 Characters (including spaces)", // Ensures postcode is between 6 and 8 Characters
      },
      max: (cvv) =>
        (cvv && cvv.length <= 4 && cvv.length > 2) ||
        "CVV must be between 3 and 4 digits", // Ensures CVV is between 3 and 4 Characters
      cardNumberRules: (card) =>
        (card && card.length <= 19 && card.length > 12) || // Ensures Card Number is between 13 and 19 Characters
        "Card Number must be between 13 and 19 digits",
    },
  }),

  mounted() {
    this.getCart();
  },
  computed: {
    formattedDate() {
      return this.date ? format(new Date(this.date), "yyyy/MM/dd") : "";
    },
  },
  methods: {
    getCart() {
      // Set up user reference with firbase auth to read user token
      console.log(this.formattedDate);
      const userRef = auth.currentUser.email;
      console.log(userRef);
      // Get data from user's Cart Subcollection
      db.collection("Users")
        .doc(userRef)
        .collection("Cart")
        .doc("Cart")
        .get()
        .then((doc) => {
          if (doc.exists) {
            this.booklist = doc.data().Titles;
            this.books = [{}];

            console.log(this.booklist);
            // Get Each Book
            if (this.booklist.length == 0) {
              console.log("No Items");
            } else {
              this.booklist.forEach((item, index) => {
                console.log(item);
                db.collection("Books")
                  .where("Title", "==", item)
                  .get()
                  .then((snapshot) => {
                    snapshot.docs.forEach((doc) => {
                      if (doc.exists) {
                        // Create individual Book objects in array
                        this.books[index] = {
                          isbn: doc.id,
                          title: doc.data().Title,
                          author: doc.data().Author,
                          price: 0,
                          sale: doc.data().Sale,
                          cover: "",
                          RRP: doc.data().Price,
                          stock: doc.data().Stock,
                        };

                        if (this.books[index].sale == "25%") {
                          let discount = doc.data().Price * 0.25;
                          let salePrice = doc.data().Price - discount;
                          this.books[index].price = salePrice.toFixed(2);
                        } else if (this.books[index].sale == "50%") {
                          let discount = doc.data().Price * 0.5;
                          let salePrice = doc.data().Price - discount;
                          this.books[index].price = salePrice.toFixed(2);
                        } else {
                          this.books[index].price = doc.data().Price.toFixed(2);
                        }
                        this.subtotal =
                          parseInt(this.subtotal) +
                          parseInt(this.books[index].price);
                        console.log(this.subtotal);
                        let storageRef = storage.ref(
                          "Covers/" + this.books[index].title
                        );
                        storageRef.getDownloadURL().then((url) => {
                          this.books[index].cover = url;
                          console.log(this.books[index].cover);
                          this.$forceUpdate();
                        });
                        this.$forceUpdate();
                        console.log(
                          this.books[index].title,
                          this.books[index].author,
                          this.books[index].price,
                          this.books[index].sale
                        );
                      }
                    });
                    this.total = (this.subtotal + this.shipping).toFixed(2);
                  });
              });
            }
          }
        });
    },
    removeItem(index) {
      // Clears item from DOM dependant on it's position in the array and then Deletes item from the Titles object in the Cart Doc in Firestore
      const userRef = auth.currentUser.email;
      console.log(userRef);
      const cartRef = db
        .collection("Users")
        .doc(userRef)
        .collection("Cart")
        .doc("Cart");
      console.log(this.booklist[index]);
      db.collection("Books")
        .where("Title", "==", this.booklist[index])
        .get()
        .then((snapshot) => {
          snapshot.docs.forEach(() => {
            this.subtotal = 0;
          });
        });

      console.log(this.booklist);
      this.booklist.splice(index, 1);
      console.log(this.booklist);
      cartRef.update({
        Titles: this.booklist,
      });

      this.getCart();
    },
    advanceToPayment() {
      let validForm = this.$refs.form.validate();
      if (validForm == true) {
        this.step = 3;
      }
    },
    completeTransaction() {
      const userRef = auth.currentUser.email;
      const cartRef = db
        .collection("Users")
        .doc(userRef)
        .collection("Cart")
        .doc("Cart");
      const InvoiceRef = db
        .collection("Users")
        .doc(userRef)
        .collection("Invoices");
      let validForm = this.$refs.Payform.validate();
      if (validForm == true) {
        InvoiceRef.add({
          FirstName: this.userInfo.firstName,
          Surname: this.userInfo.surname,
          AddressLine1: this.userInfo.address1,
          AddressLine2: this.userInfo.address2,
          City: this.userInfo.city,
          Postcode: this.userInfo.postcode,
          County: this.userInfo.county,
          Items: this.booklist,
          Subtotal: this.subtotal,
          Shipping: this.shipping,
          Total: this.total,
          Date: this.formattedDate,
        });
        this.booklist.forEach((item, index) => {
          console.log(item);
          let bookref = db.collection("Books").doc(this.books[index].isbn);
          let stockToSubtract = this.books[index].stock - 1;
          bookref.update({ Stock: stockToSubtract });
        });
        cartRef.update({
          Titles: [],
        });
      }
      this.$router.push("/home");
    },
  },
};
</script>

<style>
</style>
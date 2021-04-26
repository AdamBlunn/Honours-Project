<template>
  <div>
    <section>
      <Toolbar />
    </section>
    <section>
      <!-- Content Wrapper -->
      <v-row justify="center">
        <v-card min-width="100vw">
          <v-row>
            <!-- Book Image -->
            <v-col cols="12" lg="4">
              <v-img
                :src="this.book.cover"
                contain
                max-height="50vh"
                max-width="60vw"
              ></v-img>
            </v-col>
            <!-- Book Information -->
            <v-col cols="12" lg="4">
              <v-card-title>{{ this.book.title }} </v-card-title>
              <v-card-subtitle>
                by {{ this.book.author }} - {{ this.book.format }} ({{
                  this.book.type
                }}) Published:
                {{ this.book.published }}
              </v-card-subtitle>
              <!-- Description Expansion Panel -->
              <v-expansion-panels flat v-model="panel">
                <v-expansion-panel>
                  <v-expansion-panel-header>
                    Description
                  </v-expansion-panel-header>
                  <v-expansion-panel-content>
                    {{ this.book.description }}
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
            </v-col>
            <!-- Buy Tab -->
            <v-col cols="12" lg="3">
              <v-card>
                <v-card-title>
                  Price:
                  <span class="primary--text">£{{ this.book.price }}</span>
                </v-card-title>
                <v-card-subtitle v-if="this.book.sale == '50%'">
                  Retail Price: £
                  <span class="text-decoration-line-through">
                    {{ this.RRP }}
                  </span>
                  <v-chip class="ml-3" color="accent" small dark
                    >{{ this.book.sale }} Off
                  </v-chip>
                </v-card-subtitle>
                <v-card-subtitle v-else-if="this.book.sale == '25%'">
                  Retail Price: £
                  <span class="text-decoration-line-through">
                    {{ this.RRP }}
                  </span>
                  <v-chip class="ml-3" color="accent" small dark>
                    {{ this.book.sale }} Off
                  </v-chip>
                </v-card-subtitle>
                <v-card-text v-if="this.book.stock > '0'" class="success--text">
                  <v-icon color="success">mdi-check-circle-outline</v-icon> In
                  Stock
                  <v-chip
                    class="ml-3"
                    color="error"
                    small
                    dark
                    v-if="this.book.stock <= 5 && this.book.stock > 0"
                  >
                    Low Stock
                  </v-chip>
                </v-card-text>
                <v-card-text v-else class="error--text">
                  <v-icon color="error"> mdi-close </v-icon> Out of Stock
                </v-card-text>

                <!-- Buttons conditionally rendered on whether book.stock is greater than 0 -->
                <v-btn
                  block
                  color="primary"
                  v-if="this.book.stock > 0 && this.added == false"
                  @click="addToCart"
                >
                  <v-icon>mdi-cart</v-icon> Add to Cart
                </v-btn>
                <v-btn block color="error" v-else-if="this.book.stock < 1">
                  <v-icon>mdi-cart</v-icon> Out of Stock
                </v-btn>
                <div v-else-if="this.book.stock > 0 && this.added == true">
                  <router-link to="/cart">
                    <v-btn block color="primary">
                      <v-icon>mdi-cart</v-icon> View in Cart
                    </v-btn>
                  </router-link>
                </div>
              </v-card>
            </v-col>
          </v-row>
        </v-card>
        <!-- Book Information Section (Flexboxed) -->
        <v-col cols="12">
          <v-card min-width="100vh">
            <v-row justify="center">
              <!-- Genre Infomration -->
              <v-col cols="12" lg="2">
                <v-card-text class="text-center">
                  <v-avatar color="primary">
                    <v-icon color="white">mdi-bookshelf</v-icon>
                  </v-avatar>
                  <v-card-text>
                    <span class="font-weight-black"> Genre:</span>
                    {{ this.book.genre }}
                  </v-card-text>
                </v-card-text>
              </v-col>
              <v-col cols="12" lg="2">
                <!-- Book Length Info -->
                <v-card-text class="text-center">
                  <v-avatar color="primary">
                    <v-icon color="white">mdi-book-open-page-variant</v-icon>
                  </v-avatar>
                  <v-card-text>
                    <span class="font-weight-black"> Length:</span>
                    {{ this.book.pages }} Pages
                  </v-card-text>
                </v-card-text>
              </v-col>
              <!-- Book Pub Info -->
              <v-col cols="12" lg="2">
                <v-card-text class="text-center">
                  <v-avatar color="primary">
                    <v-icon color="white">mdi-store</v-icon>
                  </v-avatar>
                  <v-card-text>
                    <span class="font-weight-black"> Publisher:</span>
                    {{ this.book.publisher }}
                  </v-card-text>
                </v-card-text>
              </v-col>
              <!-- ISBN Info -->
              <v-col cols="12" lg="2">
                <v-card-text class="text-center">
                  <v-avatar color="primary">
                    <v-icon color="white">mdi-barcode</v-icon>
                  </v-avatar>
                  <v-card-text>
                    <span class="font-weight-black"> ISBN-10:</span>
                    {{ this.book.isbn }}
                  </v-card-text>
                </v-card-text>
              </v-col>
              <!-- Book Format Info -->
              <v-col cols="12" lg="2">
                <v-card-text class="text-center">
                  <v-avatar color="primary">
                    <v-icon color="white">mdi-book</v-icon>
                  </v-avatar>
                  <v-card-text>
                    <span class="font-weight-black"> Format:</span>
                    {{ this.book.format }}
                  </v-card-text>
                </v-card-text>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
        <v-card>
          <h2 class="text-h3 text-center">More like this</h2>
          <!-- Featured Items (Conditionally rendered based on Books Genre) -->
          <FeaturedFantasy v-if="this.book.genre == 'Fantasy'" />
          <FeaturedSciFi v-else-if="this.book.genre == 'Science Fiction'" />
          <NonFiction v-if="this.book.type == 'Non-Fiction'" />
          <GraphicNovels v-if="this.book.format == 'Graphic Novel'" />
        </v-card>
      </v-row>
    </section>
    <Footer />
  </div>
</template>

<script>
import Toolbar from "../../components/CustomerHome/Toolbar";
import { db } from "@/main.js";
import { auth } from "@/main.js";
import { storage } from "@/main.js";
import FeaturedFantasy from "../../components/CustomerHome/FeaturedFantasy";
import FeaturedSciFi from "../../components/CustomerHome/FeaturedSciFi";
import NonFiction from "../../components/CustomerHome/NonFiction";
import GraphicNovels from "../../components/CustomerHome/GraphicNovels";
import Footer from "../../components/Footer";
import "firebase/firestore";
export default {
  name: "Light of The Jedi",
  components: {
    Toolbar,
    FeaturedFantasy,
    FeaturedSciFi,
    NonFiction,
    GraphicNovels,
    Footer,
  },
  data: () => ({
    quantity: 1,
    book: {
      isbn: "",
      title: "",
      author: "",
      genre: "",
      description: "",
      price: 0,
      sale: "",
      cover: "",
      format: "",
      stock: 0,
      published: "",
      pages: 0,
      type: "",
      publisher: "",
    },
    added: false, //Variable used to flag that item has been added to cart
    RRP: 0,
    panel: 0,
  }),

  mounted() {
    this.getBook();
  },
  methods: {
    getBook() {
      db.collection("Books")
        .where("Title", "==", "Light of The Jedi")
        .get()
        .then((snapshot) => {
          snapshot.docs.forEach((doc) => {
            if (doc.exists) {
              console.log(doc.data().Title);
              this.book.isbn = doc.id;
              this.book.title = doc.data().Title;
              this.book.author = doc.data().Author;
              this.book.genre = doc.data().Genre;
              this.book.description = doc.data().Description;
              this.book.format = doc.data().Format;
              this.book.sale = doc.data().Sale;
              this.book.stock = doc.data().Stock;
              this.book.pages = doc.data().Pages;
              this.book.published = doc.data().Published;
              this.book.publisher = doc.data().Publisher;
              this.RRP = doc.data().Price;
              this.book.type = doc.data().Type;
              if (this.book.sale == "25%") {
                let discount = doc.data().Price * 0.25;
                let salePrice = doc.data().Price - discount;
                this.book.price = salePrice.toFixed(2);
              } else if (this.book.sale == "50%") {
                let discount = doc.data().Price * 0.5;
                let salePrice = doc.data().Price - discount;
                this.book.price = salePrice.toFixed(2);
              } else {
                this.book.price = doc.data().Price.toFixed(2);
              }
              let storageRef = storage.ref("Covers/" + this.book.title);

              storageRef.getDownloadURL().then((url) => {
                this.book.cover = url;
              });
            } else {
              console.log("Doc ref not found");
            }
          });
        });
    },
    addToCart() {
      const userRef = auth.currentUser.email;
      console.log(userRef);
      const cartRef = db
        .collection("Users")
        .doc(userRef)
        .collection("Cart")
        .doc("Cart");
      let oldArray = [];
      cartRef.get().then((doc) => {
        if (doc.exists) {
          oldArray = doc.data().Titles;

          oldArray.push(this.book.title);

          console.log(oldArray);
          cartRef.update({
            Titles: oldArray,
          });
          this.added = true;
        }
      });
    },
  },
};
</script>

<style>
</style>
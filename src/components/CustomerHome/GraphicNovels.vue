<template>
  <section>
    <!-- For loop to create Cards -->
    <v-row>
      <v-col
        v-for="(book, index) in this.books"
        v-bind:book="book"
        v-bind:key="index"
        cols="10"
        md="4"
        lg="3"
        xl="2"
      >
        <router-link class="text-decoration-none" :to="book.link">
          <v-card min-height="35rem" max-height="35rem" max-width="50rem">
            <v-img contain :src="book.cover" max-height="40vh"></v-img>
            <v-row dense>
              <v-col cols="12">
                <v-card-title>{{ book.title }}</v-card-title>
                <v-card-subtitle>{{ book.author }}</v-card-subtitle>
              </v-col>

              <v-col cols="6" class="pl-5">
                <div v-if="book.sale == '25%'">
                  <v-chip color="accent" dark>{{ book.sale }} Off </v-chip>
                </div>

                <div v-else-if="book.sale == '50%'">
                  <v-chip color="accent" dark> {{ book.sale }} Off </v-chip>
                </div>
              </v-col>

              <v-col cols="6" class="pl-10">
                <v-btn text color="primary"> £ {{ book.price }} </v-btn>
              </v-col>
            </v-row>
          </v-card>
        </router-link>
      </v-col>
    </v-row>
  </section>
</template>

<script>
import { db } from "@/main.js";
import { storage } from "@/main.js";
export default {
  name: "GraphicNovels",
  data: () => ({
    books: [{}],
    index: 0,
  }),
  mounted() {
    this.getBooks();
  },
  methods: {
    getBooks() {
      db.collection("Books")
        .orderBy("Title", "asc")
        .where("Format", "==", "Graphic Novel")
        .get()
        .then((snapshot) => {
          snapshot.docs.forEach((doc, index) => {
            if (doc.exists) {
              this.books[index] = {
                title: doc.data().Title,
                author: doc.data().Author,
                price: 0,
                sale: doc.data().Sale,
                link: doc.data().Link,
                cover: "",
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
              let storageRef = storage.ref("Covers/" + this.books[index].title);
              storageRef.getDownloadURL().then((url) => {
                this.books[index].cover = url;
                this.$forceUpdate();
                // console.log("Book Object", this.books[this.index].cover);
              });
              this.index++;
            } else {
              console.log("Doc does not exist");
            }
          });
        });
    },
  },
};
</script>

<style>
</style>
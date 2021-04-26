<template>
  <section>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title class="justify-center elevation-1">
            Featured Books
          </v-card-title>
          <v-carousel hide-delimiters v-model="model">
            <v-carousel-item>
              <router-link :to="this.carouselBooks[model].link">
                <v-img
                  contain
                  id="image1"
                  max-height="47.5vh"
                  min-width="75vw"
                  :src="this.carouselBooks[this.model].cover"
                ></v-img>
                <v-card color="primary">
                  <v-row justify="center">
                    <h2
                      class="pl-10 font-weight-black white--text text-h6 text-xl-h5"
                    >
                      {{ this.carouselBooks[this.model].title }}
                    </h2>
                    <v-spacer></v-spacer>
                    <div v-if="this.carouselBooks[model].sale == '25%'">
                      <v-chip color="accent" dark
                        >{{ this.carouselBooks[this.model].sale }} Off
                      </v-chip>
                    </div>

                    <div v-else-if="this.carouselBooks[model].sale == '50%'">
                      <v-chip color="accent" dark>
                        {{ this.carouselBooks[this.model].sale }} Off
                      </v-chip>
                    </div>
                    <span class="pr-10">
                      <v-btn outlined color="white">
                        £ {{ this.carouselBooks[this.model].price }}
                      </v-btn>
                    </span>
                  </v-row>
                </v-card>
              </router-link>
            </v-carousel-item>
            <v-carousel-item>
              <router-link :to="this.carouselBooks[model].link">
                <v-img
                  id="image2"
                  contain
                  max-height="47.5vh"
                  min-width="75vw"
                  :src="this.carouselBooks[this.model].cover"
                ></v-img>
                <v-card color="primary">
                  <v-row justify="center">
                    <h2
                      class="pl-10 font-weight-black white--text text-h6 text-xl-h5"
                    >
                      {{ this.carouselBooks[this.model].title }}
                    </h2>
                    <v-spacer></v-spacer>
                    <div v-if="this.carouselBooks[model].sale == '25%'">
                      <v-chip color="accent" dark
                        >{{ this.carouselBooks[this.model].sale }} Off
                      </v-chip>
                    </div>

                    <div v-else-if="this.carouselBooks[model].sale == '50%'">
                      <v-chip color="accent" dark>
                        {{ this.carouselBooks[this.model].sale }} Off
                      </v-chip>
                    </div>
                    <span class="pr-10">
                      <v-btn outlined color="white"
                        >£ {{ this.carouselBooks[this.model].price }}</v-btn
                      >
                    </span>
                  </v-row>
                </v-card>
              </router-link>
            </v-carousel-item>
            <v-carousel-item>
              <router-link :to="this.carouselBooks[model].link">
                <v-img
                  id="image3"
                  contain
                  max-height="47.5vh"
                  min-width="75vw"
                  :src="this.carouselBooks[this.model].cover"
                ></v-img>
                <v-card color="primary">
                  <v-row justify="center">
                    <h2
                      class="pl-10 font-weight-black white--text text-subtitle-1 text-xl-h5"
                    >
                      {{ this.carouselBooks[this.model].title }}
                    </h2>
                    <v-spacer></v-spacer>
                    <div v-if="this.carouselBooks[model].sale == '25%'">
                      <v-chip color="accent" dark
                        >{{ this.carouselBooks[this.model].sale }} Off
                      </v-chip>
                    </div>

                    <div v-else-if="this.carouselBooks[model].sale == '50%'">
                      <v-chip color="accent" dark>
                        {{ this.carouselBooks[this.model].sale }} Off
                      </v-chip>
                    </div>
                    <span class="pr-10">
                      <v-btn outlined color="white"
                        >£ {{ this.carouselBooks[this.model].price }}</v-btn
                      >
                    </span>
                  </v-row>
                </v-card>
              </router-link>
            </v-carousel-item>
            <v-carousel-item>
              <router-link :to="this.carouselBooks[model].link">
                <v-img
                  contain
                  id="image4"
                  max-height="47.5vh"
                  min-width="75vw"
                  :src="this.carouselBooks[this.model].cover"
                ></v-img>
                <v-card color="primary">
                  <v-row justify="center">
                    <h2
                      class="pl-10 font-weight-black white--text text-h6 text-xl-h5"
                    >
                      {{ this.carouselBooks[this.model].title }}
                    </h2>
                    <v-spacer></v-spacer>
                    <div v-if="this.carouselBooks[model].sale == '25%'">
                      <v-chip color="accent" dark
                        >{{ this.carouselBooks[this.model].sale }} Off
                      </v-chip>
                    </div>

                    <div v-else-if="this.carouselBooks[model].sale == '50%'">
                      <v-chip color="accent" dark>
                        {{ this.carouselBooks[this.model].sale }} Off
                      </v-chip>
                    </div>

                    <span class="pr-10">
                      <v-btn outlined color="white"
                        >£ {{ this.carouselBooks[this.model].price }}
                      </v-btn>
                    </span>
                  </v-row>
                </v-card>
              </router-link>
            </v-carousel-item>
          </v-carousel>
        </v-card>
      </v-col>
    </v-row>
  </section>
</template>

<script>
import { db } from "@/main.js";
import { storage } from "@/main.js";
export default {
  name: "Carousel",
  data: () => ({
    carouselBooks: [
      {
        title: "",
        price: 0,
        cover: "",
        sale: "",
        link: "",
      },
      {
        title: "",
        price: 0,
        cover: "",
        sale: "",
        link: "",
      },
      {
        title: "",
        price: 0,
        cover: "",
        sale: "",
        link: "",
      },
      {
        title: "",
        price: 0,
        cover: "",
        sale: "",
        link: "",
      },
    ],
    model: 0,
  }),
  mounted() {
    this.carouselGet();
  },
  methods: {
    carouselGet() {
      const isbn = ["0765365278", "0575097469", "1234567890", "1473217385"];

      for (let index = 0; index < isbn.length; index++) {
        let docReference = db.collection("Books").doc(isbn[index]);
        docReference.get().then((doc) => {
          if (doc.exists) {
            this.carouselBooks[index].title = doc.data().Title;
            this.carouselBooks[index].sale = doc.data().Sale;
            this.carouselBooks[index].link = doc.data().Link;
            if (this.carouselBooks[index].sale == "25%") {
              let discount = doc.data().Price * 0.25;
              let salePrice = doc.data().Price - discount;
              this.carouselBooks[index].price = salePrice.toFixed(2);
            } else if (this.carouselBooks[index].sale == "50%") {
              let discount = doc.data().Price * 0.5;
              let salePrice = doc.data().Price - discount;

              this.carouselBooks[index].price = salePrice.toFixed(2);
            } else {
              this.carouselBooks[index].price = doc.data().Price;
            }

            let storageRef = storage.ref(
              "Covers/" + this.carouselBooks[index].title
            );

            storageRef.getDownloadURL().then((url) => {
              this.carouselBooks[index].cover = url;
            });
          } else {
            console.log("Doc ref not found");
          }
        });
      }
    },
  },
};
</script>

<style>
</style>
<template>
  <div>
    <header>
      <Toolbar />
    </header>

    <section>
      <v-row class="justify-center">
        <v-col cols="12" md="11">
          <Carousel />
        </v-col>
      </v-row>
      <h1 class="pl-10">Fantasy</h1>
      <v-row justify="center">
        <v-col cols="12" md="11">
          <FeaturedFantasy />
        </v-col>
      </v-row>

      <h1 class="pl-10">Science Fiction</h1>
      <v-row justify="center">
        <v-col cols="12" md="11">
          <FeaturedSciFi />
        </v-col>
      </v-row>
      <h1 class="pl-10">Non-Fiction</h1>
      <v-row justify="center">
        <v-col cols="12" md="11">
          <NonFiction />
        </v-col>
      </v-row>
      <h1 class="pl-10">Comics &#38; Graphic Novels</h1>
      <v-row justify="center">
        <v-col cols="12" md="11">
          <GraphicNovels />
        </v-col>
      </v-row>
      <Footer />
    </section>
  </div>
</template>

<script>
import Toolbar from "../components/CustomerHome/Toolbar.vue";
import Carousel from "../components/CustomerHome/Carousel.vue";
import FeaturedFantasy from "../components/CustomerHome/FeaturedFantasy";
import FeaturedSciFi from "../components/CustomerHome/FeaturedSciFi";
import NonFiction from "../components/CustomerHome/NonFiction";
import GraphicNovels from "../components/CustomerHome/GraphicNovels";
import Footer from "../components/Footer.vue";

// import { storage } from "@/main.js";
export default {
  name: "Homepage",
  components: {
    Toolbar,
    Carousel,
    Footer,
    FeaturedFantasy,
    FeaturedSciFi,
    NonFiction,
    GraphicNovels,
  },
};
</script>

<style>
</style>
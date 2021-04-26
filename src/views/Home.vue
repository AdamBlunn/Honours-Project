<template>
  <div class="home">
    <header>
      <WelcomeBar />
    </header>

    <section>
      <WelcomeBanner />
    </section>

    <section>
      <!-- Responsive Card System -->

      <v-row>
        <v-col cols="12" md="4">
          <v-card class="elevation-0 white mx-auto" width="auto">
            <v-card-text class="text-xs-center layout justify-center">
              <v-avatar color="grey lighten-3" size="62">
                <v-icon x-large color="primary" class="text--lighten-2"
                  >mdi-book</v-icon
                >
              </v-avatar>
            </v-card-text>
            <v-card-title primary-title class="layout justify-center">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Et, nemo!
            </v-card-title>
            <v-card-text
              class="text-lg-center text-xs-center text-sm-center text-md-center"
            >
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita
              nesciunt recusandae repellendus distinctio? Maiores odio tempora
              debitis sed ea nam assumenda sit. Quis tempore, aliquam ullam
              distinctio eos animi excepturi.
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" md="4">
          <v-card class="elevation-0 primary" dark>
            <v-card-text class="text-xs-center layout justify-center">
              <v-avatar color="grey lighten-3" size="62">
                <v-icon x-large color="primary" class="text--lighten-2"
                  >mdi-book</v-icon
                >
              </v-avatar>
            </v-card-text>
            <v-card-title primary-title class="layout justify-center">
              Lorem ipsum dolor sit amet.
            </v-card-title>
            <v-card-text
              class="text-lg-center text-xs-center text-sm-center text-md-center"
            >
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Non
              mollitia molestiae quas voluptates aliquid maiores enim tempore
              ab, eius quae obcaecati, doloribus quos quasi dolor iste
              asperiores dolore quis consectetur fuga sint alias possimus eum
              iure. Esse officiis, fugit officia id tempore assumenda, suscipit
              expedita veniam nostrum modi sapiente incidunt.</v-card-text
            >
          </v-card>
        </v-col>
        <v-col cols="12" md="4">
          <v-card class="elevation-0 white">
            <v-card-text class="text-xs-center layout justify-center">
              <v-avatar color="grey lighten-3" size="62">
                <v-icon x-large color="primary" class="text--lighten-2"
                  >mdi-book</v-icon
                >
              </v-avatar>
            </v-card-text>
            <v-card-title primary-title class="layout justify-center">
              Lorem ipsum dolor, sit amet consectetur adipisicing.
            </v-card-title>
            <v-card-text
              class="text-lg-center text-xs-center text-sm-center text-md-center"
            >
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam
              recusandae explicabo exercitationem nam nisi sed tenetur, soluta
              laudantium consectetur nihil placeat quam nostrum eos culpa a ipsa
              sunt aliquid temporibus provident magni quaerat? Repudiandae rem
              tempora aliquid! Illum error itaque dolorum totam ipsum nihil,
              velit voluptate repellendus illo.
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </section>
    <v-divider></v-divider>

    <section>
      <!-- About us Section -->

      <v-row>
        <v-col cols="12">
          <v-card class="elevation-0 primary mx-auto" width="auto" dark>
            <v-card-text
              class="text-xs-center layout justify-center align-center"
            >
              <v-avatar color="grey lighten-3" size="62">
                <v-icon x-large color="primary" class="text--lighten-2"
                  >mdi-book</v-icon
                >
              </v-avatar>
            </v-card-text>
            <v-card-title primary-title class="layout justify-center">
              About us
            </v-card-title>
            <v-card-text
              class="text-lg-center text-xs-center text-sm-center text-md-center"
            >
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti
              incidunt, quae repudiandae totam adipisci fugit exercitationem a
              in aliquid sequi non excepturi consequatur quis eum modi inventore
              officia dolorem quam consequuntur? Quam dolores reiciendis,
              laudantium fuga eius inventore velit error ipsum, pariatur
              doloremque adipisci laboriosam dolore nobis aspernatur ratione.
              Molestias, sit. Ducimus ipsam debitis sequi harum asperiores velit
              dolorem deleniti dolore culpa fugit soluta non, tenetur enim sint,
              reprehenderit animi aut molestias officia temporibus deserunt ut.
              Iusto vel velit alias repellat excepturi! Eum nesciunt tempore at
              dicta, ipsum voluptatum debitis velit totam quibusdam sapiente
              nulla molestiae, quidem autem voluptate modi?
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12">
          <v-card class="elevation-0 white">
            <v-card-text class="text-xs-center layout justify-center">
              <v-avatar color="grey lighten-3" size="62">
                <v-icon x-large color="primary" class="text--lighten-2"
                  >mdi-book</v-icon
                >
              </v-avatar>
            </v-card-text>
            <v-card-title primary-title class="layout justify-center">
              Contact Us
            </v-card-title>
            <v-card-text
              class="text-lg-center text-xs-center text-sm-center text-md-center"
            >
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Non
              mollitia molestiae quas voluptates aliquid maiores enim tempore
              ab, eius quae obcaecati, doloribus quos quasi dolor iste
              asperiores dolore quis consectetur fuga sint alias possimus eum
              iure. Esse officiis, fugit officia id tempore assumenda, suscipit
              expedita veniam nostrum modi sapiente incidunt.</v-card-text
            >
          </v-card>
        </v-col>
      </v-row>
    </section>
    <section>
      <!-- Social Media Section -->
      <v-card class="elevation-1" dark color="primary">
        <v-row align-center justify-center>
          <v-col cols="12">
            <div class="headline">Follow Us On Social Media!</div>
            <v-card-text class="layout justify-center">
              To remain updated on new arrivals and receive updates on whats in
              stock please connect with us on our social media links. You will
              also receive updates on limited editions of books and be eligible
              to participate in our giveaways.
            </v-card-text>
          </v-col>
        </v-row>
        <v-layout justify-space-around justify-center>
          <v-icon x-large dark>mdi-facebook</v-icon>
          <v-icon x-large dark>mdi-twitter</v-icon>
          <v-icon x-large dark>mdi-instagram</v-icon>
          <v-icon x-large dark>mdi-goodreads</v-icon>
          <v-icon x-large dark>mdi-youtube</v-icon>
          <v-icon x-large dark>mdi-reddit</v-icon>
        </v-layout>
      </v-card>
    </section>
    <Footer />
  </div>
</template>

<script>
// @ is an alias to /src
import WelcomeBar from "../components/WelcomeBar.vue";
import WelcomeBanner from "../components/WelcomeBanner.vue";
import Footer from "../components/Footer";
export default {
  name: "Home",
  components: { WelcomeBar, WelcomeBanner, Footer },
};
</script>
src\assets\Welcome.jpg

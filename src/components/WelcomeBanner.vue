<template>
  <div>
    <div id="banner">
      <v-img src="../assets/Welcome.jpg" max-height="100vh" max-width="100vw">
        <v-overlay absolute opacity=".45" value="true">
          <v-layout column align-center justify-center dark>
            <h1>Honours Project</h1>
            <p>
              The latest online bookstore, BookRetreat boasts a massive library
              of both fiction and non-fiction books.
            </p>
            <p>
              Our members gain exclusive access to our low prices and free
              shipping.
              <br />
            </p>
            <h1>Join us now for free!</h1>

            <v-row>
              <v-col class="pr-2">
                <router-link to="/Login">
                  <v-btn x-large raised color="primary">
                    <v-icon large raised left>mdi-login</v-icon>
                    <span>Login</span>
                  </v-btn>
                </router-link>
              </v-col>
              <v-col class="pr-2">
                <router-link to="/Sign-Up">
                  <v-btn x-large color="primary">Sign Up</v-btn>
                </router-link>
              </v-col>
            </v-row>
          </v-layout>
        </v-overlay>
      </v-img>
    </div>
  </div>
</template>

<script>
export default {
  name: "WelcomeBanner",
};
</script>

<style>
</style>
<template>
  <v-row>
    <v-col cols="12">
      <v-app-bar app dark color="primary">
        <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>

        <v-spacer></v-spacer>
        <v-toolbar-title class="pl-16 ml-16">
          <router-link to="/home">
            <v-icon large>mdi-book-open-variant</v-icon>
            <span class="font-weight-light white--text"
              >&nbsp; &nbsp; Book</span
            >
            <span class="white--text">Retreat </span>
          </router-link>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <!-- Padding between buttons w/ vuetify helper class -->

        <router-link to="/cart">
          <v-btn text>
            <span class="d-none d-xl-flex"> Cart</span>
            <v-badge color="accent" :content="this.cartSize">
              <v-icon>mdi-cart-outline</v-icon>
            </v-badge>
          </v-btn>
        </router-link>

        <router-link to="/">
          <v-btn text @click="logout">
            <span class="d-none d-xl-flex"> Logout</span>
            <v-icon>mdi-logout</v-icon>
          </v-btn>
        </router-link>
        <v-navigation-drawer v-model="drawer" absolute temporary app light>
          <v-list nav> </v-list>
          <v-list-item-group
            v-model="group"
            active-class="primary--text text--accent-2"
          >
            <v-list-item to="/home">
              <v-list-item-icon>
                <v-icon>mdi-home</v-icon>
              </v-list-item-icon>

              <v-list-item-title>Home</v-list-item-title>
            </v-list-item>

            <v-list-item to="/cart">
              <v-list-item-icon>
                <v-badge color="accent" :content="this.cartSize">
                  <v-icon>mdi-cart-outline</v-icon>
                </v-badge>
              </v-list-item-icon>
              <v-list-item-title>Cart</v-list-item-title>
            </v-list-item>

            <v-list-item to="/invoice">
              <v-list-item-icon>
                <v-icon>mdi-receipt</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Invoicing</v-list-item-title>
            </v-list-item>
            <router-link to="/">
              <v-list-item @click="logout">
                <v-list-item-icon>
                  <v-icon>mdi-logout</v-icon>
                </v-list-item-icon>
                <v-list-item-title>Log Out</v-list-item-title>
              </v-list-item>
            </router-link>
          </v-list-item-group>
        </v-navigation-drawer>
      </v-app-bar>
    </v-col>
  </v-row>
</template>

<script>
import { db } from "@/main.js";
import { auth } from "@/main.js";

export default {
  name: "Toolbar",
  data: () => ({
    cartSize: 0,
    drawer: false,
    group: null,
  }),
  created() {
    const userRef = auth.currentUser.email;
    db.collection("Users")
      .doc(userRef)
      .collection("Cart")
      .where("__name__", "==", "Cart")
      .onSnapshot((snapshot) => {
        let changes = snapshot.docChanges();

        changes.forEach((change) => {
          if (change.type == "added") {
            this.cartUpdate(change.doc.data().Titles.length);
          } else if (change.type == "removed") {
            this.cartUpdate(change.doc.data().Titles.length);
          }
        });
      });
  },

  methods: {
    cartUpdate(value) {
      this.cartSize = value;
      this.$forceUpdate();
    },
    logout() {
      auth.signOut().then(() => {
        console.log("Logging out...");
      });
    },
  },
};
</script>

<style>
a {
  text-decoration: none;
}
</style>



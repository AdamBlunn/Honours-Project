<template>
  <div>
    <header>
      <Toolbar />
    </header>
    <section>
      <v-row justify="center">
        <v-col cols="12">
          <v-card elevation="0">
            <h2 class="text-h2 text-center">Invoices</h2>
          </v-card>
        </v-col>
      </v-row>
    </section>
    <section>
      <v-card elevation="0">
        <v-row justify="center">
          <v-col
            cols="12"
            md="6"
            lg="6"
            xl="3"
            v-for="(invoice, index) in invoices"
            v-bind:invoice="invoice"
            v-bind:key="index"
          >
            <v-card>
              <v-card color="primary">
                <v-card-title class="white--text justify-center">
                  {{ ` Order ID : ${invoice.orderid}  ` }}
                </v-card-title>
              </v-card>
              <v-card-subtitle class="text-center mb-n8">{{
                `Date ordered: ${invoice.date}`
              }}</v-card-subtitle>
              <v-card-title class="justify-center">
                Product Information
              </v-card-title>
              <v-card-text>This order contains the following:</v-card-text>
              <v-card-text
                v-for="(item, index) in invoice.items"
                v-bind:item="item"
                v-bind:key="index"
                class="mb-n4"
              >
                {{ item }}
              </v-card-text>
              <v-card-title class="justify-center"
                >Delivery Information</v-card-title
              >
              <v-card-text>
                Name:
                {{ `${invoice.firstName} ${invoice.surname}` }} <br />
                Address:
                {{
                  `${invoice.address1}, ${invoice.address2}, ${invoice.city}, ${invoice.county}, ${invoice.postcode}`
                }}
              </v-card-text>
              <v-card-title class="justify-center"
                >Pricing Information</v-card-title
              >
              <v-card-text class="body-2 mb-n7">
                {{ `Subtotal: £${invoice.subtotal.toFixed(2)} ` }} <br />
                {{ ` Shipping Costs: £${invoice.shipping} ` }} <br />
              </v-card-text>
              <v-card-text class="subtitle-2">{{
                `Total Cost: £${invoice.total}`
              }}</v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-card>
    </section>

    <Footer />
  </div>
</template>

<script>
import Toolbar from "../components/CustomerHome/Toolbar.vue";
import Footer from "../components/Footer.vue";
import { auth } from "@/main.js";
import { db } from "@/main.js";
import format from "date-fns/format";
export default {
  name: "Invoicing",
  components: {
    Toolbar,
    Footer,
  },
  data: () => ({
    invoices: [{}],
  }),
  mounted() {
    this.getInvoices();
  },
  methods: {
    getInvoices() {
      const userRef = auth.currentUser.email;
      db.collection("Users")
        .doc(userRef)
        .collection("Invoices")
        .orderBy("Date", "desc")
        .get()
        .then((snapshot) => {
          snapshot.docs.forEach((doc, index) => {
            if (doc.exists) {
              this.invoices[index] = {
                orderid: doc.id,
                firstName: doc.data().FirstName,
                surname: doc.data().Surname,
                address1: doc.data().AddressLine1,
                address2: doc.data().AddressLine2,
                city: doc.data().City,
                county: doc.data().County,
                postcode: doc.data().Postcode,
                subtotal: doc.data().Subtotal,
                shipping: doc.data().Shipping,
                total: doc.data().Total,
                items: doc.data().Items,
                date: doc.data().Date,
              };
              (this.invoices[index].date = format(
                new Date(this.invoices[index].date),
                "dd/MM/yyyy"
              )),
                this.$forceUpdate();
            } else {
              console.log("Doc does not exist");
            }
          });
        });
      console.log(this.invoices);
    },
  },
};
</script>

<style>
</style>
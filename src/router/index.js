import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Signup from '../views/Signup.vue'
import adminHome from '../views/adminHome.vue'
import Homepage from '../views/Homepage.vue'
import Cart from '../views/Cart.vue'
import Invoicing from '../views/Invoicing.vue'
// Product Page Declarations
import Warbreaker from "../views/ProductPages/Warbreaker.vue"
import LOTR from "../views/ProductPages/LOTR.vue"
import TheWayOfKings from "../views/ProductPages/TheWayOfKings.vue"
import GoingPostal from "../views/ProductPages/GoingPostal.vue"
import ThePoppyWar from "../views/ProductPages/ThePoppyWar.vue"
import WicDivY1 from "../views/ProductPages/WicDivY1.vue"
import Neuromancer from "../views/ProductPages/Neuromancer.vue"
import LeviathanWakes from "../views/ProductPages/LeviathanWakes.vue"
import Dune from "../views/ProductPages/Dune.vue"
import LightOfTheJedi from "../views/ProductPages/LightOfTheJedi.vue"
import AMemoryCalledEmpire from "../views/ProductPages/AMemoryCalledEmpire.vue"
import ToBeTaughtIfFortunate from "../views/ProductPages/ToBeTaughtIfFortunate.vue"
import Lando from "../views/ProductPages/Lando.vue"
import BatmanY1 from "../views/ProductPages/BatmanYear1.vue"
import FablesVol1 from "../views/ProductPages/FablesVol1.vue"
import ConquestOfGaul from "../views/ProductPages/ConquestOfGaul.vue"
import TheHistories from "../views/ProductPages/TheHistories.vue"
import DetComVol1 from "../views/ProductPages/DetComVol1.vue"
import NightwingVol1 from "../views/ProductPages/NightwingVol1.vue"
import Jerusalem from "../views/ProductPages/Jerusalem.vue"
import PhilipAlexander from "../views/ProductPages/PhilipAlexander.vue"
import Ravenna from "../views/ProductPages/Ravenna.vue"
import Vuejs from "../views/ProductPages/Vuejs.vue"

Vue.use(VueRouter)
//Route Paths
const routes = [
  {
    path: '/',
    name: 'Welcome',
    component: Home
  },

  {
    path: '/Sign-Up',
    name: 'Sign up',
    component: Signup

  },
  {
    path: '/Login',
    name: 'Login',
    component: Login

  },
  {
    path: '/Admin-Home',
    name: 'Admin Home',
    component: adminHome

  },
  {
    path: '/Home',
    name: 'HomePage',
    component: Homepage

  }, {
    path: '/Cart',
    name: 'Cart|Book Retreat',
    component: Cart
  },
  {
    path: '/invoice',
    name: 'Invoicing|Book Retreat',
    component: Invoicing
  },
  {
    path: '/Product/Warbreaker',
    name: 'Warbreaker|Book Retreat',
    component: Warbreaker
  },
  {
    path: '/Product/LOTR',
    name: 'The Lord of the Rings|Book Retreat',
    component: LOTR
  },
  {
    path: '/Product/TheWayOfKings',
    name: 'The Way of Kings|Book Retreat',
    component: TheWayOfKings
  },
  {
    path: '/Product/GoingPostal',
    name: 'Going Postal|Book Retreat',
    component: GoingPostal
  },
  {
    path: '/Product/ThePoppyWar',
    name: 'The Poppy War|Book Retreat',
    component: ThePoppyWar
  },
  {
    path: '/Product/WicDivY1',
    name: 'The Wicked + The Divine: Year 1|Book Retreat',
    component: WicDivY1
  },
  {
    path: '/Product/Neuromancer',
    name: 'Neuromancer|Book Retreat',
    component: Neuromancer
  },
  {
    path: '/Product/LeviathanWakes',
    name: 'Leviathan Wakes|Book Retreat',
    component: LeviathanWakes
  },
  {
    path: '/Product/Dune',
    name: 'Dune|Book Retreat',
    component: Dune
  },
  {
    path: '/Product/LightOfTheJedi',
    name: 'Light Of The Jedi|Book Retreat',
    component: LightOfTheJedi
  },
  {
    path: '/Product/AMemoryCalledEmpire',
    name: 'A Memory Called Empire|Book Retreat',
    component: AMemoryCalledEmpire
  },
  {
    path: '/Product/ToBeTaughtIfFortunate',
    name: 'ToBeTaughtIfFortunate|Book Retreat',
    component: ToBeTaughtIfFortunate
  },
  {
    path: '/Product/Lando',
    name: 'Star Wars: Lando|Book Retreat',
    component: Lando
  },
  {
    path: '/Product/BatmanY1',
    name: 'Batman: Year One|Book Retreat',
    component: BatmanY1
  },
  {
    path: '/Product/FablesVol1',
    name: 'Fables Volume 1|Book Retreat',
    component: FablesVol1
  },
  {
    path: '/Product/ConquestOfGaul',
    name: 'The Conquest of Gaul|Book Retreat',
    component: ConquestOfGaul
  },
  {
    path: '/Product/TheHistories',
    name: 'The Histories|Book Retreat',
    component: TheHistories
  },
  {
    path: '/Product/DetectiveComicsVol1',
    name: 'Detective Comics Volume 1|Book Retreat',
    component: DetComVol1
  },
  {
    path: '/Product/NightwingVol1',
    name: 'Nightwing Volume 1|Book Retreat',
    component: NightwingVol1
  },
  {
    path: '/Product/Jerusalem',
    name: 'Jerusalem: The Biography|Book Retreat',
    component: Jerusalem
  },
  {
    path: '/Product/Vuejs-Up-and-running',
    name: 'Vue.js: Up and Running|Book Retreat',
    component: Vuejs
  },
  {
    path: '/Product/PhilipandAlexander',
    name: 'Philip and Alexander: Kings and Conquerors|Book Retreat',
    component: PhilipAlexander
  },
  {
    path: '/Product/Ravenna',
    name: 'Ravenna|Book Retreat',
    component: Ravenna
  },

]

const router = new VueRouter({
  routes
})

export default router

import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';


Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
            light: {
                //Creates project colour scheme
                primary: '#16a085',
                accent: '#2ecc71',
                secondary: '#27ae60'
            }

        }

    }
});

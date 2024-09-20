import { createApp } from 'vue'
import PopupComponent from './PopupComponent.vue'
import router from '../router/router.js'
// Remove Vuesax import as it's causing compatibility issues
import Vuesax from 'vuesax-alpha'
 
// style
import 'vuesax-alpha/dist/index.css'
// vuesax darkmode
import 'vuesax-alpha/theme-chalk/dark/css-vars.css'


if (!window.__POPUP_SCRIPT_EXECUTED__) {
    window.__POPUP_SCRIPT_EXECUTED__ = true;
    console.log('Popup script running');
    unmountExistingApp();
    createAndMountNewApp();
}

function unmountExistingApp() {
    if (window.__VUE_POPUP_APP__) {
        console.log('Unmounting existing app');
        window.__VUE_POPUP_APP__.unmount();
    }
}

function createAndMountNewApp() {
    console.log('Creating new app');
    const app = createApp(PopupComponent);
 
    app.use(router);
    app.use(Vuesax)
    // Remove Vuesax usage
    app.mount('#app');
    window.__VUE_POPUP_APP__ = app;
    console.log('New app mounted with router');
}
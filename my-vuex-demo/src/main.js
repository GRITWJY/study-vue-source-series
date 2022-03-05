import Vue from 'vue';
import App from './App'
import store from "@/store";


new Vue({
	el: '#app',
	render: h => h(App),
	store
})



import IndexAsync from '~/Views/Home/IndexAsync'


const routes = [
    {path: '/IndexAsync', component: IndexAsync}
]   

const router = new VueRouter({
    routes
});


new Vue({
    el: '#app',
    router, routes,
    vuetify: '',
    data() {
        return {
            items: [
                { title: 'Dashboard', icon: 'dashboard' },
                { title: 'inventory', icon: 'fas fa-table' },
                { title: 'labs', icon: 'fas fa-copy' },
                { title: 'manage users', icon: 'fas fa-user-friends' },
                { title: 'Account', icon: 'account_box' },
                { title: 'Settings', icon: 'gavel' },
            ],
        }
    },
})
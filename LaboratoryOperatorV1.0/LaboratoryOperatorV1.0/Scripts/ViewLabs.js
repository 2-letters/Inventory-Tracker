new Vue({
    el: '#app',
    data() {
        return {
            search: '',
            Headers: [
                { text: 'Equipment', value: 'equipment' },
                { text: 'Location', value: 'location' },
                { text: 'Qty', value: 'qty' },
                {text: 'Add or Remove', value: 'add_or_remove'}
            ],
            items: [
                { equipment: 'vernier-caliber', location: 'thatcher south room 3535  drawer 20', qty: 88 },

                { equipment: 'ruler', location: 'hickman  room 4535  drawer 20', qty: 2 },

                { equipment: 'firebase', location: 'thatcher south room 3535  drawer 20', qty: 420 },

                { equipment: 'is beter than', location: 'thatcher south room 3535  drawer 20', qty: 62 },

                { equipment: 'aws cuz its free', location: 'thatcher south room 3535  drawer 20', qty: 68 }
            ]
        }
    },
    methods: {
        increment() {
            var x = this.items[0].qty;
            this.items[0].qty++;
        }
    }
})

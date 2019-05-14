


new Vue({
    el: '#app',
    model: model,
    data() {
        return {
            search: '',
            Headers: [
                { text: 'Equipment', value: 'equipment' },
                { text: 'Location', value: 'location' },
                { text: 'Qty', value: 'qty' },
                {text: 'Add or Remove', value: 'addo', sortable: false, disabled:true}
            ],
            HeadersAdded: [
                { text: 'Equipment', value: 'equipmentAdded' },
                { text: 'Location', value: 'locationAdded' },
                { text: 'Qty', value: 'qtyAdded' },
                { text: 'Add or Remove', value: 'addo', sortable: false, disabled: true }
            ],
            items: [],
            itemsAdded: []
        }
    },

    mounted() {
        for (var i = 0; i < model.IndexList.length; i++)
        {
            this.items.push({ equipment: model.IndexList[i].itemName, location: model.IndexList[i].location, qty: model.IndexList[i].quantity, id: model.IndexList[i].id, i: i })
            //this.itemsAdded.push({ equipmentAdded: model.IndexList[i].itemName, locationAdded: model.IndexList[i].location, qtyAdded: model.IndexList[i].quantity, id: model.IndexList[i].id })

        }
    },

    methods: {

        //increment onto next app if not found and decrement current index of object
        increment: function (id) {
          

            var isAdded = this.itemsAdded.some(e => e.id === id);

            var result = this.items.filter(obj => {
                return obj.id === id
            })


            if (isAdded === false) {
               

                this.itemsAdded.push({ equipmentAdded: result[0].equipment, locationAdded: result[0].location, qtyAdded: 1, id: result[0].id });

            }
            else
            {
                var index = this.itemsAdded.map(function (e) { return e.id;} ).indexOf(id);
                this.itemsAdded[index].qtyAdded++;
            }
           
         
            this.items[result[0].i].qty--;
        },
        decrement() {
            return;
        },
        decrementItemsAdded() {
            return;
        },
        incrementItemsAdded() {
            return;
        }

    }
})


//new Vue({
//    el: '#app',
//    //vuetify: new Vuetify(),

//    data: () => ({

//        search: '',
//        Headers: [
//            { text: 'Equipment', value: 'equipment' },
//            { text: 'Location', value: 'location' },
//            { text: 'Qty', value: 'qty' },
//            { text: 'Add or Remove', value: 'add' }
//        ],
//        equipments: [],
//        editedIndex: -1,
//        editedItem: {
//            name: '',
//            location: '',
//            Qty: 0
//        }
//    }),


//    created() {
//        this.initialize();
//    },

//    methods: {
//        initialize() {
//            this.equipment = [
//                { equipment: 'vernier-caliber', location: 'thatcher south room 3535  drawer 20', qty: 88 },

//                { equipment: 'ruler', location: 'hickman  room 4535  drawer 20', qty: 2 },

//                { equipment: 'firebase', location: 'thatcher south room 3535  drawer 20', qty: 420 },

//                { equipment: 'is beter than', location: 'thatcher south room 3535  drawer 20', qty: 62 },

//                { equipment: 'aws cuz its free', location: 'thatcher south room 3535  drawer 20', qty: 68 }
//            ]
//        }
//    },
    
//    decrement(item) {
//        this.editedIndex = this.equipments.indexOf(item)
//        this.editedItem = Object.assign({}, item)
//        this.dialog = true

//    }
//})


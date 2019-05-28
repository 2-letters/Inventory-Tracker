


new Vue({
    el: '#app',
    model: model,
    data() {
        return {
            disabled: "",
            searchAdded: '',
            message: 'omae wa moo shindeiruu',
            dialog: {},
            notifications: false,
            sound: true,
            test: true,
            widgets: false,
            search: '',
            Headers: [
                { text: 'Equipment', value: 'equipment' },
                { text: 'Location', value: 'location' },
                { text: 'Available', value: 'qty' },
                { text: 'MoreInfo', value: 'pictureUrl',  sortable: false, disabled: true },
                { text: 'Add or Remove', value: 'addo', sortable: false, disabled: true }
            ],
            HeadersAdded: [
                { text: 'Equipment', value: 'itemName' },
                { text: 'Location', value: 'location' },
                { text: 'Qty', value: 'quantity' },
                { text: 'Add or Remove', value: 'addo', sortable: false, disabled: true }
            ],
            items: [],
            itemsAdded: []
        }

    },

    mounted() {
        for (var i = 0; i < model.IndexList.length; i++) {
            this.items.push({ equipment: model.IndexList[i].itemName, location: model.IndexList[i].location, qty: model.IndexList[i].quantity, id: model.IndexList[i].id, i: i, pictureUrl: model.IndexList[i].pictureUrl, description: model.IndexList[i].description })
            //this.itemsAdded.push({ equipmentAdded: model.IndexList[i].itemName, locationAdded: model.IndexList[i].location, qtyAdded: model.IndexList[i].quantity, id: model.IndexList[i].id })

        }
    },

    methods: {

        //increment onto next app if not found and decrement current index of object
        increment: function (id) {


            var isAdded = this.itemsAdded.some(e => e.id === id);

            var result = this.items.filter(obj => { return obj.id === id; });
            
            if (isAdded === false) {

                this.itemsAdded.push({ itemName: result[0].equipment, location: result[0].location, quantity: 1, id: result[0].id });
                this.items[result[0].i].qty--;
            }
            else {
                var index = this.itemsAdded.map(function (e) { return e.id; }).indexOf(id);
                this.itemsAdded[index].quantity++;
                this.items[result[0].i].qty--;
            }
            


            if (this.items[result[0].i].qty <= 0) {
                this.disabled = id + '2';
            }
            else {
                this.disabled = "";
                
               
            }

        },
        decrement: function (id) {
            var isAdded = this.itemsAdded.some(e => e.id === id);

            var result = this.items.filter(obj => { return obj.id === id; });

            if (isAdded === false) {

                //this.itemsAdded.push({ equipmentAdded: result[0].equipment, locationAdded: result[0].location, qtyAdded: 1, id: result[0].id });
                //this.items[result[0].i].qty--;
            }
            else {

                var index = this.itemsAdded.map(function (e) { return e.id; }).indexOf(id);
                this.itemsAdded[index].quantity--;
                this.items[result[0].i].qty++;
            }



            if (this.itemsAdded[index].quantity <= 0) {
                this.disabled = id;
                this.itemsAdded.splice(index, 1);
            }
            else {
                this.disabled = "";


            }
           
        },
       
        submitData: function (){
        $.ajax({
            type: 'POST',
            url: '/Home/PushNewLab',
            data: {
                labName: $("#labName").val(),
                labDescription: $("#labDescription").val(),
                itemsInLab: this.itemsAdded
            },
            success: function (data) {
                $('#results').html(data)
            },
            error: function (data) {
                console.log('Error, please report to a developer')
            }
        });
    }



    }
})




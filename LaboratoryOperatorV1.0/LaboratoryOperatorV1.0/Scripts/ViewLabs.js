new Vue({
    el: '#app',
    model: model,
    data() {
        return {
            disabled: "",
            searchAdded: '',
            message: 'omae wa moo shindeiruu',
            dialog: {},
            addTransition: {},
            notifications: false,
            sound: true,
            test: true,
            labRules: [v => !!v || "The input is required"],
            widgets: false,
            search: '',
            foo: 0,
            Headers: [
                { text: 'Equipment', value: 'equipment' },
                { text: 'Location', value: 'location' },
                { text: 'Available', value: 'qty' },
                { text: 'MoreInfo', value: 'pictureUrl', sortable: false, disabled: true },
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
        for (var i = 0; i < model.LabItems.length; i++) {
            this.items.push({ equipment: model.LabItems[i].itemName, location: model.LabItems[i].location, qty: model.LabItems[i].quantity, id: model.LabItems[i].id, i: i, pictureUrl: model.LabItems[i].pictureUrl, description: model.LabItems[i].description, foo: 0, prevFoo: 0, original: model.LabItems[i].quantity })
            //this.itemsAdded.push({ equipmentAdded: model.IndexList[i].itemName, locationAdded: model.IndexList[i].location, qtyAdded: model.IndexList[i].quantity, id: model.IndexList[i].id })

        }
    },

    methods: {
        addNew: function (id) {
            var isAdded = this.itemsAdded.some(e => e.id === id);

            var result = this.items.filter(obj => { return obj.id === id; });

            var index = this.itemsAdded.map(function (e) { return e.id; }).indexOf(id);

            if ((this.items[result[0].i].foo > this.items[result[0].i].original) || (this.items[result[0].i].foo <= -1)) {
                this.items[result[0].i].foo = this.items[result[0].i].prevFoo;
                return;
            }
            else {
                if (isAdded) {
                    index = this.itemsAdded.map(function (e) { return e.id; }).indexOf(id);
                    this.itemsAdded[index].quantity = this.items[result[0].i].foo;
                    this.items[result[0].i].qty = this.items[result[0].i].original - this.items[result[0].i].foo;
                }
                else {

                    this.itemsAdded.push({ itemName: result[0].equipment, location: result[0].location, quantity: this.items[result[0].i].foo, pictureUrl: this.items[result[0].i].pictureUrl, id: result[0].id, description: this.items[result[0].i].description });
                    this.items[result[0].i].qty = this.items[result[0].i].original - this.items[result[0].i].foo;
                }
            }
            index = this.itemsAdded.map(function (e) { return e.id; }).indexOf(id);
            if (this.items[result[0].i].foo === "0") {
                this.itemsAdded.splice(index, 1);
                this.items[result[0].i].foo = 0;
            }

            this.items[result[0].i].foo = this.itemsAdded[index].quantity;



            this.items[result[0].i].prevFoo = this.items[result[0].i].foo;
        },
        //increment onto next app if not found and decrement current index of object
        increment: function (id) {


            var isAdded = this.itemsAdded.some(e => e.id === id);

            var result = this.items.filter(obj => { return obj.id === id; });

            var index = this.itemsAdded.map(function (e) { return e.id; }).indexOf(id);
            if (isAdded) {
                index = this.itemsAdded.map(function (e) { return e.id; }).indexOf(id);
                if (this.items[result[0].i].foo !== this.items[result[0].i].prevFoo) {
                    if ((this.items[result[0].i].foo > this.items[result[0].i].original)) {
                        this.items[result[0].i].foo = this.items[result[0].i].prevFoo;
                        return;
                    }
                    else {
                        this.itemsAdded[index].quantity = this.items[result[0].i].foo;
                        this.items[result[0].i].qty = this.items[result[0].i].original - this.itemsAdded[index].quantity;
                    }
                }
                else {
                    this.itemsAdded[index].quantity++;
                    this.items[result[0].i].qty--;
                }


            }
            else {
                var x = this.items[result[0].i].foo;
                if (this.items[result[0].i].foo !== this.items[result[0].i].prevFoo) {
                    if ((this.items[result[0].i].foo > this.items[result[0].i].original) || (this.items[result[0].i].foo < -1)) {
                        this.items[result[0].i].foo = this.items[result[0].i].prevFoo;
                        return;
                    }
                    else {

                        this.itemsAdded.push({ itemName: result[0].equipment, location: result[0].location, quantity: this.items[result[0].i].foo, id: result[0].id });
                        this.items[result[0].i].qty = this.items[result[0].i].qty - this.items[result[0].i].foo;
                    }
                }
                else {


                    this.itemsAdded.push({ itemName: result[0].equipment, location: result[0].location, quantity: 1, id: result[0].id });
                    this.items[result[0].i].qty--;
                }
            }





            //if (this.items[result[0].i].foo !== this.items[result[0].i].prevFoo) {

            //    if ((this.items[result[0].i].foo + this.itemsAdded[index].quantity) > this.items[result[0].i].original) {
            //        this.items[result[0].i].foo = this.items[result[0].i].prevFoo;
            //        return;
            //    }
            //}

            //if (isAdded === false) {

            //    this.itemsAdded.push({ itemName: result[0].equipment, location: result[0].location, quantity: 1, id: result[0].id });
            //    this.items[result[0].i].qty--;
            //}
            //else {
            //    var index = this.itemsAdded.map(function (e) { return e.id; }).indexOf(id);
            //    this.itemsAdded[index].quantity++;
            //    this.items[result[0].i].qty--;
            //}



            if (this.items[result[0].i].qty <= 0) {
                this.disabled = id + '2';
            }
            else {
                this.disabled = "";


            }


            if ((isAdded === true) && (this.items[result[0].i].foo === "0")) {
                this.itemsAdded.splice(index, 1);
                this.items[result[0].i].foo = 0;
            }
            index = this.itemsAdded.map(function (e) { return e.id; }).indexOf(id);
            this.items[result[0].i].foo = this.itemsAdded[index].quantity;



            this.items[result[0].i].prevFoo = this.items[result[0].i].foo;


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
                this.items[result[0].i].foo = 0;
                this.disabled = id;
                this.itemsAdded.splice(index, 1);
            }
            else {
                this.disabled = "";

                this.items[result[0].i].foo = this.itemsAdded[index].quantity;
            }

        },
        changeNumber: function () {
            var x = 2;
        },

        submitData: function () {

            if (($("#labName").val() === "") || ($("#labDescription").val())=== "") {
                return;
            }




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


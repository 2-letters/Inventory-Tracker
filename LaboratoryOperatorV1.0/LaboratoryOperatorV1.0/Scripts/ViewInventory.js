class Equipment {
    constructor(name, description, location, index, pictureUrl, quantity) {
        this.name = name;
        this.description = description;
        this.location = location;
        this.index = index;
        this.pictureUrl = pictureUrl;
        this.quantity = quantity
    }
}

new Vue({
    el: '#app',
    data: {
        valid: false,
        startingNumber: 6,
        equipmentName: '',
        model: model,
        description: '',
        index: 0,
        equipment: [],
        action: 'View',
        switch1: true,
        show: true,
        nameRules: [
            v => !!v || 'Name is required',
            v => v.length <= 500 || 'Name must be less than 10 characters'
        ],
        email: '',
        emailRules: [
            v => !!v || 'E-mail is required',
            v => /.+@.+/.test(v) || 'E-mail must be valid'
        ]
    }, 
    mounted() {
        
        for (i = 0; i < model.IndexList.length; i++)
        {
            this.index++;
            this.equipment.push(new Equipment(model.IndexList[i].itemName, model.IndexList[i].description, model.IndexList[i].location, this.index, model.IndexList[i].pictureUrl, model.IndexList[i].quantity))

        }
        this.x = this.equipment.length;
    },
    methods: {
        addItem: function () {
            this.index++;
            this.equipment.push(new Equipment('','','',this.index))
        },

        deleteItem: function (index) {

        }
    },
    watch: {
        switch1(newValue) {
            if (newValue === true) {
                this.action = 'edit';
                this.show = false;
            }
            else {
                this.action = 'view';
                this.show = true;
            }
        }
    }

})
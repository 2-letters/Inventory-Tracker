class Equipment {
    constructor(name, description, location, index) {
        this.name = name;
        this.description = description;
        this.location = location;
        this.index = index;
    }
}

new Vue({
    el: '#app',
    data: {
        valid: false,
        startingNumber: 6,
        equipmentName: '',
        description: '',
        index: 0,
        equipment: [],
        nameRules: [
            v => !!v || 'Name is required',
            v => v.length <= 10 || 'Name must be less than 10 characters'
        ],
        email: '',
        emailRules: [
            v => !!v || 'E-mail is required',
            v => /.+@.+/.test(v) || 'E-mail must be valid'
        ]
    }, 
    mounted() {

        for (i = 0; i < 2; i++)
        {
            this.index++;
            this.equipment.push(new Equipment('beaker', 'asdf', 'paradise', this.index))

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
    }
})
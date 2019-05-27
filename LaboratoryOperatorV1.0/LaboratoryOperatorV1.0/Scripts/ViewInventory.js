class Equipment {
    constructor(name, description) {
        this.name = name;
        this.description = description;
    }
}

new Vue({
    el: '#app',
    data: {
        valid: false,
        startingNumber: 6,
        equipmentName: '',
        description: '',
        x: 1,
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

        for (i = 0; i < 10; i++)
        {
            this.equipment.push(new Equipment('beaker', 'asdf'))

        }
        this.x = this.equipment.length;
    }
})
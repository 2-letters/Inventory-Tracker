class Equipment {
    constructor(name, description, location, index, pictureUrl, quantity, isNew, id) {
        this.name = name;
        this.description = description;
        this.location = location;
        this.index = index;
        this.pictureUrl = pictureUrl;
        this.quantity = quantity;
        this.isNew = isNew;
        this.id = id;
    }
}

new Vue({
    el: '#app',
    data: {
        valid: false,
        whereToSplit: 0,
        startingNumber: 6,
        equipmentName: '',
        model: model,
        description: '',
        index: 0,
        original: [],
        itemsToDelete: [],
        equipment: [],
        action: 'View',
        switch1: true,
        show: true,
        actBtn: false,
        nameRules: [
            v => !!v || 'Value is required',
            v => v > 0 || 'The Value can not be less a negative number or 0'
        ],
        email: '',
        emailRules: [
            v => !!v || 'E-mail is required',
            v => /.+@.+/.test(v) || 'E-mail must be valid'
        ],
        NewEquipmentToSave: []
    },
    mounted() {

        for (i = 0; i < model.IndexList.length; i++) {
            this.index++;
            this.equipment.push(new Equipment(model.IndexList[i].itemName, model.IndexList[i].description, model.IndexList[i].location, this.index, model.IndexList[i].pictureUrl, model.IndexList[i].quantity, false, model.IndexList[i].id))
            this.original.push(new Equipment(model.IndexList[i].itemName, model.IndexList[i].description, model.IndexList[i].location, this.index, model.IndexList[i].pictureUrl, model.IndexList[i].quantity, false, model.IndexList[i].id))

        }
        this.x = this.equipment.length;
    },
    methods: {
        addItem: function () {
            this.index++;
            this.equipment.push(new Equipment('', '', '', this.index, '', '', true))

        },
        getWhereToSplit: function () {
            for (var i = 0; i < this.equipment.length; i++) {
                if (this.equipment[i].isNew == true) {
                    return this.equipment[i].index - 1;
                }
            }
        },
        deleteItem: function (index) {

        },
        save: function () {
            var whereToSplit = this.getWhereToSplit();
            this.NewEquipmentToSave = this.equipment.slice(whereToSplit);
            var editedEquipments = this.equipment.slice(0, whereToSplit);
            var finishedCheckEdited = this.checkIfEditedQuips(editedEquipments);

            return;
        },
        checkIfEditedQuips: function (editedEquips) {
            var finalEdit = [];
            for (var i = 0; i < this.original.length; i++) {
                if ((editedEquips[i].name !== this.original[i].name) || (editedEquips[i].description !== this.original[i].description)
                    || (editedEquips[i].location !== this.original[i].location) || (editedEquips[i].pictureUrl !== this.original[i].pictureUrl)
                    || (editedEquips[i].quantity !== this.original[i].quantity)) {
                    finalEdit.push(new Equipment(editedEquips[i].name, editedEquips[i].description, editedEquips[i].location, editedEquips[i].index, editedEquips[i].pictureUrl, editedEquips[i].quantity, false, editedEquips[i].id))

                }
            }
            return finalEdit;
        },
        deleteItem: function (id, i) {
            this.itemsToDelete.push(id);
            var index = this.equipment.map(function (e) { return e.id; }).indexOf(id);
            this.equipment.splice(index, index + 1);
            return;
        }


    },
    watch: {
        switch1(newValue) {
            if (newValue === true) {
                this.action = 'edit';
                this.show = false;
                this.actBtn = true;
            }
            else {

                this.action = 'view';
                this.show = true;
                this.actBtn = false;
            }
        }
    }

})
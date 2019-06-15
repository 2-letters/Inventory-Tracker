class Equipment {
    constructor(name, description, location, index, pictureUrl, quantity, isNew, id, sublocation, room) {
        this.name = name;
        this.description = description;
        this.location = location;
        this.index = index;
        this.pictureUrl = pictureUrl;
        this.quantity = quantity;
        this.isNew = isNew;
        this.id = id;
        this.sublocation = sublocation;
        this.room = room;
    }
}

new Vue({
    el: '#app',
    data: {
        select: null,
        inputName: '',
        inputLocation: '',
        inputSublocation: '',
        inputRoom: '',
        inputDescription: '',
        inputQuantity: 0,
        valid: false,
        whereToSplit: 0,
        startingNumber: 6,
        equipmentName: '',
        model: model,
        description: '',
        index: 0,
        drawer: true,
        clipped: false,
        modulo: 0,
        pageNumbers: [1, 2, 3, 4, 5],
        original: [],
        original2: [],
        itemsToDelete: [],
        equipment: [],
        rooms: [],
        sublocations: [],
        action: 'View',
        switch1: true,
        dialog: {},
        show: true,
        actBtn: false,
        search: '',
        sortName: '',
        prevSorkey: '',
        searchRoom: '',

        nameRules: [
            v => !!v || 'Value is required',
            v => v > 0 || 'The Value can not be less a negative number or 0'
        ],
        email: '',
        emailRules: [
            v => !!v || 'E-mail is required',
            v => /.+@.+/.test(v) || 'E-mail must be valid'
        ],
        sortkey: '',
        NewEquipmentToSave: [],
        sortSettings: [
            { 'name': true },
            { 'location': true },
            { 'quantity': true }
        ],
        orderHow: '',
        pageSize: 3,
        desc: true,
        headers: [

            { text: 'Equipment', value: 'name', sortable: true },
            { text: 'Room', value: 'room', sortable: true },
            { text: 'Location', value: 'location', sortable: true },
            { text: 'quantity', value: 'quantity', sortable: true },
            { text: 'More Info', sortable: false, }
        ],
        selectedRooms: [],
        selectedLocations: [],
        filteredRooms: [],
        sublocations: []


    },
    mounted() {

        for (i = 0; i < model.IndexList.length; i++) {
            this.index++;
            this.equipment.push(new Equipment(model.IndexList[i].equipment, model.IndexList[i].description, model.IndexList[i].location, this.index, model.IndexList[i].pictureUrl, model.IndexList[i].quantity, false, model.IndexList[i].id, model.IndexList[i].sub_location, model.IndexList[i].room))
            this.original2.push(new Equipment(model.IndexList[i].equipment, model.IndexList[i].description, model.IndexList[i].location, this.index, model.IndexList[i].pictureUrl, model.IndexList[i].quantity, false, model.IndexList[i].id, model.IndexList[i].sub_location, model.IndexList[i].room))
            this.rooms.push({ room: model.IndexList[i].room, location: model.IndexList[i].location })

        }
        this.original = this.equipment;
        //getting the rooms
        this.updateRooms();

      
    },

    computed: {
        //filteredEquipment() {

        //    return _.orderBy(this.equipment.filter(post => {
        //        var x = post.name.toLowerCase().includes(this.search.toLowerCase())

        //        return x;
        //    }), this.sortName, this.orderHow)
        //}
    },
    methods: {
        updateRooms: function () {
            var roomEdit = [];
            this.rooms = [];
            var locationEdit = [];
            $.each(this.equipment, function (i, el) {
                if ($.inArray(el.room, roomEdit) === -1) roomEdit.push(el.room);
            });


            this.rooms = roomEdit;

            this.x = this.equipment.length;
        },
        orderBy: function (sorKey) {
            if (sorKey === 're-order') {
                this.orderHow = '';
                this.sortName = '';
            }
            if (this.prevSorkey !== sorKey) {
                this.modulo = 0;
            }

            this.sortName = sorKey;

            if (this.modulo % 2 === 0) {
                this.orderHow = 'desc';
            }
            else {
                this.orderHow = 'asc';
            }


            this.modulo++;

            this.prevSorkey = sorKey;

        },
        addItem: function () {
            this.index++;
            this.equipment.push(new Equipment('', '', '', this.index, '', '', true))

        },
        getWhereToSplit: function () {
            for (var i = 0; i < this.equipment.length; i++) {
                if (this.equipment[i].isNew === true) {
                    return this.equipment[i].index - 1;
                }
            }
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
            for (var i = 0; i < editedEquips.length; i++) {
                if (editedEquips[i].name !== this.original2[i].name) {
                    finalEdit.push({ name: editedEquips[i].name, id: editedEquips[i].id });

                }
                if (editedEquips[i].description !== this.original2[i].description) {
                    finalEdit.push({ name: editedEquips[i].description, id: editedEquips[i].id });
                }
                if (editedEquips[i].location !== this.original2[i].location) {
                    finalEdit.push({ name: editedEquips[i].location, id: editedEquips[i].id });
                }
                if (editedEquips[i].room !== this.original2[i].room) {
                    finalEdit.push({ name: editedEquips[i].room, id: editedEquips[i].id });
                }
                if (editedEquips[i].sublocation !== this.original2[i].sublocation) {
                    finalEdit.push({ name: editedEquips[i].sublocation, id: editedEquips[i].id });
                }
                if (editedEquips[i].quantity !== this.original2[i].quantity) {
                    finalEdit.push({ name: editedEquips[i].quantity, id: editedEquips[i].id });
                }
            }
            return finalEdit;
        },
        deleteItem: function (id, i) {
            this.itemsToDelete.push(id);
            var index = this.equipment.map(function (e) { return e.id; }).indexOf(id);
            delete this.equipment.splice(index, 1);
            this.updateIndex();
            return;
        },
        updateIndex: function () {
            for (var i = 0; i <= this.equipment.length; i++) {
                var index = this.equipment.map(function (e) { return e.id; }).indexOf(this.equipment[i].id);
                this.equipment[i].index = index + 1;

            }
        },
        prevPage: function () {
            return;
        },
        nextPage: function () {
            return;
        },
        add: function () {
            this.index++;
            this.equipment.push(new Equipment(this.inputName, this.inputDescription, this.inputLocation, this.index, '', this.inputQuantity, true, '', this.inputSublocation, this.inputRoom))
            this.updateRooms();
            return;
        },
        getFilteredList: function (val) {
            this.selectedLocations = [];
            for (var i = 0; i < this.equipment.length; i++)
            {
                if (this.equipment[i].room === val) {
                    this.selectedLocations.push(this.equipment[i].location)
                }
            }
            return;
        },
        getFilteredSubLocations: function (val) {
            this.sublocations = [];
            for (var i = 0; i < this.equipment.length; i++) {
                if (this.equipment[i].location === val) {
                    this.sublocations.push(this.equipment[i].sublocation)
                }
            }
            return;
        },
        querySelections(v) {
            this.loading = true
            // Simulated ajax query
            setTimeout(() => {
                this.rooms.room = this.rooms.room.filter(e => {
                    return (e || '').toLowerCase().indexOf((v || '').toLowerCase()) > -1
                })
                this.loading = false
            }, 500)
        }, 
        filterRooms: function (val, index) {
            
            this.equipment = this.original;
            this.getFilteredList(val);
            if (index !== null) {
                this.equipment[index].room = val;
            }
            this.equipment = this.equipment.filter(x => x.room === val);
            return;
        }, 

        filterLocations: function (val, index) {
            this.equipment = this.original;
            this.getFilteredSubLocations(val);
            if (index !== null) {
                this.equipment[index].location = val;
            }
            this.equipment = this.equipment.filter(x => x.location === val);
            return;
        },
        filterSubLocations: function (val, index) {
            this.equipment = this.original;
            if (index !== null) {
                this.equipment[index].sublocation = val;
            }
            this.equipment = this.equipment.filter(x => x.sublocation === val);
            return;
        },
        reset: function () {
            this.equipment = this.original;
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
        },
        searchRoom(val)
        {
            val && val !== this.inputRoom && this.querySelections(val)
        }
    }


})
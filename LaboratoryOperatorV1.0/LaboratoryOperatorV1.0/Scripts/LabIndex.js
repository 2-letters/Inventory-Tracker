var x = model;

class Assignment {
    constructor(LabName, Description, id) {
        this.LabName = LabName;
        this.Description = Description;
        this.id = id;
    }
}

var jsObjects = [
    { a: 1, b: 2 },
    { a: 3, b: 4 },
    { a: 5, b: 6 },
    { a: 7, b: 8 }
];

y = jsObjects[0].a;
z = model.LabsForUsers[0].id
modelArray = x[0];


 new Vue({
    el: '#app',
    data: {
        search: '',
        model: model,
        test: model.LabsForUsers[0].id,

        AssignmentList: [
            //new Assignment('Lab 1: introduction', 'This is an introductory course'),
            //new Assignment('Lab 2: Krichoffs law', 'Here we will test Kirchoff'),
            //new Assignment('Lab 3: Intro to radiation', 'TThis is an introductory course'),
            //new Assignment('Lab 4: Spectometer Lab', 'This is an introductory course'),
            //new Assignment('Lab 5: Refraction of the indexes', 'This is an introductory course'),
        ]

    },
    mounted() {
        for (var i = 0; i < model.LabsForUsers.length; i++) {
            this.AssignmentList.push(new Assignment(model.LabsForUsers[i].labName, model.LabsForUsers[i].description, model.LabsForUsers[i].id))
        }
    },
    computed: {

        filteredList() {



            return this.AssignmentList.filter(post => {
                return post.LabName.toLowerCase().includes(this.search.toLowerCase())
            })
        }
     },
     methods:{
         viewLab: function(id) {
             var url = '/Home/PreviewLab/__id__';
             window.location.href = url.replace('__id__', id);
         }
     }

});






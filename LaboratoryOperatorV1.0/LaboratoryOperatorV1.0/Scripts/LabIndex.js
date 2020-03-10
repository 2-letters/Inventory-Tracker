var x = model;

class Assignment {
    constructor(LabName, Description, id, expand) {
        this.LabName = LabName;
        this.Description = Description;
        this.id = id;
        this.expand = expand;
    }
}



 new Vue({
    el: '#app',
    data: {
        search: '',
        model: model,
        //test: model.LabsForUsers[0].id,
        expand: false,
        AssignmentList: [
            //new Assignment('Lab 1: introduction', 'This is an introductory course'),
            //new Assignment('Lab 2: Krichoffs law', 'Here we will test Kirchoff'),
            //new Assignment('Lab 3: Intro to radiation', 'TThis is an introductory course'),
            //new Assignment('Lab 4: Spectometer Lab', 'This is an introductory course'),
            //new Assignment('Lab 5: Refraction of the indexes', 'This is an introductory course'),
        ]

    },
    mounted() {
        if (model.LabsForUsers.length !== 0) {
        for (var i = 0; i < model.LabsForUsers.length; i++) {
            this.AssignmentList.push(new Assignment(model.LabsForUsers[i].labName, model.LabsForUsers[i].description, model.LabsForUsers[i].id, false))
            }
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






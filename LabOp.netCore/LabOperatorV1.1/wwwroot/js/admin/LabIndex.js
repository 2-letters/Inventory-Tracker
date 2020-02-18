
class Assignment {
    constructor(LabName, Description) {
        this.LabName = LabName;
        this.Description = Description;
    }
}



new Vue({
    el: '#app',
    data: {
        search: '',
        AssignmentList: [
            new Assignment('Lab 1: introduction', 'This is an introductory course'),
            new Assignment('Lab 2: Krichoffs law', 'Here we will test Kirchoff'),
            new Assignment('Lab 3: Intro to radiation', 'TThis is an introductory course'),
            new Assignment('Lab 4: Spectometer Lab', 'This is an introductory course'),
            new Assignment('Lab 5: Refraction of the indexes', 'This is an introductory course'),
        ]
    },
    computed: {
        filteredList() {
            return this.AssignmentList.filter(post => {
                return post.LabName.toLowerCase().includes(this.search.toLowerCase())
            })
        }
    }

})


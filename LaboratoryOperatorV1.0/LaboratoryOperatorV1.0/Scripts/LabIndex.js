var x = model;


new Vue({
    el: '#app',
    data: {
        search: '',
        model: model,
        name: model.Name,
        description: model.description,
        two: 2,
        search: '',
        Assignments: [
            { LabName: 'Lab 1: introduction', description: 'This is an introductory course' },
            { LabName: 'Lab 2: Krichoffs law', description: 'Here we will test Kirchoff' },
            { LabName: 'Lab 3: Intro to radiation', description: 'This is an introductory course' },
            { LabName: 'Lab 4: Spectometer Lab', description: 'This is an introductory course' },
            { LabName: 'Lab 5: Refraction of the indexes', description: 'This is an introductory course' },
        ]
    }
})




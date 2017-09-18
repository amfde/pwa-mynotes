
let notes = window.localStorage.getItem('notes') || '{"data":[]}';

let createNote = function(){
    let input = document.querySelector('#formAddNotes input[type="text"]');
    let value = input.value;
    let liNote = document.createElement('li');
    let textNote = document.createTextNode(value);
    let ulNotes = document.querySelector('#notes');
    
    notes.data.push(value);
       
    liNote.appendChild(textNote);
    ulNotes.appendChild(liNote);

    console.log(notes.data);

    window.localStorage.setItem('notes', JSON.stringify(notes));

    input.value = "";    
}

let ListNote = function(){
    //let getNotes = window.localStorage.getItem('notes');
    
    
    notes = JSON.parse(notes);  

    for(let rows in notes){
        let row = notes[rows];

        for (var i = 0; i < row.length; i++) {
            console.log(row[i]);
            let liNote = document.createElement('li');  
            let ulNotes = document.querySelector('#notes');
            let textNote = document.createTextNode(row[i]);
            liNote.appendChild(textNote);  
            ulNotes.appendChild(liNote);        
        }
         
    }    
 
}


document.addEventListener('DOMContentLoaded', function(event){
    let formAddNotes = document.querySelector('#formAddNotes');
    ListNote();
    formAddNotes.addEventListener('submit', function(e){
        e.preventDefault();
        createNote();
    })
})


document.addEventListener('click', function(e){
    let notesTag = document.querySelector('#notes');
    
    if(e.target.parentElement === notesTag){
        if(confirm('Deseja excluir esta nota?')){
            let listOfNotes = document.querySelectorAll('#notes li');
            listOfNotes.forEach(function(item, index){
                if(e.target === item){
                    notes.data.splice(index, 1);
                    notesTag.removeChild(e.target);
                    window.localStorage.setItem('notes', JSON.stringify(notes));
                }
            })
        }
    }

})

if('serviceWorker' in navigator){
    navigator.serviceWorker
    .register('./service-worker.js')
    .then(function(reg){
        console.log('service-worker registrado.');
    })
    .catch(function(err){
        console.log('erro: ', err);
    });

}
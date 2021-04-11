const API_KEY  = '7b4c844a231947c7bc5ad306e8fe8ab0';

const sourcesPicker = document.getElementById('sources-picker');
const headlinesList = document.getElementById('headlines-list');

function populateSources(sources){
    for( let source of sources){            //populates select menu
        const option = document.createElement('option'); //
        option.value = source.id;       
        option.innerText = source.name;
        sourcesPicker.appendChild(option);
    }
}

function fetchSources(){
    const url = 'https://newsapi.org/v2/sources?language=en';
    fetch(url, {            //passes in an object
        headers: {           /// this is a subobject
            'X-Api-Key': API_KEY,
        }
    })
    .then(response => response.json()) //receives promise from http response
    .then(data => {                     //gets back is the data
        console.log(data);          
        if (data.status === 'ok') {     //checks the status
            populateSources(data.sources);  //populates the sources
        }
    });

}

fetchSources();

function clearChildren(parent){
    while (parent.children.length > 0){
        parent.removeChild(parent.lastChild);
    }
}

function populateHeadlines(articles){
    clearChildren(headlinesList); // clears teh list

    for(let article of articles){
        const anchor = document.createElement('a');
        anchor.href = article.url;
        anchor.innerText = article.title;
        anchor.target = '_blank';

        const li = document.createElement('li');
        li.appendChild(anchor);

        headlinesList.appendChild(li);
    }
}

function loadHeadlines(source){
    const url = `https://newsapi.org/v2/everything?sources=${source}&language=en`;
    fetch(url, {
        headers:{
            'X-Api-Key': API_KEY,
        }
    })
    .then(response => response.json())
    .then(data => {    
        if(data.status === 'ok'){
            populateHeadlines(data.articles);
        }
    });
}

sourcesPicker.addEventListener('change', () =>{
    loadHeadlines(sourcesPicker.value);   //logs the changes
})


/*
function loadSources(){
    fetch('http://newsapi.org/v2/sources', {
        headers: {
            'X-Api-Key': API_KEY
        }
    })


    .then(response => response.json())
    .then(data =>{
        console.log(data);
        if(data.status === 'ok'){
            for(let source of data.sources){
                const option = document.createElement('option');
                option.value = source.id;
                option.textContent = source.name;
                sourcesPicker.appendChild(option);
            }
        }

    });
}

loadSources();*/
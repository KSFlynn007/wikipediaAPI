const url = 'https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&origin=*&srsearch=';

const btn = document.querySelector('.btn');
const output = document.querySelector('.output');
const inputVal = document.querySelector('.val');
let attemptCounter = false;
inputVal.placeholder = 'Type Search Here';
btn.textContent = 'Load JSON Data';


btn.addEventListener('click', getData);

function getData(){
    let searchTerm = inputVal.value || 'Web Development';
    let tempURL = url + searchTerm;
    fetch(tempURL).then((rep) => {
        return rep.json();
    }).then((data) => {
        output.innerHTML = '<div class="subtitle">Top 10 Results for ' + searchTerm + '</div>'
        maker(data.query.search);
    }).catch(err => {
        console.log(err);
        output.innerHTML = `<div>Sorry, we are having problems connecting to Wikipedia.</div>`
    })
}

function maker(data){
    data.forEach(element => {
        const div = document.createElement('div');
        div.innerHTML += `<h3><a class="elTitle" href="https://en.wikipedia.org/wiki?curid=${element.pageid}"  target="_blank">${element.title}</a></h3>`;
        div.innerHTML += `<div>Page ID: ${element.pageid} | Wordcount: ${element.wordcount}</div>`;
        div.classList.add('box');
        div.innerHTML += `...${element.snippet}...`
        output.append(div);
    });
    seeMore();
}

function seeMore(){
    const moreDiv = document.createElement('div');
    moreDiv.classList.add('moreDiv');
    const moreButton = document.createElement('button');
    moreButton.classList.add('moreButton')
    if(inputVal.value){
        moreButton.innerHTML += `<a class="moreLink" href="https://en.wikipedia.org/" target="_blank">Search All Results for ${inputVal.value} on Wikipedia</a>`;
    }else{
        moreButton.innerHTML += `<a class="moreLink" href="https://en.wikipedia.org/" target="_blank">Search Anything on Wikipedia</a>`;
    }
    moreDiv.append(moreButton)
    output.append(moreDiv);
}
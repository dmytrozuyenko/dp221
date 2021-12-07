//listeners
document.querySelector('.on-search').addEventListener('click', onSearch);
// document.querySelector('.reset').addEventListener('click',resetButton);

const DATA = {
    input : document.querySelector('.inp-search'),
    reset : document.querySelector('.inp-reset'),
    output : document.querySelector('.output'),
    images : document.querySelector('.images'),
    links : {
        search : 'https://api.artic.edu/api/v1/artworks/search?q=',
        getImage : id => `https://www.artic.edu/iiif/2/${ id }/full/200,/0/default.jpg`,
        details : 'https://api.artic.edu/api/v1/artworks/'
    }
};

function onSearch(){
    const searchVal = DATA.input.value;
    console.log(searchVal, Date.now());
    DATA.images.innerHTML = '';
    loadData(searchVal);
}

function loadData(val){
    const searchLink = `${ DATA.links.search }${ val }`;
    fetch(searchLink)
        .then(r => r.json())
        .then(renderData);
}

function renderData(data){
    console.log(data);
    data.data.map(loadDetails);
}

function loadDetails({ id }){
    const url = `${ DATA.links.details }${ id }`;
    fetch(url)
        .then(r => r.json())
        .then(d => {
            const imageURL = DATA.links.getImage(d.data.image_id);
            DATA.output.innerHTML += getHTML(d.data, imageURL)
        }
        )
}

function getHTML(artwork, image){
    return `<div class="card m-1" style="width: 18rem;">
    <img src="${ image }" class="card-img-top" alt="...">
    <div class="card-body">
        <h5 class="card-title">${ artwork.title }</h5>
        <h6 class="card-subtitle mb-2 text-muted">${ artwork.id }</h6>
        </div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">${ artwork.artist_title }</li>
        </ul>
        <div class="card-body">
        <p class="card-text">${ artwork.thumbnail.alt_text }</p>
    </div>
    </div>`;
}

// function resetButton(){
    
// }
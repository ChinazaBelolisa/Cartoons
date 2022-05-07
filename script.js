const APIPath = "https://api.sampleapis.com/cartoons/cartoons2D";
const numberOfResults = 9;
const cartoonGrid = document.querySelector('#cartoon-grid');
const selectElement = document.querySelector('.form-select');
let cartoons = [];

fetch("https://api.sampleapis.com/cartoons/cartoons2D")
    .then(response => response.json())
    .then((data) => {
        cartoons = data;
        updateCartoons(data);
    });

function updateCartoons(cartoons) {
    let allCardsDom = '';
    cartoons.forEach((cartoon)=>{
        const cardTemplate = 
            `<div class="col">
                <div class="card">
                    <img src="${cartoon.image}"
                        class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${cartoon.title}</h5>
                        <p class="card-text">${cartoon.genre}</p>
                    </div>
                </div>
            </div>`;
            allCardsDom +=cardTemplate;
    });
    cartoonGrid.innerHTML = allCardsDom;
}

function filterByName(filterWord) {
    let filteredArray = [];
    if(filterWord && filterWord.length){
        cartoons.forEach((cartoon) => {
            if(cartoon.genre.includes(filterWord))
                filteredArray.push(cartoon);
        });
    }else {
        return cartoons;
    }
    console.log({filterWord});
    return filteredArray;
}



selectElement.addEventListener('change',(event)=>{
    console.log('Button clicked...');
    selected = event.target.value;
    let filteredList = filterByName(selected);
    updateCartoons(filteredList);
});

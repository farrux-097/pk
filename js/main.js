let elList = document.querySelector(".pokemon-list")
let elSelect = document.querySelector(".pokemon-select")
let elInput  = document.querySelector(".pokemon-input")
let elContentInfo = document.querySelector(".content-information")

function pokemonFunc(arr,list){
    list.innerHTML = ""
    arr.forEach(value => {
        let elItem = document.createElement("li")
        elItem.innerHTML = `
        <img src="${value.img}" alt="${value.name}" >
        <div class="flex items-center justify-between">
            <div>
                <h2>${value.name}</h2>
                <p class"flex"> <span>Type:${value.type.join(",")}</span> </p>
            </div>
            <div class="flex items-center gap-[10px]">
                 <button class=" like-btn p-[5px] ">
                 <img src="./img/like.svg"
                 </button>
                 <button onclick={handleClickMore(${value.id})} class=" more-btn p-[5px] ">More</button>
            </div>
        </div>
        `
        elItem.className = " ul-item-list w-[250px] p-3 border-[1px] border-slate-400 rounded-[30px] flex flex-col justify-center"
        elList.append(elItem)
    });
}

function SelectOption(arr, list){
    let listOption = []
    let sortedOptionContent = []


    arr.forEach(item => {
        listOption = listOption.concat(item.type)
    })

    listOption.filter(item =>{
        if(!sortedOptionContent.includes(item)){
            sortedOptionContent.push(item)
        }
    })

    sortedOptionContent.map(item =>{
        let elOption = document.createElement("option")
        elOption.value = item
        elOption.textContent = item
        list.append(elOption)
    })
}

SelectOption(pokemons, elSelect)
pokemonFunc(pokemons, elList)

elInput.addEventListener("input", (evt) =>{
    const inputValue = evt.target.value.toLowerCase();
    const searchData = pokemons.filter(item => item.name.toLowerCase().includes(inputValue))
    pokemonFunc(searchData,elList)
})


elSelect.addEventListener("change",function(evt) {
    const selectValue = evt.target.value
    if(selectValue == "All"){
        pokemonFunc(pokemons, elList)
    }
    else{
        const selectedPokemons = pokemons.filter(item => item.type.includes(selectValue))
        pokemonFunc(selectedPokemons,elList)
    }
})



function handleClickMore(id){
    const {img,name,type,height,weight,candy,candy_count,egg} = pokemons.find(value => value.id == id)
    elContentInfo.innerHTML=`
    <img src="${img}" alt="${name}" class = "w-[200px] mx-auto" >
    <h2>${name}</h2>
    <p>Type: ${type[0]}</p>
    <p>Height: ${height}</p>
    <p>Weight: ${weight}</p>
    <p>Candy: ${candy}</p>
    <p>Candy Count: ${candy_count}</p>
    <p>Egg: ${egg}</p>`
}
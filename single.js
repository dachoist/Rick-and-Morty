const vanja = localStorage.getItem('user')

const url = `https://rickandmortyapi.com/api/character/${vanja}`

const request = new XMLHttpRequest()
const main = document.querySelector('main')


function createCards(data){


        let div = document.createElement('div')
        div.classList.add('single')
        let img = document.createElement('img')
        let name = document.createElement('h1')
        let gender = document.createElement('h1')
        let species = document.createElement('h1')
        let episode = document.createElement('div')
        let backBtn = document.createElement('button')
        episode.classList.add('eps')
        
        console.log(data);
        
        img.src = data.image
        name.innerHTML = data.name
        gender.innerHTML = data.gender
        species.innerHTML = data.species
        backBtn.innerHTML = "Back to Home"
        backBtn.addEventListener('click', ()=>{
            window.location.href = './index.html'
        })

        data.episode.forEach((e)=> {
            let episodes = document.createElement('p')
            episodes.innerHTML = e
            episode.appendChild(episodes)
        });

        
        div.append(img, name, gender, species, backBtn, episode)
        main.appendChild(div)

}


function fetchData(){
    request.open('GET', url)

    request.send()

    request.onload = function () {
        const data = JSON.parse(request.responseText)
        createCards(data)
        console.log(data);

    }

}

window.addEventListener('load', fetchData)
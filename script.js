var currentPage = 1
const url = `https://rickandmortyapi.com/api/character/?page=`
const request = new XMLHttpRequest()
const main = document.querySelector('main')
const body = document.querySelector('body')
const section = document.querySelector('section')


const page1 = document.createElement('button')
const page2 = document.createElement('button')
const page3 = document.createElement('button')
const page4 = document.createElement('button')
const page5 = document.createElement('button')
const page6 = document.createElement('button')
const page7 = document.createElement('button')

page1.innerHTML = "<<"
page7.innerHTML = ">>"


page2.classList.add('btn-page') 
page3.classList.add('btn-page') 
page4.classList.add('btn-page') 
page5.classList.add('btn-page') 
page6.classList.add('btn-page') 

let btnPages = []

btnPages.push(page2, page3, page4, page5, page6)

section.append(page1, page2, page3, page4, page5, page6, page7)

function numberPagess(){
    if (currentPage == 1 || currentPage == 2) {
        for (var i = 0; i < 5; i++) {
            btnPages[i].innerText = i + 1;
        }
    }
    if (currentPage > 2 && currentPage < 41) {
        btnPages[0].innerText = (currentPage - 2).toString();
        btnPages[1].innerText = currentPage - 1;
        btnPages[2].innerText = currentPage;
        btnPages[3].innerText = currentPage + 1;
        btnPages[4].innerText = currentPage + 2;
    }
    if (currentPage == 41 || currentPage == 42) {
        for (var i = 0; i < 5; i++) {
            btnPages[i].innerText = 38 + i;
        }
    }
    btnPages.forEach((e)=>{
        e.addEventListener('click', (()=>{
            currentPage = e.innerHTML
            fetchData()

        }))
    })

}




page1.addEventListener('click', (()=>{
    currentPage--
    
    fetchData()
    
    if(currentPage<1){
        return currentPage = 1
    }
    // console.log(currentPage);
    numberPagess()
}))


page7.addEventListener('click', (()=>{
    currentPage++

    fetchData()

    if (currentPage>42){
        return currentPage = 42
    }
    
    
    // console.log(currentPage);
    numberPagess()
}))


function createCards(results){

    main.innerHTML = ''
    results.forEach((e) => {
        let div = document.createElement('div')
        let img = document.createElement('img')
        let p = document.createElement('p')
        let btn = document.createElement('button')

        // console.log(e);

        img.setAttribute('src', e.image)
        p.innerHTML = e.name
        btn.innerHTML = "More info"
        btn.addEventListener('click', ()=>{
            window.location.href = './single.html'
            localStorage.setItem('user', e.id)
        })





        div.append(img, p, btn)
        main.appendChild(div)

    });
    

}





function fetchData(){
    request.open('GET', url + currentPage)

    request.send()

    request.onload = function () {
        // console.log(JSON.parse(request.responseText));
        createCards(JSON.parse(request.responseText).results)

    }

}





window.addEventListener('load', fetchData)
window.addEventListener('load', numberPagess)
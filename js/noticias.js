const API_KEY = 'af756598f27145f8a09990d89427f4b3'
const BASE_API = 'http://newsapi.org/'

const painelNoticias = document.getElementById('listaDeNoticias')
const ultimas = document.getElementById('ultimas')
const tecnologia = document.getElementById('tecnologia')

const tech = '&category=technology'

function makeCard(img, title, text, link) {
  const card = document.createElement('div')
  card.insertAdjacentHTML('beforeend',
  `<div class="card">
  <img
    class="card-img-top"
    src="${img}"
  />
  <div class="card-body">
    <h5 class="card-title">
      ${title}
    </h5>
    <p class="card-text">
      ${text}
    </p>
    <a
      class="btn btn-primary"
      href="${link}"
      >Ir para noticia</a>
  </div>`
  )

  const div = document.createElement('div')
  div.className = 'col-md-6 my-3'
  div.appendChild(card)
  painelNoticias.appendChild(div)
}

async function getNoticias(categoria = '') {
  const res = await fetch(`${BASE_API}/v2/top-headlines?country=br${categoria}`, {
    method: 'GET',
    headers: {
      Authorization: API_KEY,
    },
  })

  const noticias = await res.json()
  
  console.log(res)
  console.log(noticias)
  noticias.articles.forEach(noticia => {
    makeCard(
      noticia.urlToImage,
      noticia.title,
      noticia.description,
      noticia.url
      )
    })
  }


getNoticias()

tecnologia.onclick = (event) => {
  event.preventDefault()
  painelNoticias.innerHTML = ''
  getNoticias(tech)
}

ultimas.onclick = (event) => {
  event.preventDefault()
  painelNoticias.innerHTML = ''
  getNoticias()
}
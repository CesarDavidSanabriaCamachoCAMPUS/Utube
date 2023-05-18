/* 
   programa para consumir una API de youtube que permita ver el video, el titulo
   los videos relacionados, la foto y el nombre del canal del video y por ultimo
   los comentarios y la descripcion de el mismo 
*/
// Autor: Cesar David Sanabria Camacho
// fecha: 17/05/2023

// declaracion de variables
let iframe = document.querySelector('iframe');
let videoTitle = document.querySelector('.title')
let photoChannel = document.querySelector('.photoChannel')
let nameChannelText = document.querySelector('.nameChannelText')
let Container = document.querySelector('.feedback')
let videoDescription = document.querySelector('.videoDescription')
let advisedVideos = document.querySelector('.advisedVideos')

// variable que recibe la informacion del search por medio de la accion "click" en el "button"
let button = document.querySelector('.button');
button.addEventListener('click', (e)=>{
    e.preventDefault();

    const data = document.querySelector('.search').value;
    console.log(data)
    getVideos(data)
})

// variable constante que contiene el metodo GET para traer la informacion de la API 
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '8dea6af0demsha5896400295d7c0p1f2eadjsn372ee8ed211a',
		'X-RapidAPI-Host': 'youtube138.p.rapidapi.com'
	}
};

// variable constante para llamar la informacion de los videos de la API
const getVideos = async (data) => {
    const videos = await (
      await fetch(
        `https://youtube138.p.rapidapi.com/search/?q=${data}&hl=en&gl=US`,
        options
      )
    ).json();
   
    iframe.src = `https://www.youtube.com/embed/${videos.contents[0].video.videoId}`// inserta el video

    videoTitle.innerHTML = videos.contents[0].video.title;// inserta el titulo del video

    photoChannel.src = videos.contents[0].video.author.avatar[0].url;// inserta la foto del canal

    nameChannelText.innerHTML = videos.contents[0].video.author.title;// inserta el nombre del canal

    videoDescription.innerHTML = videos.contents[0].video.descriptionSnippet// inserta la descripcion del video

    //ciclo for para los videos recomendados
    for (let y = 0; y < videos.contents.length; y++){
      const div2 = document.createElement('div')
      div2.setAttribute('class', 'advisedVideosItem')

      div2.innerHTML= `
        <iframe width="200px" height="130px" src="https://www.youtube.com/embed/${videos.contents[y].video.videoId}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
    `
      advisedVideos.appendChild(div2)
    }

    // variable constante para llamar la informacion de los comentarios de la API
    const comentarios = await (
      await fetch(
        `https://youtube138.p.rapidapi.com/video/comments/?id=${videos.contents[0].video.videoId}&hl=en&gl=US`,
        options
      )
    ).json();

    // ciclo for para consumir los comentarios necesarios de la API
    for (let x = 0; x < comentarios.comments.length; x++) {
      const div = document.createElement('div');
      div.setAttribute('class', 'feedbackItem');

      div.innerHTML = `
        <h5 class="feedbackName">${comentarios.comments[x].author.title}</h5>
        <p class="feedbackContent">${comentarios.comments[x].content}</p>
    `;

    Container.appendChild(div)

    }

  };


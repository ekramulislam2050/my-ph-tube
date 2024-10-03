//  fetch data categories and display
const loadCategories = async () => {
    try {
        const res = await fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
        const data = await res.json()
        const categoriesOfData = data.categories
        displayData(categoriesOfData)
    }
    catch (error) {
        console.log(error)
    }
}
const displayData = (categoriesOfData) => {
    categoriesOfData.forEach(item => {
        const btnContainer = document.getElementById("categories");
        const div = document.createElement("div");
        div.innerHTML=`
            <button class="btn" onclick="categoriesOfVideo( ${item.category_id
            })">
                ${item.category}
            </button>
        `
        
        btnContainer.appendChild(div)
    })

}
loadCategories();
// data fetch for videos
const fetchVideos = async () => {
  try{
    const dataOfVideos = await fetch('https://openapi.programming-hero.com/api/phero-tube/videos')
    const data = await dataOfVideos.json()
    const videos = data.videos
    displayVideos(videos)
  }
  catch(error){
        console.log(error)
  }

}
// load categories of videos
const categoriesOfVideo = async(id)=>{
    console.log(id)
    try{
        const res = await fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
        const data = await res.json()
        const video = data.categories
        displayVideos(video)
      }
      catch(error){
            console.log(error)
      }
    
}

// convert time
const timeConverter = (time) =>{
     const hours = parseInt(time / 3600);
     const  remainingSecond = time % 3600;
     const minute = parseInt( remainingSecond / 60);
     const second = remainingSecond % 60;
     return `${hours} hour ${minute} minute ${second} second ago`
}
// display videos
const displayVideos = (videos) => {
    console.log(videos)
    const cardContainer = document.getElementById("card-container");
    cardContainer.innerHTML=''
    videos.forEach((video) => {
       
        const div = document.createElement("div")
        div.classList.add = ("card card-compact")
        div.innerHTML =
            `
                <figure class="h-[200px] relative">
                    <img class="h-full w-full object-cover"
                    src=${video.thumbnail} 
                    alt="Shoes" />
                    ${video.others.posted_date.length == 0?'':`<span class="absolute right-4 bottom-2 bg-black text-white rounded p-1 text-xs"> ${timeConverter(video.others.posted_date)}</span> `}

                    
                </figure>
                <div class="px-0 py-2 flex">
                  <div class = 'w-10 h-10'>
                      <img class="w-full h-full   rounded-full object-cover" src=${video.authors[0].
                        profile_picture}/>
                  </div>
                  <div class="">
                      <h2 class="font-bold pl-2">${video.title
                        }</h2>
                        <div class="flex pl-2">
                           <p>${video.authors[0].profile_name} </p>
                           ${video.authors[0].
                            verified == true?`<img class="w-5 h-5 pl-1" src="https://img.icons8.com/?size=48&id=D9RtvkuOe31p&format=png"/>`:""
                            }
                           
                        </div>
                  </div>
                </div>
    
       
       `
       cardContainer.appendChild(div)
    })
}
fetchVideos()
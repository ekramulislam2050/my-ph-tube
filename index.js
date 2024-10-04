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
    const btnContainer = document.getElementById("categories");
    categoriesOfData.forEach(item => {
       
        const div = document.createElement("div");
        div.innerHTML=`
            <button class="btn categories-btn" id="${item.category_id}" onclick="categoriesOfVideo( ${item.category_id})">
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
const addRemove = ()=>{
    const buttons = document.getElementsByClassName("categories-btn");
    for(let btn of buttons){
        btn.classList.remove("active")
    }
}
// load categories of videos
const categoriesOfVideo = async(id)=>{

    try{
        const res = await fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
        const data = await res.json()
        const video = data.category
        addRemove ()
         const activeBtn = document.getElementById(id);
         activeBtn.classList.add("active")
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
// load details
const loadDetails=async(videoId)=>{
     const uri = 'https://openapi.programming-hero.com/api/phero-tube/video/aaac'
     try{
        const res = await fetch(uri)
        const details = await res.json()
        displayDetails(details)
     }
     catch(error){
        console.log(error)
     }
    
}
// display details
const displayDetails=(details)=>{
     document.getElementById("modalBtn").click();
}
// display videos
const displayVideos = (videos) => {
    const cardContainer = document.getElementById("card-container");
     cardContainer.innerHTML='';
     if(videos.length == 0){
        cardContainer.classList.remove("grid")
        cardContainer.innerHTML=` 
                <div class='min-h-[400px] flex flex-col w-full justify-center items-center'>
                  <img src="./asset/Icon.png"/>
                  <h2 class="text-xl font-bold text-center">No content here in this category </h2>
                     
               </div>
               `
              
      
     }else{
        cardContainer.classList.add("grid")
     }
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
                          <p> <button class="btn btn-sm btn-error" onclick="loadDetails('${video.video_id}')">details</button  </p>
                  </div>
               
                  
              
                </div>
    
       
       `
       cardContainer.appendChild(div)
       
    })
}
fetchVideos()
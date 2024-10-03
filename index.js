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
        const button = document.createElement("button");
        button.classList.add("btn");
        button.innerText = item.category;
        btnContainer.appendChild(button)
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
// display videos
const displayVideos = (videos) => {
    videos.forEach((video) => {
        const cardContainer = document.getElementById("card-container");
        const div = document.createElement("div")
        div.classList.add = ("card card-compact")
        div.innerHTML =
            `
                <figure>
                    <img
                    src=${video.thumbnail} 
                    alt="Shoes" />
                </figure>
                <div class="card-body">
                    <h2 class="card-title">Shoes!</h2>
                    <p>If a dog chews shoes whose shoes does he choose?</p>
                    <div class="card-actions justify-end">
                    <button class="btn btn-primary">Buy Now</button>
                    </div>
                </div>
    
       
       `
       cardContainer.appendChild(div)
    })
}
fetchVideos()
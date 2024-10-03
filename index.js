//  fetch data categories and display
const loadCategories = async()=>{
   try{
    const res = await fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
    const data = await res.json()
    const categoriesOfData =  data.categories
     displayData(categoriesOfData)
   }
   catch(error){ 
        console.log(error)
   }
}
const displayData=(categoriesOfData)=>{
     categoriesOfData.forEach(item=>{
       const btnContainer = document.getElementById("categories");
       const button = document.createElement("button");
       button.classList.add("btn");
       button.innerText = item.category;
       btnContainer.appendChild(button)
     })
    
}
loadCategories()
// Initialize all elements  in const..

const temperateField = document.querySelector(".weather1");
const cityField = document.querySelector(".weather2 p");
const dateField = document.querySelector(".weather2 span");
const emojiField = document.querySelector(".weather3 img");
const weatherField = document.querySelector(".weather3 span");
const searchField = document.querySelector(".searchField");
const form = document.querySelector("form");

// Add event  Listner to  form 
form.addEventListener("submit",search);

// Deafault Loaction
let target = "karachi";

// Function to fetch Data from weather API
const fetchData = async (target)=>{
    try {
        const url = `https://api.weatherapi.com/v1/current.json?key=bc743e844f594d81a0a100610231605&q=${target}`
        const response = await fetch(url);
        const data = await response.json();
        
        // Destructuring
        const {
            current:{temp_c,condition:{ text , icon},},
            location:{name,localtime},
    
        } = data;
    // Calling update dom function
        updateDom(temp_c,name,localtime,icon,text);
    } catch (error) {
        alert("Location not Found");
    }

};

// Function to  update the  DOM
function updateDom (temperate,city,time,emoji,text){
    const exactTime = time.split(" ")[1];
    const exactDate = time.split(" ")[0];
    const exactDay = getDayFullname(new Date(exactDate).getDay());

    temperateField.innerText = temperate;
    cityField.innerText = city;
    dateField.innerText = `${exactTime} - ${exactDay} ${exactDate}`;
    emojiField.src = emoji;
    weatherField.innerText = text;
}

fetchData(target);

// Function to  search the location
function search(e){
    e.preventDefault()
    target = searchField.value;
    fetchData(target);
    
}
// Function to get name of day
function getDayFullname(num){
    switch (num) {
        case 0:
            return "Sunday";
        case 1:
            return "Monday";
        case 2:
            return "Tuesday";
        case 3:
            return "Wednesday";
        case 4:
            return "Thursday";
        case 5:
            return "Friday";
        case 6:
            return "Saturday";
            
        default:
            return "Dont Know";
    }
}




let tracker = []
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteAll = document.getElementById("delete-all")
const tabBtn = document.getElementById("tab-btn")

deleteAll.addEventListener("dblclick",()=>{
    localStorage.clear()
    tracker = []
    render(tracker)
})
 
const trackFromLocaStorage = JSON.parse(localStorage.getItem("tracker"))

if(trackFromLocaStorage){
    tracker = trackFromLocaStorage
    render(tracker)
}
inputBtn.addEventListener("click", function() {

    tracker.push(inputEl.value)
    localStorage.setItem("tracker",JSON.stringify(tracker))

    clearinput()
    render(tracker)
})

tabBtn.addEventListener("click", ()=>{

    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        tracker.push(tabs[0].url)
        localStorage.setItem("tracker",JSON.stringify(tracker))
        render(tracker)
    })

})
function render(track){
    let listItems = ""

    for(let i = 0; i < track.length; i++){

       listItems +=`
                    <li>
                        <a href = "${ track[i] }" target="_blank" >
                            ${ track[i] } 
                        </a>
                    </li>
                    `   
    }


    ulEl.innerHTML = listItems
}

function clearinput(){
    inputEl.value = ""
}


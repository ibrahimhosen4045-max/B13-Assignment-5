let allIssues = [];

const allCards = document.getElementById("all-card");
const cardCount = document.getElementById("card-count")

const allBtn = document.getElementById("all-card-btn")
const OpenBtn = document.getElementById("Open-card-btn")
const closedBtn = document.getElementById("close-card-btn")

const spiner = document.getElementById("spiner")

const managSpiner = (spin) => {
    if (spin === true){
        spiner.classList.remove("hidden")
        allCards.classList.add("hidden")
    } else {
        spiner.classList.add("hidden")
        allCards.classList.remove("hidden")
    }
}


const count = () => {
    cardCount.innerText = allCards.children.length
}

let colorBtn = ["btn-primary", "text-white"]
allBtn.classList.add(...colorBtn)

const removeBtnColor = (id) => {
    const color = document.getElementById(id)
    OpenBtn.classList.remove(...colorBtn)
    closedBtn.classList.remove(...colorBtn)
    allBtn.classList.remove(...colorBtn)
    color.classList.add(...colorBtn)
}


const toggoling = (id) => {
    managSpiner(true)
    setTimeout(()=>{
        if(id === "all-card-btn"){
        creatCard(allIssues)
        removeBtnColor("all-card-btn")
        

    } else if (id === "Open-card-btn"){
        const openIssues = allIssues.filter(issue => issue.status === "open")
        creatCard(openIssues)
        removeBtnColor("Open-card-btn")
        

    } else if (id === "close-card-btn"){
        const closedIssues = allIssues.filter(issue => issue.status === "closed")
        creatCard(closedIssues)
        removeBtnColor("close-card-btn")
        
    }
    },100)
}


const creatLabels = (arr) => {
    const labelStyle = {
        bug: {
            icon: "fa-bug",
            text: "text-red-500",
            bg: "bg-red-100"
        },
        "help wanted": {
            icon: "fa-solid fa-life-ring",
            text: "text-amber-600",
            bg: "bg-amber-100"
        },
        enhancement: {
            icon: "fa-star",
            text: "text-green-500",
            bg: "bg-green-100"
        },
        documentation: {
            icon: "fa-star",
            text: "text-blue-500",
            bg: "bg-blue-100"
        }
    }
    const creatLabBtn = arr.map((elm) => {
        const style = labelStyle[elm] || {
            icon: "fa-tag",
            text: "text-gray-500",
            bg: "bg-gray-100"
        }
        return `
         <button class="${style.text} ${style.bg} text-sm uppercase  py-0.5 px-2 rounded-full space-y-2
         ">
            <i class="fa-solid ${style.icon}"></i> ${elm}
        </button>
        `
    
})
return creatLabBtn.join(" ")
}

const priorityColor = (cards) => {
    let priorityClass = "";
        if(cards.priority === "high"){
            priorityClass = "text-red-500 bg-red-100"
        } else if (cards.priority === "medium"){
            priorityClass = "text-amber-600 bg-amber-100"
        } else if (cards.priority === "low"){
            priorityClass = "text-gray-500 bg-gray-100"
        }
    return priorityClass;
}
const singleIssue = async (id) => {
    const url = `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`
    const res = await fetch(url);
    const details = await res.json();
    cardDetails(details.data)
}
const cardDetails = (details) => {
    let statusColor = "";
    if(details.status === "open"){
        statusColor = "text-white bg-green-500"
    } else if(details.status === "closed"){
        statusColor = "text-white bg-purple-500"
    }

    const detailsBox = document.getElementById("details-container")
    detailsBox.innerHTML = `
    <div class="space-y-2">
            <h1 class="text-2xl font-bold">${details.title}</h1>
        <div class="flex items-center gap-3">
            <button class="text-sm ${statusColor} rounded-full py-1.5 px-3
             font-medium ">${details.status}</button>
            <div class="flex gap-1 text-[#64748B] text-sm items-center"><div class="size-1 rounded-full bg-[#64748B]"></div>  <p>${details.status}</p> by <p>${details.assignee}</p> <div class="size-1 rounded-full bg-[#64748B]"></div> <p>${details.createdAt}</p></>
            </div>
        </div>
        </div>
        <div class="">
            ${creatLabels(details.labels)}
        </div>
        <p class="text-[#64748B]">${details.description}</p>
        <div class="flex items-center p-4 bg-gray-100 rounded-lg">
            <div class="flex-1 space-y-2">
                <h1 class="text-[#64748B]">Assignee:</h1>
                <p class="font-semibold">${details.assignee ? details.assignee : "Unassign"}</p>
            </div>
            <div class="flex-1 space-y-2">
                <h1 class="text-[#64748B]">Priority</h1>
                <button class=" text-sm py-1 w-20 ${priorityColor(details)} uppercase rounded-full font-medium">${details.priority}</button>
            </div>
        </div>
    <div class="modal-action">
      <form method="dialog">
        <!-- if there is a button in form, it will close the modal -->
        <button class="btn btn-primary">Close</button>
      </form>
    </div>
    </div>
    `
    document.getElementById("my_modal_5").showModal()
   
}

const allIssuesCard = () => {
    managSpiner(true)
    const url = `https://phi-lab-server.vercel.app/api/v1/lab/issues`
    fetch(url)
        .then((res) => res.json())
        .then((data) => {
            allIssues = data.data
            setTimeout(()=>{
                creatCard(data.data)
            },1000)
        })
        
}
allIssuesCard()

const creatCard = (cards) => {
    
     const allCard = document.getElementById("all-card")
     
     allCard.innerHTML = "";

     cards.forEach(card => {
        
        let openCloseImg = "";
        if(card.status === "open"){
            openCloseImg = "Open-Status.png"
        } else if (card.status === "closed"){
            openCloseImg = "closed-card.png"
        }

        const div = document.createElement("div")

        if(card.status === "open"){
            div.classList.add("border-t-5", "border-green-500")
        } 
        if(card.status === "closed"){
            div.classList.add("border-t-5", "border-purple-500")
        }
        div.classList.add("bg-white", "rounded-lg", "shadow-md")
        
 
        div.innerHTML = `
        <div class="p-4 space-y-2.5 ">
            <div class="flex justify-between items-center">
            <img src="./assets/${openCloseImg}" alt="">
            <button id="priority" class="py-1 w-20 ${priorityColor(card)} text-sm uppercase rounded-full font-medium">${card.priority}</button>
        </div>
        <h1 class=" font-semibold">${card.title}</h1>
        <p class="text-sm text-[#64748B]">${card.description}</p>
        <div class="">
            ${creatLabels(card.labels)}
        </div>
        </div>
        <hr class="text-gray-300 ">
        <div class=" p-4 text-[#64748B]">
            <p class="">#${card.id}by ${card.author}</p>
            <p class="text-sm">${card.createdAt}</p>
        </div>
        `
        
        div.addEventListener("click", ()=> {
            singleIssue(card.id)
        })
        allCard.appendChild(div)
        
     })
     count()
     managSpiner(false)
}


const inputValue = document.getElementById("search-value")
inputValue.addEventListener("input", () => {
    const value = inputValue.value.trim().toLowerCase();
    managSpiner(true)
    fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${value}`)
        .then((res)=> res.json())
        .then((data) => {
            if(value !== ""){
                creatCard(data.data)
            } else {
                creatCard(allIssues)
            }
        })
})


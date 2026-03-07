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
         <button class="${style.text} ${style.bg} text-sm py-0.5 px-2 rounded-full space-y-2
         ">
            <i class="fa-solid ${style.icon}"></i> ${elm}
        </button>
        `
    
})
return creatLabBtn.join(" ")
}

const singleIssue = (id) => {
    const url = `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`
    fetch(url)
        .then((res) => res.json())
        .then((data) => {
            console.log(data.data)
        })
}

const allIssuesCard = () => {
    const url = `https://phi-lab-server.vercel.app/api/v1/lab/issues`
    fetch(url)
        .then((res) => res.json())
        .then((data) => {
            console.log(data.data)
            creatCard(data.data)
        })
}
allIssuesCard()

const creatCard = (cards) => {
    
     const allCard = document.getElementById("all-card")
     allCard.innerHTML = "";

     cards.forEach(card => {
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
            <img src="./assets/Open-Status.png" alt="">
            <button id="priority" class="py-1 w-20 bg-red-100 text-sm uppercase rounded-full font-medium">${card.priority}</button>
        </div>
        <h1 class=" font-semibold">${card.title}</h1>
        <p class="text-sm text-[#64748B]">${card.description}</p>
        <div class="">
            ${creatLabels(card.labels)}
        </div>
        </div>
        <hr class="text-gray-300 ">
        <div class=" p-4 text-[#64748B]">
            <p class="">#1by ${card.author}</p>
            <p class="text-sm">${card.updatedAt}</p>
        </div>
        `
        div.addEventListener("click", ()=> {
            singleIssue(card.id)
        })
        allCard.appendChild(div)
     })
}


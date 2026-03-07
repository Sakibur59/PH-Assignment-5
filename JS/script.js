let all = [];
let loadData = () => {
  manageLoading();
  fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    .then((res) => res.json())
    .then((json) => {
      all = json.data;
      displayALLIssues(all);
      hideLoading();
    });
};

const loadIssuesDetails = async (id) =>{
  const url = `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`;
  const res = await fetch(url);
  const details = await res.json();
  displayIssuesDetails(details.data);

};

function manageLoading () {
  document.getElementById("loading-bar").classList.remove('hidden');
}
function hideLoading(){
  document.getElementById("loading-bar").classList.add('hidden');
}



const displayIssuesDetails=(issue) =>{
  const issuesBox = document.getElementById("details-container");

  const lvl =
      issue.labels
        .map((label) => {
          if (label === "enhancement") {
            return `<span class="text-[green] border rounded-md px-3 py-1 ">${label.toUpperCase()}</span>`;
          }
          if (label === "bug") {
            return `<span class="text-[#EF4444] border rounded-md px-3 py-1 ">${label.toUpperCase()}</span>`;
          }
          if (label === "help wanted") {
            return `<span class="text-[#D97706] px-3 py-1 border rounded-md ">${label.toUpperCase()}</span>`;
          }
          if (label === "good first issue") {
            return `<span class="text-[green] border rounded-md px-3 py-1 ">${label.toUpperCase()}</span>`;
          }
          if (label === "documentation") {
            return `<span class="text-[#D97706] border rounded-md px-3 py-1 ">${label.toUpperCase()}</span>`;
          }
        })
        .join("") || "";

        let textStatus = "text-white"
        let colorStatus = "bg-[#00A96E]"
       
        if(issue.status === 'closed'){
          textStatus = "text-white"
          colorStatus = "bg-red-500"
          
        }
        let colorStatus1 = "bg-[#EF4444]"
        if(issue.priority === 'medium'){
          colorStatus1 = "bg-[#F59E0B]"
        }

        if(issue.priority === 'low'){
          colorStatus1 = "bg-[#9CA3AF]"
        }

  issuesBox.innerHTML = `
  <div>
            <h3 class="font-bold text-[24px]">${issue.title}</h3>

            <ul class="flex gap-8 list-disc">
              <li class="list-none ${textStatus} ${colorStatus} rounded-md px-4 py-1">${issue.status}</li>
              <li class="text-[#64748B]">Opened by Md Sakibur </li>
              <li class="text-[#64748B]">22/02/2026</li>
            </ul>

            <div class="flex flex-wrap gap-2 text-[12px] mt-5">${lvl}</div>

            <p class="text-[#64748B] mt-4">${issue.description}</p>

            <div class="flex justify-between mt-6">
              <div>
                <p class="text-[#64748B]">Assignee:</p>
                <p class="text-[#1F2937] font-semibold">${issue.assignee ? issue.assignee : "Unassigned"}</p>
              </div>
              <div>
                <p class="text-[#64748B]">Priority:</p>
                <p class="text-white ${colorStatus1} font-semibold px-2 py-1 rounded-md">${issue.priority}</p>
              </div>
            </div>
          </div>
  `
  document.getElementById("issue_modal").showModal();
}

const totalIssues = document.getElementById("total-issues");

const displayALLIssues = (issues) => {
  
  const issuesContainer = document.getElementById("issues-container");
  issuesContainer.innerHTML = "";
  issues.forEach((issue) => {
    const lvl =
      issue.labels
        .map((label) => {
          if (label === "enhancement") {
            return `<span class="text-[green] border rounded-md px-3 py-1 ">${label.toUpperCase()}</span>`;
          }
          if (label === "bug") {
            return `<span class="text-[#EF4444] border rounded-md px-3 py-1 ">${label.toUpperCase()}</span>`;
          }
          if (label === "help wanted") {
            return `<span class="text-[#D97706] px-3 py-1 border rounded-md ">${label.toUpperCase()}</span>`;
          }
          if (label === "good first issue") {
            return `<span class="text-[green] border rounded-md px-3 py-1 ">${label.toUpperCase()}</span>`;
          }
          if (label === "documentation") {
            return `<span class="text-[#D97706] border rounded-md px-3 py-1 ">${label.toUpperCase()}</span>`;
          }
        })
        .join("") || "";




    let border = "border-[#00A96E]";
    let logo = "./assets/Open-Status.png";

    if (issue.priority == "low") {
      border = "border-[#A855F7]";
      logo = "./assets/Closed-Status.png";
    }

    const issueDiv = document.createElement("div");
    issueDiv.innerHTML = `
        <div onclick="loadIssuesDetails(${issue.id})" class="p-4 space-y-3 shadow-sm border-t-4 ${border} rounded-md">
          <div class="flex justify-between">
            <img src=${logo} alt="" />
            <p class="text-[#EF4444] ">${issue.priority}</p>
          </div>
          <h3 class="text-black font-semibold">${issue.title}</h3>
          <p class="text-[#64748B] line-clamp-2">${issue.description}</p>
          <div class="flex flex-wrap gap-2 text-[12px]">${lvl}</div>
          <p class="text-[#64748B]">#${issue.id} by ${issue.author}</p>
          <p class="text-[#64748B]">Assignee: ${issue.assignee ? issue.assignee : "Unassigned"}</p>
        </div>
        `;
    issuesContainer.append(issueDiv);
    totalIssues.innerText = issues.length;
  });
  
};

let allBtn = document.getElementById("all-btn");
let openBtn = document.getElementById("open-btn");
let closeBtn = document.getElementById("close-btn");

function toggle(id) {
  allBtn.classList.remove("bg-[#4A00FF]", "text-white");
  openBtn.classList.remove("bg-[#4A00FF]", "text-white");
  closeBtn.classList.remove("bg-[#4A00FF]", "text-white");

  allBtn.classList.add("bg-white", "text-[#64748B]");
  openBtn.classList.add("bg-white", "text-[#64748B]");
  closeBtn.classList.add("bg-white", "text-[#64748B]");

  let selected = document.getElementById(id);
  selected.classList.remove("bg-white", "text-[#64748B]", "border-gray-300");
  selected.classList.add("bg-[#4A00FF]", "text-white");

  if (id === "open-btn") {
    openIssueList();
   
  } else if (id === "all-btn") {
    manageLoading();
    setTimeout(()=>{
      displayALLIssues(all);
      hideLoading();
    },50)
  } else if (id === "close-btn") {
    closeIssueList();
  }
}

const displayOpenIssuesList = (issues) => {
  
  const issuesContainer = document.getElementById("issues-container");
  issuesContainer.innerHTML = "";
  issues.forEach((issue) => {
    const lvl =
      issue.labels
        .map((label) => {
          if (label === "enhancement") {
            return `<span class="bg-[#D97706] text-[black] border rounded-md px-3 py-1 ">${label.toUpperCase()}</span>`;
          }
          if (label === "bug") {
            return `<span class="bg-[#D97706] text-[black] border rounded-md px-3 py-1 ">${label.toUpperCase()}</span>`;
          }
          if (label === "help wanted") {
            return `<span class="bg-[#D97706] text-[black] px-3 py-1 border rounded-md ">${label.toUpperCase()}</span>`;
          }
          if (label === "good first issue") {
            return `<span class="bg-[#D97706] text-[black] border rounded-md px-3 py-1 ">${label.toUpperCase()}</span>`;
          }
          if (label === "documentation") {
            return `<span class="bg-[#D97706] text-[black] border rounded-md px-3 py-1 ">${label.toUpperCase()}</span>`;
          }
        })
        .join("") || "";

    let border = "border-[#00A96E]";
    let logo = "./assets/Open-Status.png";

    const issueDiv = document.createElement("div");
    issueDiv.innerHTML = `
        <div onclick="loadIssuesDetails(${issue.id})" class="p-4 space-y-3 shadow-sm border-t-4 ${border} rounded-md">
          <div class="flex justify-between">
            <img src=${logo} alt="" />
            <p class="text-[#EF4444] ">${issue.priority}</p>
          </div>
          <h3 class="text-black font-semibold">${issue.title}</h3>
          <p class="text-[#64748B] line-clamp-2">${issue.description}</p>
          <div class="flex flex-wrap gap-2 text-[12px]">${lvl}</div>
          <p class="text-[#64748B]">#${issue.id} by ${issue.author}</p>
          <p class="text-[#64748B]">Assignee: ${issue.assignee ? issue.assignee : "Unassigned"}</p>
        </div>
        `;
    issuesContainer.append(issueDiv);
    totalIssues.innerText = issues.length;
  });
};

const openIssueList = () => {
  manageLoading();
  setTimeout(()=>{

    const openIssue = all.filter((item) => item.status === "open");
    displayOpenIssuesList(openIssue);
    hideLoading();
  },50)
};

const displayCloseIssuesList = (issues) => {
  
  const issuesContainer = document.getElementById("issues-container");
  issuesContainer.innerHTML = "";
  issues.forEach((issue) => {
    const lvl =
      issue.labels
        .map((label) => {
          if (label === "enhancement") {
            return `<span class="bg-[#D97706] text-[black] border rounded-md px-3 py-1 ">${label.toUpperCase()}</span>`;
          }
          if (label === "bug") {
            return `<span class="bg-[#D97706] text-[black] border rounded-md px-3 py-1 ">${label.toUpperCase()}</span>`;
          }
          if (label === "help wanted") {
            return `<span class="bg-[#D97706] text-[black] px-3 py-1 border rounded-md ">${label.toUpperCase()}</span>`;
          }
          if (label === "good first issue") {
            return `<span class="bg-[#D97706] text-[black] border rounded-md px-3 py-1 ">${label.toUpperCase()}</span>`;
          }
          if (label === "documentation") {
            return `<span class="bg-[#D97706] text-[black] border rounded-md px-3 py-1 ">${label.toUpperCase()}</span>`;
          }
        })
        .join("") || "";

    let border = "border-[#A855F7]";
    let logo = "./assets/Closed-Status.png";

    const issueDiv = document.createElement("div");
    issueDiv.innerHTML = `
        <div onclick="loadIssuesDetails(${issue.id})" class="p-4 space-y-3 shadow-sm border-t-4 ${border} rounded-md">
          <div class="flex justify-between">
            <img src=${logo} alt="" />
            <p class="text-[#EF4444] ">${issue.priority}</p>
          </div>
          <h3 class="text-black font-semibold">${issue.title}</h3>
          <p class="text-[#64748B] line-clamp-2">${issue.description}</p>
          <div class="flex flex-wrap gap-2 text-[12px]">${lvl}</div>
          <p class="text-[#64748B]">#${issue.id} by ${issue.author}</p>
          <p class="text-[#64748B]">Assignee: ${issue.assignee ? issue.assignee : "Unassigned"}</p>
        </div>
        `;
    issuesContainer.append(issueDiv);
    totalIssues.innerText = issues.length;
  });
};

const closeIssueList = () => {
  manageLoading();
  setTimeout(()=>{

    const closeIssue = all.filter((item) => item.status === "closed");
    displayCloseIssuesList(closeIssue);
    hideLoading();
  },50)
};

loadData();

document.getElementById("search-btn").addEventListener("click", () => {
  const searchInput = document.getElementById("search-input");
  const searchValue = searchInput.value.trim().toLowerCase();
  console.log(searchValue);

    const filter = all.filter((issue)=>issue.title.toLowerCase().includes(searchValue));
    displayALLIssues(filter);
});

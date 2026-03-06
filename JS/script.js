let all = [];
let loadData = () => {
  fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    .then((res) => res.json())
    .then((json) => {
        all=json.data;
        displayALLIssues(all);
    });
};
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
        <div class="p-4 space-y-3 shadow-sm border-t-4 ${border} rounded-md">
          <div class="flex justify-between">
            <img src=${logo} alt="" />
            <p class="text-[#EF4444] ">${issue.priority}</p>
          </div>
          <h3 class="text-black font-semibold">${issue.title}</h3>
          <p class="text-[#64748B] line-clamp-2">${issue.description}</p>
          <div class="flex flex-wrap gap-2 text-[12px]">${lvl}</div>
          <p class="text-[#64748B]">#1by john_doe</p>
          <p class="text-[#64748B]">1/15/2024</p>
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
  allBtn.classList.remove( "bg-[#4A00FF]" ,"text-white");
  openBtn.classList.remove( "bg-[#4A00FF]" ,"text-white");
  closeBtn.classList.remove( "bg-[#4A00FF]" ,"text-white");

  allBtn.classList.add("bg-white", "text-[#64748B]");
  openBtn.classList.add("bg-white", "text-[#64748B]");
  closeBtn.classList.add("bg-white", "text-[#64748B]");

  let selected = document.getElementById(id);
  selected.classList.remove("bg-white", "text-[#64748B]", "border-gray-300");
  selected.classList.add("bg-[#4A00FF]", "text-white");

  if(id === 'open-btn'){
     openIssueList();
  } else if(id === 'all-btn'){
     displayALLIssues(all);
  } else if(id === 'close-btn'){
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
        <div class="p-4 space-y-3 shadow-sm border-t-4 ${border} rounded-md">
          <div class="flex justify-between">
            <img src=${logo} alt="" />
            <p class="text-[#EF4444] ">${issue.priority}</p>
          </div>
          <h3 class="text-black font-semibold">${issue.title}</h3>
          <p class="text-[#64748B] line-clamp-2">${issue.description}</p>
          <div class="flex flex-wrap gap-2 text-[12px]">${lvl}</div>
          <p class="text-[#64748B]">#1by john_doe</p>
          <p class="text-[#64748B]">1/15/2024</p>
        </div>
        `;
    issuesContainer.append(issueDiv);
    totalIssues.innerText = issues.length;
  });
};

const openIssueList = () =>{
    const openIssue = all.filter(item => item.status === 'open');
    displayOpenIssuesList(openIssue);
}

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
        <div class="p-4 space-y-3 shadow-sm border-t-4 ${border} rounded-md">
          <div class="flex justify-between">
            <img src=${logo} alt="" />
            <p class="text-[#EF4444] ">${issue.priority}</p>
          </div>
          <h3 class="text-black font-semibold">${issue.title}</h3>
          <p class="text-[#64748B] line-clamp-2">${issue.description}</p>
          <div class="flex flex-wrap gap-2 text-[12px]">${lvl}</div>
          <p class="text-[#64748B]">#1by john_doe</p>
          <p class="text-[#64748B]">1/15/2024</p>
        </div>
        `;
    issuesContainer.append(issueDiv);
    totalIssues.innerText = issues.length;
  });
};

const closeIssueList = () =>{
    const closeIssue = all.filter(item => item.status === 'closed');
    displayCloseIssuesList(closeIssue);
}

loadData();

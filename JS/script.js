const loadData = () => {
  fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    .then((res) => res.json())
    .then((json) => displayALLIssues(json.data));
};
const totalIssues = document.getElementById("total-issues");

const displayALLIssues = (issues) => {
  const issuesContainer = document.getElementById("issues-container");
  //   issuesContainer.innerHTML = "";
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

loadData();

const loadData = () => {
  fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    .then((res) => res.json())
    .then((json) => displayALLIssues(json.data));
};
const totalIssues = document.getElementById("total-issues");

const displayALLIssues = (issues) => {
  const issuesContainer = document.getElementById("issues-container");
//   issuesContainer.innerHTML = "";
    issues.forEach(issue => {
        const issueDiv = document.createElement('div');
        issueDiv.innerHTML = `
        <div class="p-4 space-y-3 shadow-sm">
          <div class="flex justify-between">
            <img src="assets/Open-Status.png" alt="" />
            <p class="text-[#EF4444] ">${issue.priority}</p>
          </div>
          <h3 class="text-black font-semibold">${issue.title}</h3>
          <p class="text-[#64748B] line-clamp-2">${issue.description}</p>
          <span>ans</span> <span>asdk</span>
          <p class="text-[#64748B]">#1by john_doe</p>
          <p class="text-[#64748B]">1/15/2024</p>
        </div>
        `
        issuesContainer.append(issueDiv);
        totalIssues.innerText = issues.length;
    });
}

loadData();
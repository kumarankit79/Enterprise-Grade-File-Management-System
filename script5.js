let users = {};
let currentUser = "";
let generatedOTP = "";
let uploadedFiles = [];

function showPage(pageId) {
  document.querySelectorAll(".page").forEach(page => page.style.display = "none");
  document.getElementById(pageId).style.display = "flex";
}

function signup() {
  const username = document.getElementById("signupUsername").value.trim();
  const password = document.getElementById("signupPassword").value.trim();
  if (!username || !password) return alert("Please fill all fields");
  if (users[username]) return alert("Username already exists!");

  users[username] = password;
  alert("Sign up successful! Please login.");
  showPage('loginPage');
}

function login() {
  const username = document.getElementById("loginUsername").value.trim();
  const password = document.getElementById("loginPassword").value.trim();
  if (users[username] === password) {
    currentUser = username;
    generatedOTP = Math.floor(1000 + Math.random() * 9000).toString();
    alert("OTP Sent: " + generatedOTP);
    showPage('otpPage');
  } else {
    alert("Invalid credentials!");
  }
}

function verifyOTP() {
  const otp = document.getElementById("otpInput").value.trim();
  if (otp === generatedOTP) {
    showPage('filePage');
  } else {
    alert("Incorrect OTP!");
  }
}

function logout() {
  currentUser = "";
  generatedOTP = "";
  uploadedFiles = [];
  showPage('loginPage');
}

function uploadFile() {
  const input = document.getElementById("fileInput");
  const file = input.files[0];
  if (!file) return alert("No file selected");

  uploadedFiles.push({
    name: file.name,
    size: file.size,
    time: Date.now(),
    file: file
  });

  displayFiles();
}

function displayFiles() {
  const list = document.getElementById("fileList");
  list.innerHTML = "";

  uploadedFiles.forEach((fileObj, index) => {
    const date = new Date(fileObj.time).toLocaleString();
    let li = document.createElement("li");
    li.innerHTML = `
      <b>${fileObj.name}</b><br>
      Size: ${(fileObj.size / 1024).toFixed(2)} KB | Uploaded: ${date}<br>
      <button onclick="viewFile(${index})">View</button>
      <button onclick="downloadFile(${index})">Download</button>
      <button onclick="deleteFile(${index})">Delete</button>
    `;
    list.appendChild(li);
  });
}

function viewFile(index) {
  const fileObj = uploadedFiles[index];
  const reader = new FileReader();
  reader.onload = function(e) {
    const url = URL.createObjectURL(fileObj.file);
    window.open(url, "_blank");
  };
  reader.readAsArrayBuffer(fileObj.file);
}

function downloadFile(index) {
  const fileObj = uploadedFiles[index];
  const link = document.createElement('a');
  link.href = URL.createObjectURL(fileObj.file);
  link.download = fileObj.name;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function deleteFile(index) {
  uploadedFiles.splice(index, 1);
  displayFiles();
}

function runScheduling(type) {
  let files = [...uploadedFiles];
  let explanation = "";
  let output = "";

  if (type === "fcfs") {
    files.sort((a, b) => a.time - b.time);
    explanation = `FCFS (First Come First Serve):\n- Files are processed based on who uploaded first.\n- No preemption.`;
    output = files.map(f => f.name).join(" -> ");
  } 
  
  else if (type === "sjf") {
    files.sort((a, b) => a.size - b.size);
    explanation = `SJF (Shortest Job First):\n- File with the smallest size is processed first.\n- Reduces waiting time.`;
    output = files.map(f => f.name).join(" -> ");
  } 
  
  else if (type === "priority") {
    files.sort((a, b) => b.size - a.size);
    explanation = `Priority Scheduling:\n- Larger files are considered higher priority.\n- Process larger files first.`;
    output = files.map(f => f.name).join(" -> ");
  } 
  
  else if (type === "rr") {
    explanation = `Round Robin Scheduling:\n- Each file gets fixed time quantum of 100KB.\n- Rotate files until all finished.`;
    const quantum = 100 * 1024; // 100 KB quantum
    let queue = files.map(file => ({
      ...file,
      remaining: file.size
    }));
    let timeline = [];

    while (queue.length > 0) {
      for (let i = 0; i < queue.length; i++) {
        timeline.push(queue[i].name);
        queue[i].remaining -= quantum;
        if (queue[i].remaining <= 0) {
          queue.splice(i, 1);
          i--;
        }
      }
    }
    output = timeline.join(" -> ");
  }

  document.getElementById("scheduleExplanation").innerText = explanation;
  document.getElementById("scheduleOutput").innerText = "Scheduled Order:\n" + output;
}

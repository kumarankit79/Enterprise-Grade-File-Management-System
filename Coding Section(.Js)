// Hardcoded User Data (For Testing)
const users = {
    "admin1": { password: "Admin@123", role: "Admin" },
    "editor1": { password: "Editor@123", role: "Editor" },
    "viewer1": { password: "Viewer@123", role: "Viewer" }
};

let loggedInUser = null;

// Login Function
document.getElementById("loginBtn").addEventListener("click", () => {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    if (users[username] && users[username].password === password) {
        loggedInUser = { username, role: users[username].role };
        sendOTP();
    } else {
        document.getElementById("error-msg").innerText = "Invalid Username or Password!";
    }
});

// Simulate OTP
function sendOTP() {
    alert("OTP sent: 123456");  // Simulating OTP for demo
    document.getElementById("auth").style.display = "none";
    document.getElementById("verify-otp").style.display = "block";
}

// Verify OTP
document.getElementById("verifyBtn").addEventListener("click", () => {
    let otp = document.getElementById("otp").value;
    if (otp === "123456") {
        document.getElementById("verify-otp").style.display = "none";
        document.getElementById("fileOperations").style.display = "block";
        alert(`Welcome, ${loggedInUser.username} (${loggedInUser.role})`);
    } else {
        document.getElementById("otp-error").innerText = "Invalid OTP!";
    }
});

// File Upload
document.getElementById("uploadBtn").addEventListener("click", () => {
    if (loggedInUser.role === "Viewer") {
        alert("You don't have permission to upload files.");
        return;
    }
    let file = document.getElementById("fileInput").files[0];
    if (file) {
        alert("File Uploaded Successfully!");
    } else {
        alert("Please select a file.");
    }
});

// File Download
document.getElementById("downloadBtn").addEventListener("click", () => {
    alert("Downloading File... (Simulation)");
});

// Logout Function
document.getElementById("logoutBtn").addEventListener("click", () => {
    loggedInUser = null;
    document.getElementById("fileOperations").style.display = "none";
    document.getElementById("auth").style.display = "block";
});

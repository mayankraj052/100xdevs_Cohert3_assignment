// Sign-Up Script
document
  .getElementById("signup-form")
  ?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      alert(data.message);
      if (response.ok) window.location.href = "/login.html";
    } catch (error) {
      alert("An error occurred");
    }
  });

// Log-In Script
document.getElementById("login-form")?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const response = await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (response.ok) {
      localStorage.setItem("token", data.token);
      window.location.href = "/todo.html";
    } else {
      alert(data.message);
    }
  } catch (error) {
    alert("An error occurred");
  }
});

// To-Do Script
document.getElementById("todo-form")?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const task = document.getElementById("new-task").value;
  const token = localStorage.getItem("token");

  try {
    const response = await fetch("/api/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, task }),
    });

    const data = await response.json();
    if (response.ok) {
      document.getElementById("new-task").value = "";
      loadTasks();
    } else {
      alert(data.message);
    }
  } catch (error) {
    alert("An error occurred");
  }
});

async function loadTasks() {
  const token = localStorage.getItem("token");
  try {
    const response = await fetch("/api/todos", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });

    const tasks = await response.json();
    const taskList = document.getElementById("task-list");
    taskList.innerHTML = "";

    tasks.forEach((task) => {
      const li = document.createElement("li");
      li.innerHTML = `
        <span>${task.task}</span>
        <button onclick="deleteTask('${task._id}')">Delete</button>
      `;
      taskList.appendChild(li);
    });
  } catch (error) {
    alert("An error occurred");
  }
}

async function deleteTask(taskId) {
  const token = localStorage.getItem("token");
  if (!token) {
    alert("No token found. Please log in again.");
    return;
  }

  try {
    const response = await fetch("/api/todos", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token, taskId }),
    });

    const data = await response.json();
    if (response.ok) {
      loadTasks(); // Reload tasks to reflect deletion
    } else {
      alert(data.message);
    }
  } catch (error) {
    alert("An error occurred");
  }
}

// Logout Script
document.getElementById("logout")?.addEventListener("click", () => {
  localStorage.removeItem("token");
  window.location.href = "/login.html";
});

// Load tasks on page load
if (document.getElementById("task-list")) {
  loadTasks();
}

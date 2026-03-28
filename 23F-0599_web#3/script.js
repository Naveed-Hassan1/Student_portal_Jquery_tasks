const BuiltInModule = (() => {
  const studentName = "Muhammad Ahsan";
  const skills = ["JavaScript", "HTML", "CSS", "Bootstrap", "jQuery"];

  function runBuiltInDemo() {
    const nameOutput = document.getElementById("nameOutput");
    const skillsOutput = document.getElementById("skillsOutput");
    const dateOutput = document.getElementById("dateOutput");

    if (!nameOutput || !skillsOutput || !dateOutput) {
      return;
    }

    const upper = studentName.toUpperCase();
    const lower = studentName.toLowerCase();
    nameOutput.textContent = `Name: ${studentName} | Uppercase: ${upper} | Lowercase: ${lower}`;

    const initialTotal = skills.length;
    skills.push("Problem Solving");
    const addedSkill = skills[skills.length - 1];
    const removedSkill = skills.pop();
    skillsOutput.textContent = `Skills total: ${initialTotal} | Added: ${addedSkill} | Removed: ${removedSkill} | Current list: ${skills.join(", ")}`;

    const now = new Date();
    dateOutput.textContent = `Current date and time: ${now.toLocaleString()}`;
  }

  function processNumber() {
    const numberInput = document.getElementById("numberInput");
    const output = document.getElementById("numberOutput");

    if (!numberInput || !output) {
      return;
    }

    const value = Number(numberInput.value);
    if (Number.isNaN(value)) {
      output.textContent = "Please enter a valid number.";
      return;
    }

    const rounded = Math.round(value);
    const squareRoot =
      value >= 0 ? Math.sqrt(value).toFixed(3) : "Not a real number";
    const randomNum = Math.floor(Math.random() * 100) + 1;

    output.textContent = `Rounded: ${rounded} | Square root: ${squareRoot} | Random (1-100): ${randomNum}`;
  }

  return {
    runBuiltInDemo,
    processNumber,
  };
})();

function renderActivities() {
  const events = [
    {
      name: "Coding Competition",
      description: "Solve algorithmic and logical challenges in teams.",
    },
    {
      name: "Gaming Tournament",
      description: "Compete in popular multiplayer games and win prizes.",
    },
    {
      name: "Web Development Workshop",
      description: "Learn frontend and backend fundamentals from mentors.",
    },
  ];

  const container = document.getElementById("activityContainer");
  const countBadge = document.querySelector(".activity-count");

  if (!container || !countBadge) {
    return;
  }

  events.forEach((eventItem) => {
    const col = document.createElement("div");
    col.className = "col-md-6 col-lg-4 activity-item";

    const card = document.createElement("article");
    card.className = "card h-100 activity-card";

    const cardBody = document.createElement("div");
    cardBody.className = "card-body d-flex flex-column";

    const title = document.createElement("h3");
    title.className = "h5 card-title";
    title.textContent = eventItem.name;

    const desc = document.createElement("p");
    desc.className = "card-text";
    desc.textContent = eventItem.description;

    const status = document.createElement("p");
    status.className = "small text-success fw-semibold mt-auto mb-2";

    const joinBtn = document.createElement("button");
    joinBtn.type = "button";
    joinBtn.className = "btn btn-primary btn-sm mb-2";
    joinBtn.textContent = "Join Event";

    joinBtn.addEventListener("click", () => {
      card.classList.add("registered");
      status.textContent = "Successfully Registered!";
    });

    const detailsBtn = document.createElement("button");
    detailsBtn.type = "button";
    detailsBtn.className = "btn btn-outline-dark btn-sm mb-2 view-details-btn";
    detailsBtn.textContent = "View Details";
    detailsBtn.setAttribute("data-bs-toggle", "modal");
    detailsBtn.setAttribute("data-bs-target", "#detailsModal");
    detailsBtn.setAttribute("data-event-name", eventItem.name);
    detailsBtn.setAttribute("data-event-desc", eventItem.description);

    const jqueryBtn = document.createElement("button");
    jqueryBtn.type = "button";
    jqueryBtn.className = "btn btn-warning btn-sm jquery-highlight-btn";
    jqueryBtn.textContent = "jQuery Highlight";

    cardBody.appendChild(title);
    cardBody.appendChild(desc);
    cardBody.appendChild(status);
    cardBody.appendChild(joinBtn);
    cardBody.appendChild(detailsBtn);
    cardBody.appendChild(jqueryBtn);
    card.appendChild(cardBody);
    col.appendChild(card);
    container.appendChild(col);
  });

  countBadge.textContent = `${events.length} cards`;

  container.addEventListener("click", (event) => {
    const detailsButton = event.target.closest(".view-details-btn");
    if (!detailsButton) {
      return;
    }

    const modalTitle = document.getElementById("detailsModalLabel");
    const modalBody = document.getElementById("detailsModalBody");

    if (!modalTitle || !modalBody) {
      return;
    }

    modalTitle.textContent =
      detailsButton.getAttribute("data-event-name") || "Activity Details";
    modalBody.textContent =
      detailsButton.getAttribute("data-event-desc") || "No details available.";
  });
}

function setupFormValidation() {
  const form = document.getElementById("registrationForm");
  const alertPlaceholder = document.getElementById("alertPlaceholder");

  if (!form || !alertPlaceholder) {
    return;
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const roll = document.getElementById("roll").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    const errors = {
      name: "",
      email: "",
      roll: "",
      password: "",
      confirmPassword: "",
    };

    if (!name) {
      errors.name = "Name cannot be empty.";
    }

    if (!email.includes("@")) {
      errors.email = "Email must contain @.";
    }

    if (!roll) {
      errors.roll = "Roll Number cannot be empty.";
    }

    if (password.length < 6) {
      errors.password = "Password must be at least 6 characters.";
    }

    if (password !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match.";
    }

    document.getElementById("nameError").textContent = errors.name;
    document.getElementById("emailError").textContent = errors.email;
    document.getElementById("rollError").textContent = errors.roll;
    document.getElementById("passwordError").textContent = errors.password;
    document.getElementById("confirmPasswordError").textContent =
      errors.confirmPassword;

    const hasErrors = Object.values(errors).some((msg) => msg.length > 0);
    alertPlaceholder.innerHTML = "";

    if (!hasErrors) {
      const alert = document.createElement("div");
      alert.className = "alert alert-success alert-dismissible fade show";
      alert.role = "alert";
      alert.innerHTML =
        'Form submitted successfully.<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>';
      alertPlaceholder.appendChild(alert);
      form.reset();
    }
  });
}

function setupJQueryInteractions() {
  if (!window.jQuery) {
    return;
  }

  const cardsSelector = ".activity-item";

  jQuery("#hideCardsBtn").on("click", () => jQuery(cardsSelector).hide());
  jQuery("#showCardsBtn").on("click", () => jQuery(cardsSelector).show());
  jQuery("#toggleCardsBtn").on("click", () => jQuery(cardsSelector).toggle());

  jQuery("#fadeOutCardsBtn").on("click", () => jQuery(cardsSelector).fadeOut());
  jQuery("#fadeInCardsBtn").on("click", () => jQuery(cardsSelector).fadeIn());
  jQuery("#slideToggleCardsBtn").on("click", () =>
    jQuery(cardsSelector).slideToggle(),
  );

  jQuery(document).on("click", ".jquery-highlight-btn", function () {
    const card = jQuery(this).closest(".activity-card");
    const currentFont = parseFloat(card.css("font-size"));
    card.css({
      "background-color": "#fff3cd",
      "font-size": `${currentFont + 1}px`,
    });
  });
}

async function loadStudents() {
  const tableBody = document.getElementById("studentsTableBody");
  if (!tableBody) {
    return;
  }

  try {
    const response = await fetch("data/students.json");
    if (!response.ok) {
      throw new Error("Failed to fetch student records.");
    }

    const data = await response.json();
    tableBody.innerHTML = "";

    data.forEach((student) => {
      const row = document.createElement("tr");
      row.innerHTML = `<td>${student.name}</td><td>${student.roll}</td><td>${student.department}</td>`;
      tableBody.appendChild(row);
    });
  } catch (error) {
    tableBody.innerHTML = `<tr><td colspan=\"3\" class=\"text-danger\">${error.message}</td></tr>`;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  BuiltInModule.runBuiltInDemo();
  renderActivities();
  setupFormValidation();
  setupJQueryInteractions();

  const processButton = document.getElementById("processNumberBtn");
  if (processButton) {
    processButton.addEventListener("click", BuiltInModule.processNumber);
  }

  const loadStudentsBtn = document.getElementById("loadStudentsBtn");
  if (loadStudentsBtn) {
    loadStudentsBtn.addEventListener("click", loadStudents);
  }
});

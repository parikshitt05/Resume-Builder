console.log("🚀 App.js loaded");

// ============================================
// DATA MODEL
// ============================================
let resumeData = {
  personalInfo: {
    fullName: "",
    email: "",
    phone: "",
    location: "",
    linkedin: "",
    github: "",
  },
  summary: "",
  education: [],
  experiences: [],
  projects: [], // NEW
  leadership: [],
  skills: [],
  languages: [],
  interests: [],
};

// ============================================
// DOM ELEMENTS
// ============================================
const $ = (id) => document.getElementById(id);

const elements = {
  fullName: $("fullName"),
  email: $("email"),
  phone: $("phone"),
  location: $("location"),
  linkedin: $("linkedin"),
  github: $("github"),
  summary: $("summary"),
  summaryCount: $("summary-count"),
  skillInput: $("skill-input"),
  languageInput: $("language-input"),
  interestInput: $("interest-input"),
  addSkillBtn: $("add-skill-btn"),
  addLanguageBtn: $("add-language-btn"),
  addInterestBtn: $("add-interest-btn"),
  educationContainer: $("education-container"),
  experienceContainer: $("experience-container"),
  projectsContainer: $("projects-container"), // NEW
  leadershipContainer: $("leadership-container"),
  skillsContainer: $("skills-container"),
  languagesContainer: $("languages-container"),
  interestsContainer: $("interests-container"),
  previewContent: $("preview-content"),
  addEducation: $("add-education"),
  addExperience: $("add-experience"),
  addProject: $("add-project"), // NEW
  addLeadership: $("add-leadership"),
  exportPdf: $("export-pdf"),
  exportJson: $("export-json"),
  importJson: $("import-json"),
  clearData: $("clear-data"),
  toast: $("toast"),
};

// ============================================
// UTILITY FUNCTIONS
// ============================================

function showToast(message, duration = 3000) {
  const toast = elements.toast;
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), duration);
}

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

function debounce(func, wait) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

// ============================================
// LOCAL STORAGE
// ============================================

function saveToLocalStorage() {
  try {
    localStorage.setItem("resumeData", JSON.stringify(resumeData));
  } catch (error) {
    console.error("Error saving to localStorage:", error);
  }
}

const debouncedSave = debounce(saveToLocalStorage, 500);

function loadFromLocalStorage() {
  try {
    const saved = localStorage.getItem("resumeData");
    if (saved) {
      const loadedData = JSON.parse(saved);

      resumeData = {
        personalInfo: {
          fullName: "",
          email: "",
          phone: "",
          location: "",
          linkedin: "",
          github: "",
          ...loadedData.personalInfo,
        },
        summary: loadedData.summary || "",
        education: Array.isArray(loadedData.education)
          ? loadedData.education
          : [],
        experiences: Array.isArray(loadedData.experiences)
          ? loadedData.experiences
          : [],
        projects: Array.isArray(loadedData.projects) ? loadedData.projects : [],
        leadership: Array.isArray(loadedData.leadership)
          ? loadedData.leadership
          : [],
        skills: Array.isArray(loadedData.skills) ? loadedData.skills : [],
        languages: Array.isArray(loadedData.languages)
          ? loadedData.languages
          : [],
        interests: Array.isArray(loadedData.interests)
          ? loadedData.interests
          : [],
      };

      populateForm();
      showToast("Previous data loaded");
    }
  } catch (error) {
    console.error("Error loading from localStorage:", error);
    localStorage.removeItem("resumeData");
  }
  updatePreview();
}

// ============================================
// FORM POPULATION
// ============================================

function populateForm() {
  if (elements.fullName)
    elements.fullName.value = resumeData.personalInfo.fullName || "";
  if (elements.email)
    elements.email.value = resumeData.personalInfo.email || "";
  if (elements.phone)
    elements.phone.value = resumeData.personalInfo.phone || "";
  if (elements.location)
    elements.location.value = resumeData.personalInfo.location || "";
  if (elements.linkedin)
    elements.linkedin.value = resumeData.personalInfo.linkedin || "";
  if (elements.github)
    elements.github.value = resumeData.personalInfo.github || "";
  if (elements.summary) elements.summary.value = resumeData.summary || "";
  updateCharacterCount();

  resumeData.education.forEach((edu) => addEducationEntry(edu));
  resumeData.experiences.forEach((exp) => addExperienceEntry(exp));
  resumeData.projects.forEach((proj) => addProjectEntry(proj));
  resumeData.leadership.forEach((lead) => addLeadershipEntry(lead));
  resumeData.skills.forEach((skill) => addTag(skill, "skills"));
  resumeData.languages.forEach((lang) => addTag(lang, "languages"));
  resumeData.interests.forEach((interest) => addTag(interest, "interests"));
}

function updateCharacterCount() {
  if (elements.summary && elements.summaryCount) {
    elements.summaryCount.textContent = elements.summary.value.length;
  }
}

// ============================================
// EDUCATION MANAGEMENT
// ============================================

function addEducationEntry(data = {}) {
  const id = data.id || generateId();
  const container = elements.educationContainer;
  if (!container) return;

  const emptyState = container.querySelector("p");
  if (emptyState) emptyState.remove();

  const entry = document.createElement("div");
  entry.className = "entry-item draggable";
  entry.dataset.id = id;
  entry.draggable = true;
  entry.innerHTML = `
        <div class="flex justify-between mb-2">
            <span class="text-sm text-gray-600 cursor-move">☰ Drag to reorder</span>
            <button type="button" class="text-red-600 text-sm hover:text-red-800 remove-btn">Remove</button>
        </div>
        <input type="text" placeholder="University Name" class="w-full p-2 border rounded mb-2 edu-school" value="${
          data.school || ""
        }">
        <input type="text" placeholder="Degree & Major" class="w-full p-2 border rounded mb-2 edu-degree" value="${
          data.degree || ""
        }">
        <div class="grid grid-cols-2 gap-2 mb-2">
            <input type="text" placeholder="Location" class="p-2 border rounded edu-location" value="${
              data.location || ""
            }">
            <input type="text" placeholder="Graduation Date" class="p-2 border rounded edu-date" value="${
              data.date || ""
            }">
        </div>
        <input type="text" placeholder="GPA (optional)" class="w-full p-2 border rounded mb-2 edu-gpa" value="${
          data.gpa || ""
        }">
        <textarea placeholder="Achievements, awards, relevant coursework (one per line)" rows="3" class="w-full p-2 border rounded resize-none edu-details">${
          data.details || ""
        }</textarea>
    `;

  container.appendChild(entry);

  entry.querySelector(".remove-btn").addEventListener("click", () => {
    resumeData.education = resumeData.education.filter((e) => e.id !== id);
    entry.remove();
    if (resumeData.education.length === 0) {
      container.innerHTML =
        '<p class="text-gray-400 text-sm text-center py-4">No education added yet</p>';
    }
    updatePreview();
    saveToLocalStorage();
  });

  const inputs = {
    school: entry.querySelector(".edu-school"),
    degree: entry.querySelector(".edu-degree"),
    location: entry.querySelector(".edu-location"),
    date: entry.querySelector(".edu-date"),
    gpa: entry.querySelector(".edu-gpa"),
    details: entry.querySelector(".edu-details"),
  };

  Object.keys(inputs).forEach((key) => {
    inputs[key].addEventListener("input", (e) => {
      const index = resumeData.education.findIndex((edu) => edu.id === id);
      if (index !== -1) {
        resumeData.education[index][key] = e.target.value;
      } else {
        const newEdu = { id };
        newEdu[key] = e.target.value;
        resumeData.education.push(newEdu);
      }
      updatePreview();
      debouncedSave();
    });
  });

  setupDragAndDrop(entry, "education");

  if (!data.id) {
    resumeData.education.push({
      id,
      school: "",
      degree: "",
      location: "",
      date: "",
      gpa: "",
      details: "",
    });
  }

  updatePreview();
}

// ============================================
// EXPERIENCE MANAGEMENT
// ============================================

function addExperienceEntry(data = {}) {
  const id = data.id || generateId();
  const container = elements.experienceContainer;
  if (!container) return;

  const emptyState = container.querySelector("p");
  if (emptyState) emptyState.remove();

  const entry = document.createElement("div");
  entry.className = "entry-item draggable";
  entry.dataset.id = id;
  entry.draggable = true;
  entry.innerHTML = `
        <div class="flex justify-between mb-2">
            <span class="text-sm text-gray-600 cursor-move">☰ Drag to reorder</span>
            <button type="button" class="text-red-600 text-sm hover:text-red-800 remove-btn">Remove</button>
        </div>
        <input type="text" placeholder="Company Name" class="w-full p-2 border rounded mb-2 exp-company" value="${
          data.company || ""
        }">
        <input type="text" placeholder="Job Title" class="w-full p-2 border rounded mb-2 exp-title" value="${
          data.title || ""
        }">
        <div class="grid grid-cols-2 gap-2 mb-2">
            <input type="text" placeholder="Location" class="p-2 border rounded exp-location" value="${
              data.location || ""
            }">
            <input type="text" placeholder="Dates (e.g., Jun. 2021 - Present)" class="p-2 border rounded exp-dates" value="${
              data.dates || ""
            }">
        </div>
        <textarea placeholder="Responsibilities and achievements (one bullet per line)" rows="4" class="w-full p-2 border rounded resize-none exp-desc">${
          data.description || ""
        }</textarea>
    `;

  container.appendChild(entry);

  entry.querySelector(".remove-btn").addEventListener("click", () => {
    resumeData.experiences = resumeData.experiences.filter((e) => e.id !== id);
    entry.remove();
    if (resumeData.experiences.length === 0) {
      container.innerHTML =
        '<p class="text-gray-400 text-sm text-center py-4">No experience added yet</p>';
    }
    updatePreview();
    saveToLocalStorage();
  });

  const inputs = {
    company: entry.querySelector(".exp-company"),
    title: entry.querySelector(".exp-title"),
    location: entry.querySelector(".exp-location"),
    dates: entry.querySelector(".exp-dates"),
    description: entry.querySelector(".exp-desc"),
  };

  Object.keys(inputs).forEach((key) => {
    inputs[key].addEventListener("input", (e) => {
      const index = resumeData.experiences.findIndex((exp) => exp.id === id);
      if (index !== -1) {
        resumeData.experiences[index][key] = e.target.value;
      } else {
        const newExp = { id };
        newExp[key] = e.target.value;
        resumeData.experiences.push(newExp);
      }
      updatePreview();
      debouncedSave();
    });
  });

  setupDragAndDrop(entry, "experiences");

  if (!data.id) {
    resumeData.experiences.push({
      id,
      company: "",
      title: "",
      location: "",
      dates: "",
      description: "",
    });
  }

  updatePreview();
}

// ============================================
// PROJECTS MANAGEMENT (NEW)
// ============================================

function addProjectEntry(data = {}) {
  const id = data.id || generateId();
  const container = elements.projectsContainer;
  if (!container) return;

  const emptyState = container.querySelector("p");
  if (emptyState) emptyState.remove();

  const entry = document.createElement("div");
  entry.className = "entry-item draggable";
  entry.dataset.id = id;
  entry.draggable = true;
  entry.innerHTML = `
        <div class="flex justify-between mb-2">
            <span class="text-sm text-gray-600 cursor-move">☰ Drag to reorder</span>
            <button type="button" class="text-red-600 text-sm hover:text-red-800 remove-btn">Remove</button>
        </div>
        <input type="text" placeholder="Project Name" class="w-full p-2 border rounded mb-2 proj-name" value="${
          data.name || ""
        }">
        <input type="text" placeholder="Technologies Used (e.g., React, Node.js)" class="w-full p-2 border rounded mb-2 proj-tech" value="${
          data.technologies || ""
        }">
        <div class="grid grid-cols-2 gap-2 mb-2">
            <input type="url" placeholder="Project Link/GitHub (optional)" class="p-2 border rounded proj-link" value="${
              data.link || ""
            }">
            <input type="text" placeholder="Date" class="p-2 border rounded proj-date" value="${
              data.date || ""
            }">
        </div>
        <textarea placeholder="Project description and key features (one per line)" rows="3" class="w-full p-2 border rounded resize-none proj-desc">${
          data.description || ""
        }</textarea>
    `;

  container.appendChild(entry);

  entry.querySelector(".remove-btn").addEventListener("click", () => {
    resumeData.projects = resumeData.projects.filter((e) => e.id !== id);
    entry.remove();
    if (resumeData.projects.length === 0) {
      container.innerHTML =
        '<p class="text-gray-400 text-sm text-center py-4">No projects added yet</p>';
    }
    updatePreview();
    saveToLocalStorage();
  });

  const inputs = {
    name: entry.querySelector(".proj-name"),
    technologies: entry.querySelector(".proj-tech"),
    link: entry.querySelector(".proj-link"),
    date: entry.querySelector(".proj-date"),
    description: entry.querySelector(".proj-desc"),
  };

  Object.keys(inputs).forEach((key) => {
    inputs[key].addEventListener("input", (e) => {
      const index = resumeData.projects.findIndex((proj) => proj.id === id);
      if (index !== -1) {
        resumeData.projects[index][key] = e.target.value;
      } else {
        const newProj = { id };
        newProj[key] = e.target.value;
        resumeData.projects.push(newProj);
      }
      updatePreview();
      debouncedSave();
    });
  });

  setupDragAndDrop(entry, "projects");

  if (!data.id) {
    resumeData.projects.push({
      id,
      name: "",
      technologies: "",
      link: "",
      date: "",
      description: "",
    });
  }

  updatePreview();
}

// ============================================
// LEADERSHIP MANAGEMENT
// ============================================

function addLeadershipEntry(data = {}) {
  const id = data.id || generateId();
  const container = elements.leadershipContainer;
  if (!container) return;

  const emptyState = container.querySelector("p");
  if (emptyState) emptyState.remove();

  const entry = document.createElement("div");
  entry.className = "entry-item draggable";
  entry.dataset.id = id;
  entry.draggable = true;
  entry.innerHTML = `
        <div class="flex justify-between mb-2">
            <span class="text-sm text-gray-600 cursor-move">☰ Drag to reorder</span>
            <button type="button" class="text-red-600 text-sm hover:text-red-800 remove-btn">Remove</button>
        </div>
        <input type="text" placeholder="Organization Name" class="w-full p-2 border rounded mb-2 lead-org" value="${
          data.organization || ""
        }">
        <input type="text" placeholder="Role/Position" class="w-full p-2 border rounded mb-2 lead-role" value="${
          data.role || ""
        }">
        <div class="grid grid-cols-2 gap-2 mb-2">
            <input type="text" placeholder="Location (optional)" class="p-2 border rounded lead-location" value="${
              data.location || ""
            }">
            <input type="text" placeholder="Dates" class="p-2 border rounded lead-dates" value="${
              data.dates || ""
            }">
        </div>
        <textarea placeholder="Activities and achievements (one per line)" rows="3" class="w-full p-2 border rounded resize-none lead-desc">${
          data.description || ""
        }</textarea>
    `;

  container.appendChild(entry);

  entry.querySelector(".remove-btn").addEventListener("click", () => {
    resumeData.leadership = resumeData.leadership.filter((e) => e.id !== id);
    entry.remove();
    if (resumeData.leadership.length === 0) {
      container.innerHTML =
        '<p class="text-gray-400 text-sm text-center py-4">No leadership activities added yet</p>';
    }
    updatePreview();
    saveToLocalStorage();
  });

  const inputs = {
    organization: entry.querySelector(".lead-org"),
    role: entry.querySelector(".lead-role"),
    location: entry.querySelector(".lead-location"),
    dates: entry.querySelector(".lead-dates"),
    description: entry.querySelector(".lead-desc"),
  };

  Object.keys(inputs).forEach((key) => {
    inputs[key].addEventListener("input", (e) => {
      const index = resumeData.leadership.findIndex((lead) => lead.id === id);
      if (index !== -1) {
        resumeData.leadership[index][key] = e.target.value;
      } else {
        const newLead = { id };
        newLead[key] = e.target.value;
        resumeData.leadership.push(newLead);
      }
      updatePreview();
      debouncedSave();
    });
  });

  setupDragAndDrop(entry, "leadership");

  if (!data.id) {
    resumeData.leadership.push({
      id,
      organization: "",
      role: "",
      location: "",
      dates: "",
      description: "",
    });
  }

  updatePreview();
}

// ============================================
// TAG MANAGEMENT (Skills/Languages/Interests)
// ============================================

function addTag(text, type) {
  if (!text || text.trim() === "") return;

  const item = text.trim();
  const arrayName = type;
  const containerName = `${type}Container`;
  const className =
    type === "skills"
      ? "skill-tag"
      : type === "languages"
      ? "language-tag"
      : "interest-tag";

  if (resumeData[arrayName].includes(item)) {
    showToast(`${type.slice(0, -1)} already added`);
    return;
  }

  resumeData[arrayName].push(item);

  const tag = document.createElement("span");
  tag.className = className;
  tag.innerHTML = `
        ${item}
        <button type="button" class="text-lg leading-none hover:text-blue-900">&times;</button>
    `;

  tag.querySelector("button").addEventListener("click", () => {
    resumeData[arrayName] = resumeData[arrayName].filter((s) => s !== item);
    tag.remove();
    updatePreview();
    saveToLocalStorage();
  });

  elements[containerName].appendChild(tag);
  updatePreview();
  debouncedSave();
}

// ============================================
// DRAG AND DROP
// ============================================

let draggedElement = null;
let draggedType = null;

function setupDragAndDrop(element, type) {
  element.addEventListener("dragstart", (e) => {
    draggedElement = element;
    draggedType = type;
    element.classList.add("dragging");
    e.dataTransfer.effectAllowed = "move";
  });

  element.addEventListener("dragend", () => {
    element.classList.remove("dragging");
    updateArrayOrder(draggedType);
    draggedElement = null;
    draggedType = null;
  });

  element.addEventListener("dragover", (e) => {
    e.preventDefault();
    if (!draggedElement || draggedType !== type) return;

    const bounding = element.getBoundingClientRect();
    const offset = bounding.y + bounding.height / 2;

    if (e.clientY - offset > 0) {
      element.parentNode.insertBefore(draggedElement, element.nextSibling);
    } else {
      element.parentNode.insertBefore(draggedElement, element);
    }
  });
}

function updateArrayOrder(type) {
  let container, arrayName;

  if (type === "education") {
    container = elements.educationContainer;
    arrayName = "education";
  } else if (type === "experiences") {
    container = elements.experienceContainer;
    arrayName = "experiences";
  } else if (type === "projects") {
    container = elements.projectsContainer;
    arrayName = "projects";
  } else if (type === "leadership") {
    container = elements.leadershipContainer;
    arrayName = "leadership";
  }

  const items = Array.from(container.querySelectorAll(".draggable"));
  const ids = items.map((item) => item.dataset.id);

  resumeData[arrayName].sort((a, b) => ids.indexOf(a.id) - ids.indexOf(b.id));

  updatePreview();
  saveToLocalStorage();
}

// ============================================
// PREVIEW GENERATION
// ============================================

function updatePreview() {
  if (!elements.previewContent) return;

  // Ensure all arrays exist
  const { personalInfo = {} } = resumeData;
  const summary = resumeData.summary || "";
  const education = resumeData.education || [];
  const experiences = resumeData.experiences || [];
  const projects = resumeData.projects || [];
  const leadership = resumeData.leadership || [];
  const skills = resumeData.skills || [];
  const languages = resumeData.languages || [];
  const interests = resumeData.interests || [];

  let html = '<div class="max-w-3xl mx-auto">';

  // Header with LinkedIn and GitHub
  const contactLinks = [];
  if (personalInfo.linkedin) contactLinks.push(personalInfo.linkedin);
  if (personalInfo.github) contactLinks.push(personalInfo.github);

  html += `
        <div class="text-center border-b border-black pb-2 mb-3">
            <h1 class="text-2xl font-bold mb-1">${
              personalInfo.fullName || "John Doe"
            }</h1>
            <p class="text-xs">
                ${personalInfo.location || "City, State"} • 
                ${personalInfo.email || "email@example.com"} • 
                ${personalInfo.phone || "Phone Number"}
                ${
                  contactLinks.length > 0
                    ? " • " + contactLinks.join(" • ")
                    : ""
                }
            </p>
        </div>
    `;

  // Education
  if (education.length > 0) {
    html += '<div class="mb-3"><h2 class="resume-section-title">EDUCATION</h2>';
    education.forEach((edu) => {
      if (edu && (edu.school || edu.degree)) {
        html += `
                    <div class="mb-2">
                        <div class="flex justify-between items-baseline">
                            <div>
                                <strong class="text-sm">${
                                  edu.school || "University Name"
                                }</strong>
                            </div>
                            <div class="text-xs text-right">
                                ${edu.location || ""} ${
          edu.location && edu.date ? " • " : ""
        } ${edu.date || ""}
                            </div>
                        </div>
                        <div class="text-xs italic">${
                          edu.degree || "Degree and Major"
                        }</div>
                        ${
                          edu.gpa
                            ? `<div class="text-xs">Cumulative GPA: ${edu.gpa}</div>`
                            : ""
                        }
                        ${
                          edu.details
                            ? `<div class="text-xs mt-1">${edu.details
                                .split("\n")
                                .filter((line) => line.trim())
                                .map((line) => `<div>• ${line.trim()}</div>`)
                                .join("")}</div>`
                            : ""
                        }
                    </div>
                `;
      }
    });
    html += "</div>";
  }

  // Work Experience
  if (experiences.length > 0) {
    html +=
      '<div class="mb-3"><h2 class="resume-section-title">WORK EXPERIENCE</h2>';
    experiences.forEach((exp) => {
      if (exp && (exp.company || exp.title)) {
        html += `
                    <div class="mb-2">
                        <div class="flex justify-between items-baseline">
                            <strong class="text-sm">${
                              exp.company || "Company Name"
                            }</strong>
                            <span class="text-xs">${exp.location || ""}</span>
                        </div>
                        <div class="flex justify-between items-baseline">
                            <em class="text-xs">${exp.title || "Job Title"}</em>
                            <span class="text-xs">${exp.dates || ""}</span>
                        </div>
                        ${
                          exp.description
                            ? `<div class="text-xs mt-1">${exp.description
                                .split("\n")
                                .filter((line) => line.trim())
                                .map((line) => `<div>• ${line.trim()}</div>`)
                                .join("")}</div>`
                            : ""
                        }
                    </div>
                `;
      }
    });
    html += "</div>";
  }

  // Projects (NEW)
  if (projects.length > 0) {
    html += '<div class="mb-3"><h2 class="resume-section-title">PROJECTS</h2>';
    projects.forEach((proj) => {
      if (proj && (proj.name || proj.technologies)) {
        html += `
                    <div class="mb-2">
                        <div class="flex justify-between items-baseline">
                            <strong class="text-sm">${
                              proj.name || "Project Name"
                            }</strong>
                            <span class="text-xs">${proj.date || ""}</span>
                        </div>
                        ${
                          proj.technologies
                            ? `<div class="text-xs italic">${proj.technologies}</div>`
                            : ""
                        }
                        ${
                          proj.link
                            ? `<div class="text-xs text-blue-600">${proj.link}</div>`
                            : ""
                        }
                        ${
                          proj.description
                            ? `<div class="text-xs mt-1">${proj.description
                                .split("\n")
                                .filter((line) => line.trim())
                                .map((line) => `<div>• ${line.trim()}</div>`)
                                .join("")}</div>`
                            : ""
                        }
                    </div>
                `;
      }
    });
    html += "</div>";
  }

  // Leadership & Community
  if (leadership.length > 0) {
    html +=
      '<div class="mb-3"><h2 class="resume-section-title">LEADERSHIP & COMMUNITY INVOLVEMENT</h2>';
    leadership.forEach((lead) => {
      if (lead && (lead.organization || lead.role)) {
        html += `
                    <div class="mb-2">
                        <div class="flex justify-between items-baseline">
                            <strong class="text-sm">${
                              lead.organization || "Organization Name"
                            }</strong>
                            <span class="text-xs">${lead.dates || ""}</span>
                        </div>
                        <div class="text-xs italic">${
                          lead.role || "Role/Position"
                        }</div>
                        ${
                          lead.description
                            ? `<div class="text-xs mt-1">${lead.description
                                .split("\n")
                                .filter((line) => line.trim())
                                .map((line) => `<div>• ${line.trim()}</div>`)
                                .join("")}</div>`
                            : ""
                        }
                    </div>
                `;
      }
    });
    html += "</div>";
  }

  // Skills & Certifications
  if (skills.length > 0) {
    html += `
            <div class="mb-3">
                <h2 class="resume-section-title">SKILLS & CERTIFICATIONS</h2>
                <div class="text-xs">
                    <strong>Skills:</strong> ${skills.join(", ")}
                </div>
            </div>
        `;
  }

  // Languages
  if (languages.length > 0) {
    html += `
            <div class="mb-3 text-xs">
                <strong>Languages:</strong> ${languages.join(", ")}
            </div>
        `;
  }

  // Interests
  if (interests.length > 0) {
    html += `
            <div class="mb-3 text-xs">
                <strong>Interests:</strong> ${interests.join(", ")}
            </div>
        `;
  }

  html += "</div>";
  elements.previewContent.innerHTML = html;
}

// ============================================
// EXPORT/IMPORT
// ============================================

function exportToPDF() {
  window.print();
}

function exportToJSON() {
  const dataStr = JSON.stringify(resumeData, null, 2);
  const blob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  const fileName = resumeData.personalInfo.fullName
    ? `resume_${resumeData.personalInfo.fullName.replace(
        /\s+/g,
        "_"
      )}_${Date.now()}.json`
    : `resume_${Date.now()}.json`;
  link.download = fileName;
  link.click();
  URL.revokeObjectURL(url);
  showToast("Resume exported as JSON");
}

function importFromJSON(file) {
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const imported = JSON.parse(e.target.result);

      if (!imported.personalInfo) {
        throw new Error("Invalid format");
      }

      // Clear existing
      elements.educationContainer.innerHTML = "";
      elements.experienceContainer.innerHTML = "";
      elements.projectsContainer.innerHTML = "";
      elements.leadershipContainer.innerHTML = "";
      elements.skillsContainer.innerHTML = "";
      elements.languagesContainer.innerHTML = "";
      elements.interestsContainer.innerHTML = "";

      // Load data
      resumeData = {
        personalInfo: {
          fullName: "",
          email: "",
          phone: "",
          location: "",
          linkedin: "",
          github: "",
          ...imported.personalInfo,
        },
        summary: imported.summary || "",
        education: Array.isArray(imported.education) ? imported.education : [],
        experiences: Array.isArray(imported.experiences)
          ? imported.experiences
          : [],
        projects: Array.isArray(imported.projects) ? imported.projects : [],
        leadership: Array.isArray(imported.leadership)
          ? imported.leadership
          : [],
        skills: Array.isArray(imported.skills) ? imported.skills : [],
        languages: Array.isArray(imported.languages) ? imported.languages : [],
        interests: Array.isArray(imported.interests) ? imported.interests : [],
      };

      populateForm();
      updatePreview();
      saveToLocalStorage();
      showToast("Resume imported successfully!");
    } catch (error) {
      alert("Invalid JSON file. Please upload a valid resume file.");
    }
  };
  reader.readAsText(file);
}

// ============================================
// EVENT LISTENERS
// ============================================

// Personal info
if (elements.fullName) {
  elements.fullName.addEventListener("input", (e) => {
    resumeData.personalInfo.fullName = e.target.value;
    updatePreview();
    debouncedSave();
  });
}

if (elements.email) {
  elements.email.addEventListener("input", (e) => {
    resumeData.personalInfo.email = e.target.value;
    updatePreview();
    debouncedSave();
  });
}

if (elements.phone) {
  elements.phone.addEventListener("input", (e) => {
    resumeData.personalInfo.phone = e.target.value;
    updatePreview();
    debouncedSave();
  });
}

if (elements.location) {
  elements.location.addEventListener("input", (e) => {
    resumeData.personalInfo.location = e.target.value;
    updatePreview();
    debouncedSave();
  });
}

if (elements.linkedin) {
  elements.linkedin.addEventListener("input", (e) => {
    resumeData.personalInfo.linkedin = e.target.value;
    updatePreview();
    debouncedSave();
  });
}

if (elements.github) {
  elements.github.addEventListener("input", (e) => {
    resumeData.personalInfo.github = e.target.value;
    updatePreview();
    debouncedSave();
  });
}

if (elements.summary) {
  elements.summary.addEventListener("input", (e) => {
    resumeData.summary = e.target.value;
    updateCharacterCount();
    updatePreview();
    debouncedSave();
  });
}

// Skills - Enter key and button
if (elements.skillInput) {
  elements.skillInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag(elements.skillInput.value, "skills");
      elements.skillInput.value = "";
    }
  });
}

if (elements.addSkillBtn) {
  elements.addSkillBtn.addEventListener("click", () => {
    addTag(elements.skillInput.value, "skills");
    elements.skillInput.value = "";
  });
}

// Languages - Enter key and button
if (elements.languageInput) {
  elements.languageInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag(elements.languageInput.value, "languages");
      elements.languageInput.value = "";
    }
  });
}

if (elements.addLanguageBtn) {
  elements.addLanguageBtn.addEventListener("click", () => {
    addTag(elements.languageInput.value, "languages");
    elements.languageInput.value = "";
  });
}

// Interests - Enter key and button
if (elements.interestInput) {
  elements.interestInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag(elements.interestInput.value, "interests");
      elements.interestInput.value = "";
    }
  });
}

if (elements.addInterestBtn) {
  elements.addInterestBtn.addEventListener("click", () => {
    addTag(elements.interestInput.value, "interests");
    elements.interestInput.value = "";
  });
}

// Add section buttons
if (elements.addEducation) {
  elements.addEducation.addEventListener("click", () => addEducationEntry());
}

if (elements.addExperience) {
  elements.addExperience.addEventListener("click", () => addExperienceEntry());
}

if (elements.addProject) {
  elements.addProject.addEventListener("click", () => addProjectEntry());
}

if (elements.addLeadership) {
  elements.addLeadership.addEventListener("click", () => addLeadershipEntry());
}

// Export/Import buttons
if (elements.exportPdf) {
  elements.exportPdf.addEventListener("click", exportToPDF);
}

if (elements.exportJson) {
  elements.exportJson.addEventListener("click", exportToJSON);
}

if (elements.importJson) {
  elements.importJson.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) {
      importFromJSON(file);
      e.target.value = "";
    }
  });
}

// Clear all data button
if (elements.clearData) {
  elements.clearData.addEventListener("click", () => {
    if (
      confirm(
        "Are you sure you want to clear all data? This action cannot be undone."
      )
    ) {
      localStorage.clear();
      location.reload();
    }
  });
}

// Keyboard shortcuts
document.addEventListener("keydown", (e) => {
  if ((e.ctrlKey || e.metaKey) && e.key === "s") {
    e.preventDefault();
    saveToLocalStorage();
    showToast("Resume saved!");
  }

  if ((e.ctrlKey || e.metaKey) && e.key === "p") {
    e.preventDefault();
    exportToPDF();
  }
});

// ============================================
// INITIALIZE
// ============================================

console.log("Initializing app...");
loadFromLocalStorage();
console.log("✅ App initialized successfully");

/* MyTask — JavaScript: manajemen tugas, validasi, DOM, localStorage, dan tema */
(function () {
  "use strict";
  const TASKS_KEY = "mytask-tasks";
  const THEME_KEY = "mytask-theme";
  const $ = (selector) => document.querySelector(selector);
  const $$ = (selector) => Array.from(document.querySelectorAll(selector));
  let tasks = loadTasks();
  let activeFilter = "all";
  let searchTerm = "";
  let pendingDeleteId = null;
  let toastTimer;

  function loadTasks() {
    try {
      const saved = JSON.parse(localStorage.getItem(TASKS_KEY) || "[]");
      return Array.isArray(saved) ? saved.filter((task) => task && typeof task.id === "string") : [];
    } catch (error) {
      console.error("Data tugas tidak dapat dibaca:", error);
      return [];
    }
  }

  function saveTasks() {
    try {
      localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
      return true;
    } catch (error) {
      showToast("Data tidak dapat disimpan. Periksa ruang penyimpanan browser.");
      console.error("Data tugas tidak dapat disimpan:", error);
      return false;
    }
  }

  function showToast(message) {
    const toast = $("#toast");
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("show");
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => toast.classList.remove("show"), 2600);
  }

  function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char]));
  }

  function formatDate(value) {
    if (!value) return "Tanpa deadline";
    const date = new Date(value + "T00:00:00");
    return Number.isNaN(date.getTime()) ? value : new Intl.DateTimeFormat("id-ID", { day: "numeric", month: "short", year: "numeric" }).format(date);
  }

  function isOverdue(task) {
    if (!task.deadline || task.completed) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return new Date(task.deadline + "T00:00:00") < today;
  }

  function updateStats() {
    const total = $("#total-tasks");
    const pending = $("#pending-tasks");
    const completed = $("#completed-tasks");
    if (!total || !pending || !completed) return;
    total.textContent = tasks.length;
    pending.textContent = tasks.filter((task) => !task.completed).length;
    completed.textContent = tasks.filter((task) => task.completed).length;
  }

  function getVisibleTasks() {
    return tasks.filter((task) => {
      const filterMatches = activeFilter === "all" || (activeFilter === "completed" ? task.completed : !task.completed);
      const haystack = (task.title + " " + task.course).toLocaleLowerCase("id-ID");
      return filterMatches && haystack.includes(searchTerm);
    }).sort((a, b) => a.deadline.localeCompare(b.deadline) || a.title.localeCompare(b.title, "id"));
  }

  function renderTasks() {
    const list = $("#task-list");
    const emptyState = $("#empty-state");
    if (!list || !emptyState) return; // Halaman Tentang tidak memiliki daftar tugas.
    const visible = getVisibleTasks();
    list.innerHTML = visible.map((task) => `
      <article class="task-item ${task.completed ? "completed" : ""}" data-task-id="${escapeHTML(task.id)}">
        <input class="task-check" type="checkbox" data-action="toggle" aria-label="Tandai ${escapeHTML(task.title)} selesai" ${task.completed ? "checked" : ""}>
        <div class="task-main"><h3 class="task-title">${escapeHTML(task.title)}</h3><div class="task-meta"><span>📚 ${escapeHTML(task.course)}</span><span class="${isOverdue(task) ? "deadline-overdue" : ""}">📅 ${isOverdue(task) ? "Terlambat · " : "Deadline · "}${escapeHTML(formatDate(task.deadline))}</span><span>${task.completed ? "✓ Selesai" : "○ Belum selesai"}</span></div></div>
        <div class="task-actions"><button type="button" class="icon-button" data-action="edit" aria-label="Edit ${escapeHTML(task.title)}">Edit</button><button type="button" class="icon-button delete" data-action="delete" aria-label="Hapus ${escapeHTML(task.title)}">Hapus</button></div>
      </article>`).join("");
    emptyState.classList.toggle("hidden", visible.length > 0);
    const title = $("#empty-title");
    const description = $("#empty-description");
    if (title && description) {
      if (tasks.length === 0) {
        title.textContent = "Belum ada tugas";
        description.textContent = "Tambahkan tugas pertamamu melalui formulir di atas.";
      } else {
        title.textContent = "Tugas tidak ditemukan";
        description.textContent = "Coba ubah kata kunci pencarian atau filter tugas.";
      }
    }
    const count = $("#task-count-label");
    if (count) count.textContent = `Menampilkan ${visible.length} dari ${tasks.length} tugas`;
    const clearButton = $("#clear-completed");
    if (clearButton) clearButton.disabled = !tasks.some((task) => task.completed);
    updateStats();
  }

  function resetForm() {
    const form = $("#task-form");
    if (!form) return;
    form.reset();
    $("#task-id").value = "";
    $("#form-heading").textContent = "Tambah Tugas Baru";
    $("#submit-text").textContent = "Tambah Tugas";
    $("#submit-icon").textContent = "＋";
    $("#cancel-edit").classList.add("hidden");
  }

  function startEdit(id) {
    const task = tasks.find((item) => item.id === id);
    if (!task) return;
    $("#task-id").value = task.id;
    $("#task-title").value = task.title;
    $("#task-course").value = task.course;
    $("#task-deadline").value = task.deadline;
    $("#form-heading").textContent = "Edit Tugas";
    $("#submit-text").textContent = "Simpan Perubahan";
    $("#submit-icon").textContent = "✓";
    $("#cancel-edit").classList.remove("hidden");
    $("#task-title").focus();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleFormSubmit(event) {
    event.preventDefault();
    const titleInput = $("#task-title");
    const courseInput = $("#task-course");
    const deadlineInput = $("#task-deadline");
    if (!titleInput || !courseInput || !deadlineInput) return;
    const title = titleInput.value.trim();
    const course = courseInput.value.trim();
    const deadline = deadlineInput.value;
    if (!title || !course || !deadline) {
      showToast("Lengkapi semua kolom terlebih dahulu.");
      return;
    }
    if (title.length > 100 || course.length > 80) {
      showToast("Nama tugas maksimal 100 karakter dan mata kuliah 80 karakter.");
      return;
    }
    const id = $("#task-id").value;
    if (id) {
      const index = tasks.findIndex((task) => task.id === id);
      if (index !== -1) tasks[index] = { ...tasks[index], title, course, deadline };
      showToast("Perubahan tugas berhasil disimpan.");
    } else {
      tasks.push({ id: (window.crypto && crypto.randomUUID) ? crypto.randomUUID() : String(Date.now()) + Math.random().toString(16).slice(2), title, course, deadline, completed: false, createdAt: new Date().toISOString() });
      showToast("Tugas berhasil ditambahkan.");
    }
    saveTasks();
    resetForm();
    renderTasks();
  }

  function toggleTask(id) {
    const task = tasks.find((item) => item.id === id);
    if (!task) return;
    task.completed = !task.completed;
    saveTasks();
    renderTasks();
    showToast(task.completed ? "Tugas ditandai selesai." : "Tugas dikembalikan ke daftar pending.");
  }

  function openDeleteDialog(id) {
    const task = tasks.find((item) => item.id === id);
    if (!task) return;
    pendingDeleteId = id;
    const message = $("#delete-message");
    const dialog = $("#delete-dialog");
    if (message) message.textContent = `Tugas “${task.title}” akan dihapus dari daftar.`;
    if (dialog && typeof dialog.showModal === "function") dialog.showModal();
    else if (window.confirm(`Hapus tugas “${task.title}”?`)) deleteTask(id);
  }

  function deleteTask(id) {
    const before = tasks.length;
    tasks = tasks.filter((task) => task.id !== id);
    if (tasks.length === before) return;
    saveTasks();
    if ($("#task-id") && $("#task-id").value === id) resetForm();
    renderTasks();
    showToast("Tugas berhasil dihapus.");
  }

  function initTasks() {
    const form = $("#task-form");
    if (!form) return; // Fungsi tugas hanya berjalan di Beranda.
    form.addEventListener("submit", handleFormSubmit);
    $("#cancel-edit").addEventListener("click", resetForm);
    $("#search-task").addEventListener("input", (event) => { searchTerm = event.target.value.trim().toLocaleLowerCase("id-ID"); renderTasks(); });
    $$(".filter-btn").forEach((button) => button.addEventListener("click", () => {
      activeFilter = button.dataset.filter;
      $$(".filter-btn").forEach((item) => { const active = item === button; item.classList.toggle("active", active); item.setAttribute("aria-pressed", String(active)); });
      renderTasks();
    }));
    $("#task-list").addEventListener("click", (event) => {
      const button = event.target.closest("button[data-action]");
      if (!button) return;
      const id = button.closest("[data-task-id]")?.dataset.taskId;
      if (!id) return;
      if (button.dataset.action === "edit") startEdit(id);
      if (button.dataset.action === "delete") openDeleteDialog(id);
    });
    $("#task-list").addEventListener("change", (event) => {
      if (!event.target.matches('input[data-action="toggle"]')) return;
      const id = event.target.closest("[data-task-id]")?.dataset.taskId;
      if (id) toggleTask(id);
    });
    $("#clear-completed").addEventListener("click", () => {
      const completedCount = tasks.filter((task) => task.completed).length;
      if (!completedCount) return;
      if (!window.confirm(`Hapus ${completedCount} tugas yang sudah selesai?`)) return;
      tasks = tasks.filter((task) => !task.completed);
      saveTasks(); renderTasks(); showToast("Semua tugas selesai telah dihapus.");
    });
    const dialog = $("#delete-dialog");
    $("#cancel-delete").addEventListener("click", () => { pendingDeleteId = null; dialog.close(); });
    $("#confirm-delete").addEventListener("click", () => { if (pendingDeleteId) deleteTask(pendingDeleteId); pendingDeleteId = null; dialog.close(); });
    dialog.addEventListener("click", (event) => { if (event.target === dialog) dialog.close(); });
    renderTasks();
  }

  function initTheme() {
    const button = $("#theme-toggle");
    if (!button) return;
    let theme = "light";
    try { theme = localStorage.getItem(THEME_KEY) || "light"; } catch (error) { /* tema tetap dapat diganti selama halaman terbuka */ }
    if (theme !== "dark") theme = "light";
    function applyTheme(nextTheme) {
      theme = nextTheme === "dark" ? "dark" : "light";
      document.documentElement.dataset.theme = theme;
      button.textContent = theme === "dark" ? "☀️ Light Mode" : "🌙 Dark Mode";
      button.setAttribute("aria-label", theme === "dark" ? "Aktifkan light mode" : "Aktifkan dark mode");
      button.setAttribute("aria-pressed", String(theme === "dark"));
      const metaTheme = document.querySelector('meta[name="theme-color"]');
      if (metaTheme) metaTheme.content = theme === "dark" ? "#0f172a" : "#f8fafc";
      try { localStorage.setItem(THEME_KEY, theme); } catch (error) { /* aplikasi tetap berjalan jika storage tidak tersedia */ }
    }
    applyTheme(theme);
    button.addEventListener("click", () => applyTheme(theme === "dark" ? "light" : "dark"));
  }

  document.addEventListener("DOMContentLoaded", () => {
    const year = String(new Date().getFullYear());
    if ($("#current-year")) $("#current-year").textContent = year;
    if ($("#about-year")) $("#about-year").textContent = year;
    initTheme();
    initTasks();
  });
})();

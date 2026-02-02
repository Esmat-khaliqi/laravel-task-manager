const csrfToken = document
    .querySelector('meta[name="csrf-token"]')
    .getAttribute("content");
const authDocument = document.querySelector(".auth");
const completed = document.querySelector(".todo-completed");
const todoHistory = document.querySelector(".todo-history");
const taske = document.querySelector(".todo-item");
let selectedTaskId = null;
const todoAddForm = document.getElementById("todo-add__form");

const statusPage = {
    wrapper: document.querySelector(".global-status"),
    loading: document.querySelector(".global-status .loading"),
    success: document.querySelector(".global-status .success"),
    deleted: document.querySelector(".global-status .delete"),

    showLoading() {
        this.wrapper.classList.remove("hidden");
        this.loading.classList.remove("hidden");
        this.success.classList.add("hidden");
        this.deleted.classList.add("hidden");
    },

    showSuccess() {
        this.loading.classList.add("hidden");
        this.deleted.classList.add("hidden");
        this.success.classList.remove("hidden");
        setTimeout(() => this.hide(), 900);
    },
    showDeleteing() {
        this.loading.classList.add("hidden");
        this.success.classList.add("hidden");
        this.deleted.classList.remove("hidden");
    },
    hide() {
        this.wrapper.classList.add("hidden");
        this.loading.classList.add("hidden");
        this.success.classList.add("hidden");
        this.deleted.classList.add("hidden");
    },
};

const weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
];
const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

const fetchData = {
    method: "GET",
    headers: {
        "Content-type": "application/json",
        Accept: "application/json",
        "X-CSRF-TOKEN": csrfToken,
    },
};
if (authDocument) {
    authDocument.addEventListener("submit", (e) => {
        e.preventDefault();
        const register = e.target.closest("#register-form");
        const login = e.target.closest("#login-form");
        if (register) {
            fetch("/sign", {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                    Accept: "application/json",
                    "X-CSRF-TOKEN": csrfToken,
                },
                body: JSON.stringify({
                    name: document.getElementById("name").value,
                    email: document.getElementById("register-email").value,
                    password:
                        document.getElementById("register-password").value,
                }),
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data.errors) {
                        console.log(data.errors);
                    }
                    window.location.href = "/home";
                });
        }
        if (login) {
            fetch("/login", {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                    Accept: "application/json",
                    "X-CSRF-TOKEN": csrfToken,
                },
                body: JSON.stringify({
                    email: document.getElementById("login-email").value,
                    password: document.getElementById("login-password").value,
                }),
            })
                .then((res) => {
                    if (!res.ok) {
                        return res.json().then((err) => {
                            throw err;
                        });
                    }
                    return res.json();
                })
                .then((data) => {
                    console.log("ok");
                    window.location.href = "/home";
                })
                .catch((err) => {
                    const errorsTag = document.getElementById("login-error");
                    errorsTag.innerText = "";

                    if (err.errors) {
                        errorsTag.innerText = Object.values(err.errors)[0][0];
                    } else {
                        errorsTag.innerText = err.message || "Login failed";
                    }
                });
        }
    });
}

function clearErrors() {
    document.querySelectorAll(".error").forEach((el) => {
        el.textContent = "";
    });
}

if (todoAddForm) {
    todoAddForm.addEventListener("submit", (e) => {
        e.preventDefault();
        fetch("/add-todo", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                Accept: "application/json",
                "X-CSRF-TOKEN": csrfToken,
            },
            body: JSON.stringify({
                title: document.getElementById("todo-form-title").value,
                description: document.getElementById("description").value,
                task_day: document.getElementById("task-day").value,
                due_date: document.getElementById("due_date").value,
            }),
        })
            .then((res) => {
                if (!res.ok) {
                    return res.json().then((err) => {
                        throw err;
                    });
                }
                return res.json();
            })
            .then((data) => {
                clearErrors();
                const todoItem = document.querySelector(".todo-item");
                const todoAdd = document.querySelector(".todo-add");
                todoItem.classList.add("todo-list-show");
                todoAdd.classList.remove("todo-list-show");
                getTodos();
            })
            .catch((err) => {
                clearErrors();
                Object.keys(err.errors).forEach((field) => {
                    const errorTag = document.querySelector(
                        `.error[data-error-for="${field}"]`
                    );
                    if (errorTag) {
                        errorTag.textContent = err.errors[field][0];
                    }
                });
            });
    });
}

function renderTodos(tasks) {
    const taske = document.getElementById("taske");
    const template = document.getElementById("template-task");
    taske.innerHTML = "";
    const todayDate = new Date();
    const navBarData = document.querySelector(".nav-bar__data");
    navBarData.innerText =
        todayDate.getDate() +
        " " +
        months[todayDate.getMonth()] +
        " " +
        todayDate.getFullYear();
    tasks.forEach((ts) => {
        const [year, month, day] = ts.task_day.split("-");
        const date = new Date(year, month - 1, day);
        if (!ts.is_completed && date > todayDate) {
            const dayIndex = date.getDay();
            const dateDay = date.getDate();
            const monthIndex = date.getMonth();

            // Adding values ​​from the database to the template
            const clone = template.content.cloneNode(true);
            clone.querySelector(".week-day").innerText = weekDays[dayIndex];
            clone.querySelector(".data-day").innerText =
                dateDay + " " + months[monthIndex];
            clone.querySelector(".task-content__task_day").innerText =
                ts.task_day;
            clone.querySelector(".task-content__title").innerText = ts.title;
            clone.querySelector(".task-content__description").innerText =
                ts.description ?? "No description.";
            clone.querySelector(".task-content__due_date").innerText =
                ts.due_date ?? "No deadline";
            const editId = clone.querySelector(".edit");
            editId.dataset.taskId = ts.id;
            const completedId = clone.querySelector(".completed");
            completedId.dataset.taskId = ts.id;
            const repeatId = clone.querySelector(".repeat");
            repeatId.dataset.taskId = ts.id;
            const deleteId = clone.querySelector(".delete");
            deleteId.dataset.taskId = ts.id;

            taske.appendChild(clone);
        }
    });

    attachEditListeners(); // اینجا listener ویرایش جدا
}
function attachEditListeners() {
    taske.addEventListener("click", (e) => {
        const editBtn = e.target.closest(".edit");
        if (!editBtn) return;
        selectedTaskId = editBtn.dataset.taskId;
        const taskItem = editBtn.closest(".todo-item__task");
        const title = taskItem.querySelector(".task-content__title").innerText;
        const taskDay = taskItem.querySelector(
            ".task-content__task_day"
        ).innerText;
        const description = taskItem.querySelector(
            ".task-content__description"
        ).innerText;
        const dueDate = taskItem.querySelector(
            ".task-content__due_date"
        ).innerText;

        const editForm = document.querySelector(".edit-form");
        editForm.querySelector('input[name="title"]').value = title;
        editForm.querySelector('input[name="task-day"]').value = taskDay;
        editForm.querySelector('textarea[name="description"]').value =
            description;
        editForm.querySelector('input[name="due_date"]').value = dueDate;
        editForm.classList.add("todo-list-show");
    });
}
function getTodos() {
    fetch("/get-todo", fetchData)
        .then((res) => {
            if (!res.ok) {
                return res.json().then((err) => {
                    throw err;
                });
            }
            return res.json();
        })
        .then((data) => {
            statusPage.showLoading();
            setTimeout(() => {
                renderTodos(data.task);
                statusPage.hide();
            }, 800);
        });
}
function getTodoCompleted() {
    fetch("/completed-todo", fetchData)
        .then((res) => {
            if (!res.ok) {
                return res.json().then((err) => {
                    throw err;
                });
            }
            return res.json();
        })
        .then((data) => {
            const templateTaskCompleted = document.getElementById(
                "template-task-completed"
            );
            completed.innerHTML = "";
            data.task.forEach((ts) => {
                if (ts.is_completed) {
                    completed.classList.remove("todo-completed-bg");
                    const [year, month, day] = ts.task_day.split("-");
                    const date = new Date(year, month - 1, day);
                    const dayIndex = date.getDay();
                    const dateDay = date.getDate();
                    const monthIndex = date.getMonth();

                    // Adding values ​​from the database to the template
                    const clone = templateTaskCompleted.content.cloneNode(true);
                    clone.querySelector(".week-day").innerText =
                        weekDays[dayIndex];
                    clone.querySelector(".data-day").innerText =
                        dateDay + " " + months[monthIndex];
                    clone.querySelector(".task-content__title").innerText =
                        ts.title;
                    clone.querySelector(
                        ".task-content__description"
                    ).innerText = ts.description ?? "No description.";
                    clone.querySelector(".task-content__due_date").innerText =
                        ts.due_date ?? "No deadline";
                    completed.appendChild(clone);
                }
            });
        })
        .catch((err) => {
            console.log(err);
        });
}
function getTodoHistory() {
    fetch("/todo-history", fetchData)
        .then((res) => {
            if (!res.ok) {
                return res.json().then((err) => {
                    throw err;
                });
            }
            return res.json();
        })
        .then((data) => {
            const templateHistory = document.getElementById("template-history");
            // const todayDate = new Date();
            todoHistory.innerHTML = "";
            data.task.forEach((ts) => {
                const [year, month, day] = ts.task_day.split("-");
                const date = new Date(year, month - 1, day);
                const dayIndex = date.getDay();
                const dateDay = date.getDate();
                const monthIndex = date.getMonth();

                // Adding values ​​from the database to the template
                const clone = templateHistory.content.cloneNode(true);
                if (!ts.is_completed) {
                    clone.querySelector(".status").innerText = "Failure";
                } else {
                    clone.querySelector(".status").innerText = "Completed";
                }
                clone.querySelector(".week-day").innerText = weekDays[dayIndex];
                clone.querySelector(".data-day").innerText =
                    dateDay + " " + months[monthIndex];
                clone.querySelector(".task-content__title").innerText =
                    ts.title;
                clone.querySelector(".task-content__description").innerText =
                    ts.description ?? "No description.";
                clone.querySelector(".task-content__due_date").innerText =
                    ts.due_date ?? "No deadline";
                todoHistory.appendChild(clone);
            });
        })
        .catch((err) => {
            console.log(err);
        });
}

document.addEventListener("DOMContentLoaded", (e) => {
    const todoHomeMain = document.querySelector(".todo-home-main");
    if (todoHomeMain) {
        getTodos();
    }
    if (completed) {
        getTodoCompleted();
    }
    if (todoHistory) {
        getTodoHistory();
    }
});

taske.addEventListener("click", (e) => {
    const completed = e.target.closest(".completed");
    const deleteTaske = e.target.closest(".delete");
    if (completed) {
        const taskid = completed.dataset.taskId;
        fetch(`/completed/${taskid}`, {
            method: "PATCH",
            headers: {
                "Content-type": "application/json",
                Accept: "application/json",
                "X-CSRF-TOKEN": csrfToken,
            },
        })
            .then((res) => {
                if (!res.ok) {
                    return res.json().then((err) => {
                        throw err;
                    });
                }
                return res.json();
            })
            .then((data) => {
                getTodos();
                getTodoCompleted();
                getTodoHistory();
            })
            .catch((err) => {
                console.log(err);
            });
    }
    if (deleteTaske) {
        const deleteId = deleteTaske.dataset.taskId;
        fetch(`/delete/${deleteId}`, {
            method: "DELETE",
            headers: {
                "Content-type": "application/json",
                Accept: "application/json",
                "X-CSRF-TOKEN": csrfToken,
            },
        })
            .then((res) => {
                if (!res.ok) {
                    return res.json().then((err) => {
                        throw err;
                    });
                }
                return res.json();
            })
            .then((data) => {
                getTodos();
                getTodoCompleted();
                getTodoHistory();
            })
            .catch((err) => {
                console.log(err);
            });
    }
});

const todoEditForm = document.getElementById("todo-edit__form");
todoEditForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const editForm = document.querySelector(".edit-form");
    const formData = {
        title: document.getElementById("edit-form-title").value,
        task_day: document.getElementById("edit-day").value,
        description: document.getElementById("edit-description").value,
        due_date: document.getElementById("edit_due_date").value,
    };
    fetch(`/update/${selectedTaskId}`, {
        method: "PUT",
        headers: {
            "Content-type": "application/json",
            Accept: "application/json",
            "X-CSRF-TOKEN": csrfToken,
        },
        body: JSON.stringify(formData),
    })
        .then((res) => {
            if (!res.ok) {
                return res.json().then((err) => {
                    throw err;
                });
            }
            return res.json();
        })
        .then((data) => {
            editForm.classList.remove("todo-list-show");
            taske.classList.add("todo-list-show");
            getTodos();
        })
        .catch((err) => {
            clearErrors();
            console.log(err);
            Object.keys(err.errors).forEach((field) => {
                const errorTag = document.querySelector(
                    `.error-edit[data-error-for="${field}"]`
                );
                if (errorTag) {
                    errorTag.textContent = err.errors[field][0];
                }
            });
        });
});

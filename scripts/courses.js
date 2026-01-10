const courses = [
  { subject: "CSE", number: 110, title: "Introduction to Programming", credits: 2, completed: true },
  { subject: "WDD", number: 130, title: "Web Fundamentals", credits: 2, completed: true },
  { subject: "WDD", number: 231, title: "Frontend Development I", credits: 2, completed: false },
  { subject: "CSE", number: 210, title: "Programming with Classes", credits: 2, completed: false }
];

const courseCards = document.querySelector("#courseCards");
const totalCredits = document.querySelector("#totalCredits");

const btnAll = document.querySelector("#all");
const btnWDD = document.querySelector("#wdd");
const btnCSE = document.querySelector("#cse");
const filterButtons = document.querySelectorAll(".filter");

function setActive(button) {
  filterButtons.forEach(b => b.classList.remove("active"));
  button.classList.add("active");
}

function displayCredits(list) {
  const total = list.reduce((sum, course) => sum + course.credits, 0);
  totalCredits.textContent = total;
}

function displayCourses(list) {
  courseCards.innerHTML = "";

  list.forEach(course => {
    const card = document.createElement("div");
    card.classList.add("course");
    if (course.completed) card.classList.add("completed");

    card.innerHTML = `
      <h3>${course.subject} ${course.number}</h3>
      <p>${course.title}</p>
      <p>Credits: ${course.credits}</p>
    `;

    courseCards.appendChild(card);
  });

  displayCredits(list);
}

btnAll.addEventListener("click", () => {
  setActive(btnAll);
  displayCourses(courses);
});

btnWDD.addEventListener("click", () => {
  setActive(btnWDD);
  displayCourses(courses.filter(c => c.subject === "WDD"));
});

btnCSE.addEventListener("click", () => {
  setActive(btnCSE);
  displayCourses(courses.filter(c => c.subject === "CSE"));
});

displayCourses(courses);

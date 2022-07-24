const BASE_URL = "https://627f71eebe1ccb0a465fd574.mockapi.io";


// CRUD Operations on Resources

// READ ( GET ) all, particular
// GET API
const getStudents = async () => {
  const response = await fetch(`${BASE_URL}/students`);
  const studentsData = await response.json();
  studentsData.forEach(element => {
    console.log(element.name);
    console.log(element.id);
    console.log(element.email);
  });
}

// GET Specific Student Detail
const getStudent = async (studentId) => {
  const response = await fetch(`${BASE_URL}/students/${studentId}`);
  const studentData = await response.json();
  console.log(studentData);
}

const getBtn = document.getElementById("get-stu");
getBtn.addEventListener("click", () => {
  const inputVal = document.getElementById('text-inp').value;
  getStudent(inputVal);
});

// CREATE ( POST ) --> Create New Entity
// POST create new student
const createStudent = async (payload) => {

  const newResponse = await fetch(
    `${BASE_URL}/students`,
    {
      method: "POST", // Has to be there when we make a call other than GET
      body: JSON.stringify( payload),
      headers: {
        "Content-Type": "application/json;charset=UTF-8"
      }
    }
  );
  const studentData = await newResponse.json();
  console.log(studentData);
}

// createStudent(
//   { name: "Sammy", email: "sammy@gmail.com"}
// );

const createForm = document.getElementById("create-form");
createForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const elements = event.target.elements;
  const data = {};

  // console.log(Array(elements));

  Array(...elements).forEach(element => {
    console.log(element);
    if(element.nodeName === "INPUT") {
      data[element.id] = element.value;
    }
  });
  createStudent(data);
});


// UPDATE ( PUT ) ---> To Update an entity
// PUT update a student
const updateStudent = async (id, newPayload) => {
  const updateResponse = await fetch(
    `${BASE_URL}/students/${id}`,
    {
      method: "PUT",
    }
  )
  const updateStudentData = await updateResponse.json();
  console.log(updateStudentData);
}


// updateStudent("14", { name: "Ajith", email: "ajith@gmail.com" });


// DELETE ( DELETE ) ---> to remove an entity
// DELETE remove an student
const removeStudent = async (id) => {
  const removedResponse = await fetch(
    `${BASE_URL}/students/${id}`,
    {
      method: "DELETE",
    }
  );
  const removedStudentData = await removedResponse.json();
  console.log(removedStudentData);
}

// removeStudent("15");
window.addEventListener('DOMContentLoaded', getStudents);


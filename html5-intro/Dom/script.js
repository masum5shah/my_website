// Student Management JS
// Made by a CSE undergrad for fun and practice :)

// Show first message if no students
function showEmptyMessage() {
    const ul = document.getElementById('student-list');
    if (ul.children.length === 0) {
        let msg = document.createElement('li');
        msg.textContent = 'No students yet. Type a name above and add!';
        msg.classList.add('empty-message');
        ul.appendChild(msg);
    }
}
showEmptyMessage();

// Listen for form submit
const studentForm = document.getElementById('student-form');
studentForm.addEventListener('submit', addStudent);

// Highlight students button
document.getElementById('highlight-btn').addEventListener('click', changeListStyle);

function addStudent(event) {
    event.preventDefault();
    let studentName = document.getElementById('student-name').value.trim();
    if (studentName === '') {
        alert('Please enter a student name');
        return;
    }

    const ul = document.getElementById('student-list');
    // remove the empty message if present
    if (ul.querySelector('.empty-message')) {
        ul.innerHTML = '';
    }
    // Make new list item
    let li = document.createElement('li');
    li.classList.add('student-item');
    // Student name span
    let span = document.createElement('span');
    span.textContent = studentName;
    // Edit button
    let editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.className = 'btn-edit';
    editButton.addEventListener('click', function() {
        editStudent(li, span);
    });
    // Delete button
    let deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'btn-delete';
    deleteButton.addEventListener('click', function() {
        deleteStudent(li);
    });
    li.appendChild(span);
    li.appendChild(editButton);
    li.appendChild(deleteButton);
    ul.appendChild(li);
    studentForm.reset();
}

function deleteStudent(li) {
    li.remove();
    showEmptyMessage();
}

function editStudent(li, span) {
    let newName = prompt('Edit name:', span.textContent);
    if (newName && newName.trim() !== '') {
        span.textContent = newName.trim();
    }
}

function changeListStyle() {
    let students = document.querySelectorAll('.student-item');
    if (students.length === 0) {
        alert('Nothing to highlight!');
        return;
    }
    students.forEach(item => {
        item.classList.toggle('highlight');
    });
}

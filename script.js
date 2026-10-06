
// Select the elements we need
const noteForm = document.querySelector("#note-form");
const noteInput = document.querySelector("#note-input");
const noteCategory = document.querySelector("#note-category");
const notesList = document.querySelector("#notes-list");


// Notes will be stored in this array
let notes = [];


// Display the notes on the page
function render() {
    notesList.textContent = "";

    for (let note of notes) {
        const listItem = document.createElement("li");
        listItem.classList.add("note-card");
        listItem.classList.add("category-" + note.category);

        const noteText = document.createElement("p");
        noteText.textContent = note.text;

        const category = document.createElement("small");
        category.classList.add("note-category");
        category.textContent = note.category;

        const date = document.createElement("p");
        date.classList.add("note-date");
        date.textContent = note.createdAt;

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";

        listItem.appendChild(noteText);
        listItem.appendChild(category);
        listItem.appendChild(date);
        listItem.appendChild(deleteButton);

        notesList.appendChild(listItem);
    }
}


// Add a new note
noteForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const text = noteInput.value.trim();
    const category = noteCategory.value;

    const newNote = {
        id: Date.now(),
        text: text,
        category: category,
        createdAt: new Date().toLocaleString()
    };

    notes.push(newNote);

    render();

    noteInput.value = "";
});

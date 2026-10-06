
// Select the elements we need
const noteForm = document.querySelector("#note-form");
const noteInput = document.querySelector("#note-input");
const noteCategory = document.querySelector("#note-category");
const notesList = document.querySelector("#notes-list");
const noteCount = document.querySelector("#note-count");
const errorMessage = document.querySelector("#error-message");


// Store notes in an array
let notes = [];


// Display the notes
function render() {
    notesList.textContent = "";

    if (notes.length === 0) {
        noteCount.textContent = "You have no notes yet.";
    } else if (notes.length === 1) {
        noteCount.textContent = "You have 1 note.";
    } else {
        noteCount.textContent = "You have " + notes.length + " notes.";
    }

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

        // Delete this particular note
        deleteButton.addEventListener("click", function () {
            notes = notes.filter(function (item) {
                return item.id !== note.id;
            });

            render();
        });

        listItem.appendChild(noteText);
        listItem.appendChild(category);
        listItem.appendChild(date);
        listItem.appendChild(deleteButton);

        notesList.appendChild(listItem);
    }
}


// Add a note
noteForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const text = noteInput.value.trim();
    const category = noteCategory.value;

    // Check for an empty note
    if (text === "") {
        errorMessage.textContent = "Please type a note first.";
        return;
    }

    // Check the character limit
    if (text.length > 200) {
        errorMessage.textContent =
            "Notes must be 200 characters or fewer.";
        return;
    }

    // Clear any previous error
    errorMessage.textContent = "";

    const newNote = {
        id: Date.now(),
        text: text,
        category: category,
        createdAt: new Date().toLocaleString()
    };

    notes.push(newNote);

    noteInput.value = "";

    render();
});
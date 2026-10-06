
// Select the elements we need
const noteForm = document.querySelector("#note-form");
const noteInput = document.querySelector("#note-input");
const noteCategory = document.querySelector("#note-category");
const searchInput = document.querySelector("#search-input");
const notesList = document.querySelector("#notes-list");
const noteCount = document.querySelector("#note-count");
const errorMessage = document.querySelector("#error-message");


// Load notes from localStorage
let savedNotes = localStorage.getItem("quickNotes");

let notes = [];

if (savedNotes !== null) {
    notes = JSON.parse(savedNotes);
}


// Save notes to localStorage
function saveNotes() {
    localStorage.setItem("quickNotes", JSON.stringify(notes));
}


// Display the notes
function render() {
    notesList.textContent = "";

    const searchText = searchInput.value.trim().toLowerCase();

    let displayedNotes = notes.filter(function (note) {
        return note.text.toLowerCase().includes(searchText);
    });


    // Update the total note count
    if (notes.length === 0) {
        noteCount.textContent = "You have no notes yet.";
    } else if (notes.length === 1) {
        noteCount.textContent = "You have 1 note.";
    } else {
        noteCount.textContent = "You have " + notes.length + " notes.";
    }


    // Show a message when the search has no results
    if (displayedNotes.length === 0 && searchText !== "") {
        const message = document.createElement("li");
        message.textContent = "No notes match your search.";
        notesList.appendChild(message);
        return;
    }


    // Create a card for every matching note
    for (let note of displayedNotes) {
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


        // Delete this note
        deleteButton.addEventListener("click", function () {
            notes = notes.filter(function (item) {
                return item.id !== note.id;
            });

            saveNotes();
            render();
        });


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


    // Check for an empty note
    if (text === "") {
        errorMessage.textContent = "Please type a note first.";
        return;
    }


    // Check the 200 character limit
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

    // Save the updated notes
    saveNotes();

    noteInput.value = "";

    render();
});


// Search notes as the user types
searchInput.addEventListener("input", function () {
    render();
});


// Display the notes when the page first opens
render();

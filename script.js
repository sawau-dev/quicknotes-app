/* =========================================
   QUICKNOTES
   Task 5: Persistence and search
   ========================================= */


/* =========================================
   1. SELECT ELEMENTS
   ========================================= */

const noteForm = document.querySelector("#note-form");
const noteInput = document.querySelector("#note-input");
const noteCategory = document.querySelector("#note-category");
const notesList = document.querySelector("#notes-list");
const noteCount = document.querySelector("#note-count");
const errorMessage = document.querySelector("#error-message");
const searchInput = document.querySelector("#search-input");
const characterCount = document.querySelector("#character-count");
const clearAllButton = document.querySelector("#clear-all-button");


/* =========================================
   2. STORAGE KEY
   ========================================= */

const STORAGE_KEY = "quicknotes-notes";


/* =========================================
   3. NOTES ARRAY
   ========================================= */

let notes = [];


/* =========================================
   4. SAVE NOTES
   ========================================= */

function saveNotes() {

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(notes)
    );

}


/* =========================================
   5. LOAD NOTES
   ========================================= */

function loadNotes() {

    const savedNotes =
        localStorage.getItem(STORAGE_KEY);


    if (savedNotes) {

        try {

            const parsedNotes =
                JSON.parse(savedNotes);


            if (Array.isArray(parsedNotes)) {

                notes = parsedNotes;

            }

        } catch (error) {

            console.error(
                "Could not load saved notes:",
                error
            );

        }

    }

}


/* =========================================
   6. UPDATE NOTE COUNT
   ========================================= */

function updateNoteCount() {

    if (notes.length === 0) {

        noteCount.textContent =
            "You have no notes yet.";

    } else if (notes.length === 1) {

        noteCount.textContent =
            "You have 1 note.";

    } else {

        noteCount.textContent =
            `You have ${notes.length} notes.`;

    }

}

/* =========================================
   7. RENDER NOTES
   ========================================= */

function render(notesToRender = notes) {

    notesList.replaceChildren();


    /*
     * If a search is active but no notes
     * match it, show a helpful message.
     */

    if (
        notesToRender.length === 0 &&
        notes.length > 0 &&
        searchInput.value.trim() !== ""
    ) {

        const emptyMessage =
            document.createElement("li");


        emptyMessage.classList.add("empty-state");


        emptyMessage.textContent =
            "No notes match your search.";


        notesList.appendChild(emptyMessage);


        updateNoteCount();

        return;
    }


    /*
     * Create a card for every note.
     */

    notesToRender.forEach(function (note) {

        const listItem =
            document.createElement("li");


        listItem.classList.add("note-card");


        /*
         * Convert the category into the
         * CSS class:
         *
         * Personal -> category-personal
         * Work     -> category-work
         * Study    -> category-study
         */

        const categoryClass =
            `category-${note.category.toLowerCase()}`;


        listItem.classList.add(categoryClass);


        /*
         * Category label
         */

        const categoryLabel =
            document.createElement("span");


        categoryLabel.classList.add(
            "category-label"
        );


        categoryLabel.textContent =
            note.category;


        /*
         * Note text
         */

        const noteText =
            document.createElement("p");


        noteText.classList.add("note-text");


        noteText.textContent =
            note.text;


        /*
         * Footer
         */

        const noteFooter =
            document.createElement("div");


        noteFooter.classList.add("note-footer");


        /*
         * Date
         */

        const noteDate =
            document.createElement("small");


        noteDate.classList.add("note-date");


        noteDate.textContent =
            note.createdAt;


        /*
         * Delete button
         */

        const deleteButton =
            document.createElement("button");


        deleteButton.type = "button";


        deleteButton.classList.add(
            "delete-button"
        );


        deleteButton.textContent = "Delete";


        deleteButton.dataset.id =
            note.id;


        /*
         * Build footer
         */

        noteFooter.appendChild(noteDate);

        noteFooter.appendChild(deleteButton);


        /*
         * Build card
         */

        listItem.appendChild(categoryLabel);

        listItem.appendChild(noteText);

        listItem.appendChild(noteFooter);


        /*
         * Add card to list
         */

        notesList.appendChild(listItem);

    });


    updateNoteCount();

}


/* =========================================
   8. VALIDATE NOTE
   ========================================= */

function validateNote(text) {

    if (text.length === 0) {

        errorMessage.textContent =
            "Please type a note first.";

        return false;

    }


    if (text.length > 200) {

        errorMessage.textContent =
            "Notes must be 200 characters or fewer.";

        return false;

    }


    errorMessage.textContent = "";

    return true;

}


/* =========================================
   9. ADD A NOTE
   ========================================= */

noteForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        const text =
            noteInput.value.trim();


        const category =
            noteCategory.value;


        /*
         * Validate the note before adding it.
         */

        if (!validateNote(text)) {
            return;
        }


        /*
         * Create the note object.
         */

        const newNote = {

            id: Date.now().toString(),

            text: text,

            category: category,

            createdAt:
                new Date().toLocaleString()

        };


        /*
         * Add newest note to beginning.
         */

        notes.unshift(newNote);


        /*
         * Save immediately.
         */

        saveNotes();


        /*
         * Clear the form.
         */

        noteInput.value = "";

        characterCount.textContent =
            "0 / 200";

        errorMessage.textContent = "";


        /*
         * Re-render.
         */

        render();

    }
);


/* =========================================
   10. CHARACTER COUNTER
   ========================================= */

noteInput.addEventListener(
    "input",
    function () {

        const currentLength =
            noteInput.value.length;


        characterCount.textContent =
            `${currentLength} / 200`;


        /*
         * Clear the error once the
         * user starts typing again.
         */

        if (currentLength > 0) {

            errorMessage.textContent = "";

        }

    }
);


/* =========================================
   11. DELETE A NOTE
   ========================================= */

notesList.addEventListener(
    "click",
    function (event) {

        if (
            !event.target.classList.contains(
                "delete-button"
            )
        ) {
            return;
        }


        const noteId =
            event.target.dataset.id;


        /*
         * Remove the selected note.
         */

        notes = notes.filter(
            function (note) {

                return note.id !== noteId;

            }
        );


        /*
         * Save the updated array.
         */

        saveNotes();


        /*
         * Render the updated list.
         */

        render();

    }
);


/* =========================================
   12. SEARCH NOTES
   ========================================= */

searchInput.addEventListener(
    "input",
    function () {

        const searchTerm =
            searchInput.value
                .trim()
                .toLowerCase();


        /*
         * Find notes whose text contains
         * the search term.
         */

        const filteredNotes =
            notes.filter(
                function (note) {

                    return note.text
                        .toLowerCase()
                        .includes(searchTerm);

                }
            );


        render(filteredNotes);

    }
);


/* =========================================
   13. CLEAR ALL NOTES
   ========================================= */

clearAllButton.addEventListener(
    "click",
    function () {

        if (notes.length === 0) {
            return;
        }


        const confirmed =
            confirm("Delete all notes?");


        if (confirmed) {

            notes = [];


            /*
             * Save the empty array so the
             * deleted notes don't return.
             */

            saveNotes();


            render();

        }

    }
);


/* =========================================
   14. LOAD SAVED DATA
   ========================================= */

loadNotes();


/* =========================================
   15. INITIAL RENDER
   ========================================= */

render();

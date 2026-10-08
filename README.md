# QuickNotes

QuickNotes is a simple and responsive browser-based note-taking application built with HTML, CSS, and vanilla JavaScript. It allows users to quickly create, organize, search, and delete notes using Personal, Work, and Study categories. Notes are stored in the browser using localStorage, so they remain available after refreshing the page. The project was designed with a clean, modern interface while keeping the underlying code simple and easy to understand.

## Features

- Add notes with Personal, Work, or Study categories
- Validate empty notes and note length
- Display notes in organized category-based cards
- Delete individual notes
- Search notes instantly
- Display the total number of saved notes
- Save notes using browser localStorage
- Restore notes automatically after refreshing the page
- Clear all notes with confirmation
- Responsive layout for desktop and mobile screens
- Character counter for note input
- Accessible form labels and live status messages

## How to Run Locally

1. Clone the repository:

   ```bash
   git clone https://github.com/sawau-dev/quicknotes-app.git

2. Open the project folder:

   cd quicknotes-app

3. Open index.html in a web browser.

No additional dependencies or installation steps are required.

##What I Learned
- I learned how to use JavaScript DOM methods such as createElement, textContent, and querySelector to build and update page content.
- I learned how to use localStorage with JSON.stringify() and JSON.parse() to save and restore notes in the browser.
- I learned how to validate user input and provide clear feedback for empty or overly long notes.
- I learned how to filter notes using a search input and update the displayed results dynamically.
- I learned why using textContent instead of innerHTML is safer when displaying user-provided content.
- I learned how semantic HTML, labels, live regions, and responsive CSS can improve accessibility and usability.


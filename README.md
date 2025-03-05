# Demo Book List

A simple CRUD React application built with a REST architecture. The app allows users to manage a list of books with features like adding, editing, deleting, and deactivating/reactivating books. It consists of two pages: **Dashboard** (to view and manage books) and **Add/Edit Book** (to create or update book entries).

This project uses a fake REST API powered by `json-server`, React hooks, Context API, TypeScript, and Tailwind CSS for styling. No third-party state management or form libraries (e.g., Redux, Formik) were used, per the requirements.

## Features

### Dashboard
- Displays a table of books with columns: Book Title, Author Name, Category, ISBN, Created At, Modified At, and Actions.
- Filter dropdown: "Show All", "Show Active", "Show Deactivated" (default: "Show Active").
- Shows the number of filtered records vs. total records (e.g., "Showing 5 of 10").
- Actions: Edit (redirects to edit page), Deactivate/Re-Activate (toggles status), Delete (only for deactivated books).
- Sticky footer with a link to my GitHub profile.
- Success messages appear briefly after CRUD operations.

### Add/Edit Book
- Form with fields: Book Title, Author Name, Category (dropdown), ISBN.
- All fields are required with client-side validation (empty fields highlighted).
- Submit button: "Add a Book" (create) or "Edit Book" (update).
- Redirects to Dashboard with updated table on successful submission.

### Technical Details
- **Frontend**: React (latest), TypeScript, Context API, Hooks, Tailwind CSS.
- **Backend**: Fake REST API using `json-server`.
- **Responsive**: Minimum width 320px.
- **No external libs**: Avoided Redux, Axios, Formik, etc.

## Prerequisites

Before running the app, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js) or [yarn](https://yarnpkg.com/) (optional)

## Installation and Setup

Follow these steps to run the application locally:

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/DemoBookList.git
cd DemoBookList
```

2. Install Dependencies
Install the required npm packages for the React app:
```
npm install
```


3. Set Up the Fake REST API
The app uses json-server to simulate a backend. A db.json file is included in the repository with initial data.

Install json-server globally (if not already installed):
```
npm install -g json-server
```

4. Run the Fake Backend
Start the json-server on port 3001 (or any port you prefer, just update the frontend API calls accordingly):

```
json-server --watch db.json --port 3001

```
The API will be available at http://localhost:3001/books.

5. Run the React Application
In a separate terminal, start the React development server:

```
npm start
```
The app will open at http://localhost:3000 in your default browser.

Visit http://localhost:3000 to see the Dashboard.
Ensure json-server is running simultaneously at http://localhost:3001.

Scripts
npm start: Runs the React app in development mode.
json-server --watch db.json --port 3001: Runs the fake backend (run separately).


```
json

{
  "books": [
    {
      "id": 1,
      "title": "The Great Gatsby",
      "author": "F. Scott Fitzgerald",
      "category": "Fiction",
      "isbn": "9780743273565",
      "isActive": true,
      "createdAt": "2022-03-12T08:35:00Z",
      "modifiedAt": null
    }
  ]
}
```
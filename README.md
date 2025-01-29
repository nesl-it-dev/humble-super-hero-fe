# Humble Superhero Frontend

## Introduction

The **Humble Superhero Frontend** is a simple React application that allows users to:

- Add a new superhero with a name, superpower, and a humility score.
- View a sorted list of superheroes based on their humility score.

## Tech Stack

- **Frontend:** Nextjs
- **State Management:** useState & useEffect
- **Styling:** CSS/Tailwind
- **API Communication:** Fetch/Axios

## Installation and Setup

1. Clone the repository:

   ```sh
   git clone https://github.com/your-repo/humble-superhero-frontend.git
   cd humble-superhero-frontend
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Start the development server:

   ```sh
   npm run dev
   ```

   The application will run on `http://localhost:3000`.

## API Integration

Ensure the backend API (`Humble Superhero API`) is running before using the frontend.

- **Base URL:** `http://localhost:5000`

### 1. Add a New Superhero

**Endpoint:** `POST /superheroes`  
**Request Body (JSON):**

```json
{
  "name": "Spider-Man",
  "superpower": "Web-Slinging",
  "humilityScore": 9
}
```

### 2. Fetch Superheroes List

**Endpoint:** `GET /superheroes`  
**Response Example:**

```json
{
  "data": [
    {
      "name": "Bat-man",
      "superpower": "Web-Slinging",
      "humilityScore": 10
    },
    {
      "name": "Spider-man",
      "superpower": "Web-Slinging",
      "humilityScore": 7
    }
  ],
  "message": "Superheroes retrieved successfully"
}
```

## Features

- **Form Validation**: Ensures required fields are filled and humility score is within 1-10.
- **Real-time Updates**: Fetches and updates the list after adding a superhero.
- **Responsive Design**: Mobile-friendly UI.

## Team Collaboration

If working with a team:

- Use **Git with feature branches** for structured development.
- Conduct **code reviews via pull requests**.
- Communicate through **Slack/Teams/GitHub Discussions**.
- Use **Trello/Jira/GitHub Projects** for task management.

## If I Had More Time

- Implement a **better UI design** with animations.
- Add **search & filter** options for superhero list.
- Implement **state management with Redux/Zustand**.
- Deploy to **Vercel/Netlify** for easy access.

---

### Submission

The project is submitted as a zip file.  
Alternatively, push it to GitHub and share the repository link.

---

🎉 **Thank you for the opportunity!** 🚀

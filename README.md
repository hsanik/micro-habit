# Micro Habit Tracker

A simple, fast, and satisfying full-stack web application designed to help users build and maintain micro-habits on a daily basis.

***

## 💡 Project Idea
The concept behind the **Micro Habit Tracker** is that massive transformations are built on the foundation of tiny, sustainable daily actions. Traditional goal tracking often fails because the goals are too large and intimidating. This application focuses strictly on "micro habits"—actions that take less than 5 minutes to complete (e.g., drinking a glass of water, meditating for 2 minutes, reading one page of a book).

By providing a beautifully designed, user-friendly interface that feels genuinely rewarding to interact with, this app encourages consistency. Users can log their daily progress, track their completion rates, and even view a community feed of public habits to get inspired by what others are trying to achieve!

## 🚀 Implemented Features
*   **Secure Authentication:** End-to-end user authentication handled seamlessly via Firebase. Users can securely sign up manually or use Google OAuth 2.0 with just one click. 
*   **Protected Routing:** Core application routes like creating habits and viewing personal dashboards are completely protected and inaccessible to unauthenticated visitors.
*   **CRUD Functionality:** Full capabilities to **C**reate, **R**ead, **U**pdate, and **D**elete habits, seamlessly synced to a cloud database.
*   **Daily Progress Tracking:** An interactive interface on individual habit cards that allows users to instantly increment their daily log and visualizes their progress with a dynamic progress bar toward their frequency goal.
*   **Community Feed (All Habits):** A global page that fetches and beautifully displays public habits created by the community, allowing users to draw inspiration from each other without letting them interfere with other users' data.
*   **Fully Responsive & Styled:** Beautiful, modern glassmorphism UI built entirely using Tailwind CSS, featuring hover effects, micro-animations, and perfect responsiveness from mobile phones to ultra-wide desktop monitors.
*   **Dynamic Interactive States:** Displays visual cues, toast notifications for success/failure, empty state placeholders for users without data, and conditional buttons depending on user status.

## 🛠️ Tech Stack
This application was built from the ground up utilizing the modern React MERN ecosystem.

### Frontend
*   **React 18:** The core UI library driving the component architecture.
*   **Vite:** Ultra-fast sub-millisecond build tool and development server.
*   **Tailwind CSS:** Utility-first CSS framework for rapid, custom, responsive styling.
*   **shadcn/ui:** High-quality unstyled UI components built on Radix UI to accelerate development.
*   **React Router v6:** For handling seamless, SPA client-side routing and protected boundaries.
*   **Firebase Authentication:** Managing user identity and OAuth flows securely.
*   **Lucide React:** A beautiful, consistent open-source icon pack.
*   **Axios:** Promise-based HTTP client for fetching and posting data to the REST API.

### Backend & Database (Micro Habit Server)
*   **Node.js & Express.js:** The lightning-fast javascript server handling API routing and requests.
*   **MongoDB Atlas:** A robust NoSQL cloud database storing all application data permanently.
*   **Express CORS & Environment Variables:** Securely allowing specific frontend domains to fetch data without exposing secret connection string credentials.
*   **Vercel:** The serverless cloud infrastructure currently hosting and seamlessly scaling the backend.

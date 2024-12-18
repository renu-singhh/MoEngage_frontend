This project combines regex for dynamic data filtering with user authentication and authorization to create a secure, feature-rich application.

Core Features:
Regex-Based Data Fetching:

The app uses regular expressions to filter and retrieve data from an external API. Users input a query, and regex is used to fetch only the data that matches specific patterns, improving search efficiency.
User Authentication:

Users can sign up with email, username, and password. Passwords are securely hashed using bcrypt.
Users can log in using their credentials, and a JWT (JSON Web Token) is issued to maintain sessions.
User Authorization:

Role-Based Access Control (RBAC) is implemented. Admin users have full control over the app, while regular users can only view and search data.
Routes like editing or deleting content are protected, ensuring only authorized users can perform those actions.
Technologies Used:
Frontend: React or Vanilla JS, CSS/Bootstrap for UI.
Backend: Node.js/Express or Django for server-side functionality.
Authentication: JWT for session management and bcrypt for password hashing.
External API: Fetching dynamic data with regex filtering.

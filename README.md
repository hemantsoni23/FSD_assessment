# Full Stack Web Application with Role-Based Access Control

## Project Overview
This is a full-stack web application with multi-role support and protected routes. The application includes functionalities for role-based access control, user authentication, and dynamic route handling. Users are categorized into roles such as `Admin`, `User`, and `Viewer`, and their access to specific pages and actions is determined accordingly. 

### Key Features
- **Authentication System:** Secure login and signup pages.
- **Role-Based Access Control:**
  - Admins can manage users and perform CRUD operations.
  - Users can interact with data specific to their assigned country.
  - Viewers have read-only access to specific data.
- **Protected Routes:** Certain pages are accessible only to authenticated users.
- **Responsive Design:** A responsive layout optimized for both desktop and mobile devices.
- **Profile Management:** Users can view their profile details such as email, role, and assigned country.
- **Dynamic Navigation:** The navigation bar is always displayed and adapts to user roles and authentication status.

---

## Skills and Technologies Used
### Frontend:
- **ReactJS:** Component-based architecture for building UI.
- **React Router:** For client-side routing and route protection.
- **TailwindCSS:** For modern, utility-first styling.
- **Context API:** To manage global state (authentication and user roles).

### Backend:
- **Node.js and Express.js:** For building the server and API routes.
- **JWT Authentication:** Securely managing tokens for user sessions.
- **MongoDB Database:** Storing user data and managing access permissions.

### Other Tools:
- **Redux:** Used for state management across the application.
- **DayJS:** For handling and formatting dates.

---

### Installation
1. Clone this repository:
   ```bash
   git clone https://github.com/hemantsoni23/FSD_assessment.git
   cd FSD_assessment
    ```
2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Backend setup:
   - Set up a database and configure connection settings in the backend code.
   - Run the backend server:
     ```bash
     node server.js
     ```

---

## Usage
### User Roles and Login Credentials
#### Admin
- **Email:** admin@gmail.com
- **Password:** Admin123@

#### User
- **Email:** user@gmail.com
- **Password:** User123@

- **Email:** user1@gmail.com
- **Password:** User123@

#### Viewer
- **Email:** viewer@gmail.com
- **Password:** Viewer123@

- **Email:** viewer1@gmail.com
- **Password:** Viewer123@

### Functionalities Based on Roles
1. **Admin Panel:**
   - Manage all user data and CRUD operations.
   - Accessible at `/admin`.

2. **User Dashboard:**
   - Perform data operations for a selected country.
   - Accessible at `/dashboard`.

3. **Viewer:**
   - View data for the assigned country.
   - Accessible at `/dashboard`.

4. **Profile:**
   - Accessible for all authenticated users at `/profile`.

---

## Assumptions
- All user data is pre-seeded for demonstration purposes.
- Role-based logic is implemented assuming:
  - Admins have full access.
  - Users have restricted access based on their assigned country.
  - Viewers have only read-only permissions.
- Admin have access to change role of every users.
- Initially when user/viewer signup the admin will decide the role for them in "Manage User".
---

## Challenges Faced
1. **Dynamic Navigation and Protected Routes:**  
   Handling authentication status and roles dynamically with React Router and Context API.
2. **Token Management:**  
   Implementing secure JWT token handling in cookies.
3. **State Management:**  
   Transitioning from Context API to Redux for better scalability.

---

## Future Enhancements
1. **Add a Forgot Password Feature:**
   - Allow users to reset their passwords.
2. **Internationalization:**
   - Support multiple languages for a global audience.
3. **Improved Accessibility:**
   - Add ARIA roles and keyboard navigation support.

---

## Conclusion
This project showcases a robust implementation of a full-stack web application with dynamic routing and role-based access control. It highlights skills in modern frontend and backend technologies and demonstrates the ability to solve real-world problems using React, Node.js, and Express.js.
```

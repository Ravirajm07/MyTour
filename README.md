# MYTOUR - Explore the World

MYTOUR is a full-stack travel agency website project designed to allow users to explore various destinations, view popular tours, read blog posts, book trips, and manage their accounts. The project features a static frontend built with HTML, CSS, and JavaScript, and a backend API built with Node.js, Express, and PostgreSQL.

## Features:

**Frontend:**
* **Header:** Includes navigation links (Home, About Us, Tours, Blog, Contact Us) and buttons for Booking Now and Login.
* **Hero Section:** Highlights the travel agency with a compelling title ("Trusted Travel Agency") and introductory text.
* **Destinations:** Showcases various travel destinations with links to individual pages (e.g., Maldives, Thailand, Malaysia, Nepal, Indonesia).
* **Featured Tours:** Displays popular tour packages with details like duration, price, rating, and location (e.g., Bali, Greek Islands, Japanese Heritage).
* **About Us:** Provides information about the agency's services, including expert tour guides, best value guarantee, 24/7 support, and commitment to sustainable tourism. It also highlights statistics like "10K+ Happy Travelers", "50+ Destinations", and "15+ Years Experience".
* **Blog:** Features the latest news and articles with author details and publish time.
* **Contact Us Page:** A dedicated page for users to send messages to the agency.
* **Modals:** Interactive modals for Login, Sign Up, and Forgot Password functionalities.
* **Notification System:** Provides feedback to the user for actions like login, signup, etc.
* **My Account Page:** (Based on `my-account.html` and `script.js`)
    * User profile display (name, email).
    * Sidebar navigation for different account sections.
    * Functionality to edit profile information.
    * Logout functionality.
* **Booking Functionality:** Users can click "Book Now" or similar buttons to potentially proceed to a booking page (e.g., `booking.html` mentioned in `script.js`).

**Backend (Trip Management System API):**
* **User Authentication:** Handles user registration (signup) and login.
* **User Management:** Routes for user-related operations.
* **Trip Management:** API endpoints for managing trips.
* **Plan Management:** API endpoints for managing travel plans.
* **Booking Management:** API endpoints for handling user bookings.
* **Database:** Uses PostgreSQL for data storage.

## Technologies Used:

**Frontend:**
* HTML5
* CSS3 (including custom properties, Flexbox, Grid)
* JavaScript (for modal functionality, form handling, dynamic content, API interactions)
* Ionicons (for icons)
* Google Fonts

**Backend:**
* Node.js
* Express.js (for routing and middleware)
* PostgreSQL (database)
* `cors` (for enabling Cross-Origin Resource Sharing)
* `dotenv` (for environment variable management)
* `pg` (Node.js PostgreSQL client) (inferred from database.js if pool is from 'pg')

## Project Structure Overview:

* **`tourest-master/`**: Root directory for the frontend.
    * **`index.html`**: Main landing page.
    * **`contact.html`**: Contact Us page.
    * **`my-account.html`**: User account page.
    * Other HTML files for specific destinations/tours (e.g., `bali.html`, `maldives.html`).
    * **`assets/`**: Contains CSS, JavaScript, and image files.
        * **`css/style.css`**: Main stylesheet.
        * **`js/script.js`**: Main JavaScript file for frontend logic.
        * **`images/`**: Contains all images used in the frontend.
* **`tourest-master/Tour and travels/`**: Root directory for the backend.
    * **`server/`**: Contains the backend server code.
        * **`index.js`**: Main entry point for the backend server.
        * **`config/database.js`**: Database configuration.
        * **`routes/`**: Contains route definitions for different API modules (auth, users, trips, plans, bookings).
        * **`middleware/`**: Contains middleware functions (e.g., for authentication).
    * **`database/`**:
        * **`schema.sql`**: SQL schema for creating database tables (users, plans, trips, bookings) and initial data.

## Setup and Installation:

**Prerequisites:**
* Node.js and npm (for backend)
* PostgreSQL server installed and running

**Frontend:**
1.  Clone the repository (or download the files).
2.  Navigate to the `tourest-master/` directory.
3.  Open `index.html` in your web browser.

**Backend:**
1.  Navigate to the `tourest-master/Tour and travels/server/` directory.
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Set up your PostgreSQL database:
    * Create a database.
    * Run the `schema.sql` script to create the necessary tables and insert initial data.
        ```bash
        psql -U your_username -d your_database_name -f ../database/schema.sql
        ```
    * Configure your database connection details in a `.env` file in the `server/` directory (refer to `config/database.js` and `index.js` for required environment variables, e.g., `PORT`, `DB_USER`, `DB_HOST`, `DB_DATABASE`, `DB_PASSWORD`, `DB_PORT`).
4.  Start the server:
    ```bash
    npm start
    ```
    (Assuming a "start" script is defined in `package.json` as `node index.js`. If not, use `node index.js` directly.)
    The server will typically run on `http://localhost:5000` or the port specified in your `.env` file.

## Database Schema Overview:

* **`users` table:** Stores user information including username, email, hashed password, role (admin, traveler), contact details, and activity timestamps.
* **`plans` table:** Stores details about different travel plans like name, description, price, duration, and maximum travelers. Includes default plans: Basic, Standard, Premium, VIP.
* **`trips` table:** Manages specific trips with names, descriptions, start/end dates, associated plan, admin user, status (draft, published, ongoing, completed, cancelled), capacity, and booking counts.
* **`bookings` table:** Links users to trips, storing booking date, status (e.g., pending), payment status, and total amount.

The schema includes indexes for performance and triggers to automatically update `updated_at` timestamps.

## API Endpoints:

The backend server exposes the following API routes (base path `/api`):
* `GET /`: Welcome message for the API.
* `/auth`: Authentication routes (e.g., login, signup).
* `/users`: User management routes.
* `/trips`: Trip management routes.
* `/plans`: Plan management routes.
* `/bookings`: Booking management routes.

(For detailed endpoints, refer to the files in the `tourest-master/Tour and travels/server/routes/` directory.)

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.


This README provides a good starting point. You might want to add more specific details, especially for the setup if there are particularities, and fill in the License section.
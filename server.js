// ./server.js
const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Sample data
let users = [
  { id: 1, name: "John Doe", email: "john@example.com" },
  { id: 2, name: "Jane Smith", email: "jane@example.com" },
];

// Routes
app.get("/", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Cypress Testing App</title>
      <style>
        body { font-family: Arial, sans-serif; margin: 40px; }
        .container { max-width: 800px; margin: 0 auto; }
        h1 { color: #333; }
        .btn { padding: 10px 20px; margin: 10px; background: #007cba; color: white; border: none; cursor: pointer; }
        .btn:hover { background: #005a8b; }
        .form-group { margin: 15px 0; }
        input, textarea { width: 100%; padding: 8px; margin: 5px 0; }
        .user-list { margin: 20px 0; }
        .user-item { padding: 10px; border: 1px solid #ddd; margin: 5px 0; }
        .nav { margin: 20px 0; }
        .nav a { margin-right: 20px; text-decoration: none; color: #007cba; }
        .nav a:hover { text-decoration: underline; }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>Welcome to Cypress Testing App</h1>
        
        <nav class="nav">
          <a href="/">Home</a>
          <a href="/users">Users</a>
          <a href="/contact">Contact</a>
          <a href="/about">About</a>
        </nav>

        <div class="content">
          <p>This is a simple Express app for Cypress testing demonstrations.</p>
          
          <button class="btn" data-cy="get-started-btn" onclick="window.location.href='/users'">
            Get Started
          </button>
          
          <button class="btn" data-cy="demo-btn" onclick="showAlert()">
            Demo Button
          </button>
        </div>

        <div class="features">
          <h2>Features to Test</h2>
          <ul>
            <li>User management (CRUD operations)</li>
            <li>Form submissions</li>
            <li>Navigation between pages</li>
            <li>API endpoints</li>
            <li>Interactive elements</li>
          </ul>
        </div>
      </div>

      <script>
        function showAlert() {
          alert('Demo button clicked!');
        }
      </script>
    </body>
    </html>
  `);
});

app.get("/users", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Users - Cypress Testing App</title>
      <style>
        body { font-family: Arial, sans-serif; margin: 40px; }
        .container { max-width: 800px; margin: 0 auto; }
        h1 { color: #333; }
        .btn { padding: 10px 20px; margin: 10px; background: #007cba; color: white; border: none; cursor: pointer; }
        .btn:hover { background: #005a8b; }
        .btn-danger { background: #dc3545; }
        .btn-danger:hover { background: #c82333; }
        .form-group { margin: 15px 0; }
        input { width: 100%; padding: 8px; margin: 5px 0; }
        .user-list { margin: 20px 0; }
        .user-item { padding: 10px; border: 1px solid #ddd; margin: 5px 0; display: flex; justify-content: space-between; align-items: center; }
        .nav { margin: 20px 0; }
        .nav a { margin-right: 20px; text-decoration: none; color: #007cba; }
        .nav a:hover { text-decoration: underline; }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>User Management</h1>
        
        <nav class="nav">
          <a href="/">Home</a>
          <a href="/users">Users</a>
          <a href="/contact">Contact</a>
          <a href="/about">About</a>
        </nav>

        <div class="add-user-form">
          <h2>Add New User</h2>
          <form id="userForm">
            <div class="form-group">
              <input type="text" id="userName" data-cy="user-name" placeholder="Enter name" required>
            </div>
            <div class="form-group">
              <input type="email" id="userEmail" data-cy="user-email" placeholder="Enter email" required>
            </div>
            <button type="submit" class="btn" data-cy="add-user-btn">Add User</button>
          </form>
        </div>

        <div class="user-list">
          <h2>Users List</h2>
          <div id="usersList" data-cy="users-list">
            ${users
              .map(
                (user) => `
              <div class="user-item" data-cy="user-item-${user.id}">
                <div>
                  <strong>${user.name}</strong> - ${user.email}
                </div>
                <button class="btn btn-danger" onclick="deleteUser(${user.id})" data-cy="delete-user-${user.id}">
                  Delete
                </button>
              </div>
            `
              )
              .join("")}
          </div>
        </div>
      </div>

      <script>
        document.getElementById('userForm').addEventListener('submit', async function(e) {
          e.preventDefault();
          
          const name = document.getElementById('userName').value;
          const email = document.getElementById('userEmail').value;
          
          try {
            const response = await fetch('/api/users', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ name, email })
            });
            
            if (response.ok) {
              location.reload();
            }
          } catch (error) {
            console.error('Error adding user:', error);
          }
        });

        async function deleteUser(userId) {
          try {
            const response = await fetch(\`/api/users/\${userId}\`, {
              method: 'DELETE'
            });
            
            if (response.ok) {
              location.reload();
            }
          } catch (error) {
            console.error('Error deleting user:', error);
          }
        }
      </script>
    </body>
    </html>
  `);
});

app.get("/contact", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Contact - Cypress Testing App</title>
      <style>
        body { font-family: Arial, sans-serif; margin: 40px; }
        .container { max-width: 800px; margin: 0 auto; }
        h1 { color: #333; }
        .btn { padding: 10px 20px; margin: 10px; background: #007cba; color: white; border: none; cursor: pointer; }
        .btn:hover { background: #005a8b; }
        .form-group { margin: 15px 0; }
        input, textarea { width: 100%; padding: 8px; margin: 5px 0; }
        .nav { margin: 20px 0; }
        .nav a { margin-right: 20px; text-decoration: none; color: #007cba; }
        .nav a:hover { text-decoration: underline; }
        .success-message { color: green; padding: 10px; margin: 10px 0; border: 1px solid green; background: #f0fff0; }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>Contact Us</h1>
        
        <nav class="nav">
          <a href="/">Home</a>
          <a href="/users">Users</a>
          <a href="/contact">Contact</a>
          <a href="/about">About</a>
        </nav>

        <div id="successMessage" class="success-message" style="display: none;" data-cy="success-message">
          Thank you for your message! We'll get back to you soon.
        </div>

        <form id="contactForm">
          <div class="form-group">
            <input type="text" id="contactName" data-cy="contact-name" placeholder="Your Name" required>
          </div>
          <div class="form-group">
            <input type="email" id="contactEmail" data-cy="contact-email" placeholder="Your Email" required>
          </div>
          <div class="form-group">
            <textarea id="contactMessage" data-cy="contact-message" placeholder="Your Message" rows="5" required></textarea>
          </div>
          <button type="submit" class="btn" data-cy="submit-contact">Send Message</button>
        </form>
      </div>

      <script>
        document.getElementById('contactForm').addEventListener('submit', function(e) {
          e.preventDefault();
          
          // Simulate form submission
          document.getElementById('successMessage').style.display = 'block';
          document.getElementById('contactForm').reset();
          
          // Hide success message after 3 seconds
          setTimeout(() => {
            document.getElementById('successMessage').style.display = 'none';
          }, 3000);
        });
      </script>
    </body>
    </html>
  `);
});

app.get("/about", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>About - Cypress Testing App</title>
      <style>
        body { font-family: Arial, sans-serif; margin: 40px; }
        .container { max-width: 800px; margin: 0 auto; }
        h1 { color: #333; }
        .nav { margin: 20px 0; }
        .nav a { margin-right: 20px; text-decoration: none; color: #007cba; }
        .nav a:hover { text-decoration: underline; }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>About This App</h1>
        
        <nav class="nav">
          <a href="/">Home</a>
          <a href="/users">Users</a>
          <a href="/contact">Contact</a>
          <a href="/about">About</a>
        </nav>

        <div class="content">
          <p>This is a simple Express.js application created specifically for demonstrating Cypress testing capabilities.</p>
          
          <h2>Features</h2>
          <ul>
            <li>User management with CRUD operations</li>
            <li>Contact form with validation</li>
            <li>Navigation between different pages</li>
            <li>Interactive elements for testing</li>
            <li>RESTful API endpoints</li>
          </ul>

          <h2>Testing Scenarios</h2>
          <p>This app provides various scenarios to test:</p>
          <ul>
            <li>Form submissions and validations</li>
            <li>API calls and responses</li>
            <li>DOM manipulation and interactions</li>
            <li>Navigation and routing</li>
            <li>Data persistence simulation</li>
          </ul>
        </div>
      </div>
    </body>
    </html>
  `);
});

// API Routes
app.get("/api/users", (req, res) => {
  res.json(users);
});

app.post("/api/users", (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: "Name and email are required" });
  }

  const newUser = {
    id: users.length + 1,
    name,
    email,
  };

  users.push(newUser);
  res.status(201).json(newUser);
});

app.delete("/api/users/:id", (req, res) => {
  const userId = parseInt(req.params.id);
  const userIndex = users.findIndex((user) => user.id === userId);

  if (userIndex === -1) {
    return res.status(404).json({ error: "User not found" });
  }

  users.splice(userIndex, 1);
  res.status(204).send();
});

app.get("/api/users/:id", (req, res) => {
  const userId = parseInt(req.params.id);
  const user = users.find((user) => user.id === userId);

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  res.json(user);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app;

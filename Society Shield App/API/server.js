const express = require('express');
const path = require('path');  // Import the 'path' module
const sqlite3 = require("sqlite3").verbose();
const sha256 = require("js-sha256");
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const secretKey = 'your_secret_key';


const app = express();
const port = 3000;

// Middleware to parse JSON request bodies
app.use(express.json());

// If you're handling form data, use this for URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// Define a route for the root URL
app.get('/', (req, res) => {
  res.send('Hello, Express server!');
});

// Start the server
app.listen(port, () => {
  // Fixed template literal syntax for console log
  console.log('Server running on http://localhost:${port}/');
});

// Resolve the path for the SQLite database  C:\Users\User
//const dbPath = path.resolve(__dirname, "societyshielddatabase.db");
const dbPath = path.resolve("C:/Users/User/societyshielddata.db");

// Connect to the SQLite database
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Error connecting to the database", err);
  } else {
    console.log("Connected to the SQLite database");
  }
});


//Login fuction 
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Please provide email and password.' });
    }

    db.get('SELECT * FROM users WHERE email = ?', [email], (err, user) => {
        if (err) {
            console.error('Database error:', err.message); // Log the error for debugging
            return res.status(500).json({ error: 'Database error.' });
        }

        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }

        const hashedPassword = sha256(password);
        
        if (password !== user.password) {
            return res.status(401).json({ error: 'Invalid password.' });
        }

        //Create JWT
        const payload ={
            user_ID: user.userid,
            name: user.firstname,
            surname: user.lastname,
            email: user.email,
            userType: user.role,
        };


        const token = jwt.sign(payload,secretKey, {expiresIn: '1h'});

        res.json({
            message: 'Login successful!',
            token,
            user: payload

        });
    });
});

  


// Reset Password function
app.post('/resetpassword', (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ error: 'Please provide your email.' });
    }

    try {
        // Check if user exists in the database
        db.get('SELECT * FROM users WHERE email = ?', [email], async (err, user) => {
            if (err) {
                console.error('Database error:', err.message);
                return res.status(500).json({ error: 'Database error.' });
            }

            if (!user) {
                return res.status(404).json({ error: 'User not found.' });
            }

            // Generate reset token (you could hash this or use a more secure method)
            const resetToken = Math.random().toString(36).substring(2, 8); // Simple token for example purposes

            // Send email with reset token using nodemailer
            const transporter = nodemailer.createTransport({
                service: 'gmail', // You can use any service (e.g., Gmail, Yahoo)
                auth: {
                    user: process.env.EMAIL_USER, // Environment variables for security
                    pass: process.env.EMAIL_PASS,
                },
            });

            const mailOptions = {
                from: process.env.EMAIL_USER,
                to: email,
                subject: 'Password Reset Request',
                text: `Your password reset token is: ${resetToken}`,
            };

            // Send email
            await transporter.sendMail(mailOptions);

            // Respond with success message
            res.json({ message: 'Password reset token sent to your email.' });
        });

    } catch (err) {
        console.error('Server error:', err);
        res.status(500).json({ error: 'Server error.' });
    }
});


// Register society member
app.post('/addmember', (req, res) => {
  const { firstname, lastname, idnumber, email, phonenumber, homeaddress, password } = req.body;

  if (!firstname || !lastname || !idnumber || !email || !phonenumber || !homeaddress || !password) {
    return res.status(400).json({ error: 'Please provide all required fields.' });
  }


  // Check if the email already exists in the database
  db.get('SELECT * FROM users WHERE email = ?', [email], (err, user) => {
    if (err) {
      console.error('Database error:', err.message);
      return res.status(500).json({ error: 'Database error.' });
    }

    if (user) {
      return res.status(409).json({ error: 'Email is already registered.' });
    }

    // Hash the password
    const hashedPassword = sha256(password).toString();
    const joinDate = new Date().toISOString().split('T')[0]; // Current date in YYYY-MM-DD format
    const role = 'Member'; // Set role to Member

    // Insert the new member into the database
    db.run('INSERT INTO users (firstname, lastname, idnumber, email, phonenumber, homeaddress, password, joindate, role) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', 
      [firstname, lastname, idnumber, email, phonenumber, homeaddress, hashedPassword, joinDate, role], 
      function(err) {
        if (err) {
          console.error('Error inserting member:', err.message);
          return res.status(500).json({ error: 'Error adding member to database.' });
        }

        // Create JWT token for the newly added member
       // const payload = {
       //   user_ID: this.lastID, // Get the ID of the newly inserted member
        //  name: firstname,
        //  surname: lastname,
        //  email: email,
        //  userType: role,
        //};

        //const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });

        res.json({
          message: 'Member registered successfully!',
         // token,
         // user: payload
        });
      }
    );
  });
});


// Register society member
app.post('/addmonth', (req, res) => {
    const { monthname, duedate} = req.body;
  
    if (!monthname || !duedate) {
      return res.status(400).json({ error: 'Please provide all required fields.' });
    }
  
  
    // Check if the month already exists in the database
    db.get('SELECT * FROM months WHERE monthname = ?', [monthname], (err, month) => {
      if (err) {
        console.error('Database error:', err.message);
        return res.status(500).json({ error: 'Database error.' });
      }
  
      if (month) {
        return res.status(409).json({ error: 'month is already registered.' });
      }

      // Insert the new member into the database
      db.run('INSERT INTO months (monthname, duedate) VALUES (?, ?)', 
        [monthname, duedate], 
        function(err) {
          if (err) {
            console.error('Error inserting member:', err.message);
            return res.status(500).json({ error: 'Error adding member to database.' });
          }
  
          res.json({
            message: 'Month added successfully!',

          });
        }
      );
    });
  });


  //Edit member function used by Admin
  app.put('/admin/editmonth/:monthid', (req, res) => {
    const monthid = req.params.monthid;
    const { duedate } = req.body;
  
    db.run('UPDATE months SET duedate = ? WHERE id = ?', [duedate, monthid], function(err) {
      if (err) {
        console.error('Database error:', err.message);
        return res.status(500).json({ error: 'Error updating month.' });
      }
  
      res.json({ message: 'Month updated successfully.' });
    });
  });
  


//Get all members
app.get('/admin/members', (req, res) => {
  db.all('SELECT * FROM users WHERE role = "Member"', (err, members) => {
    if (err) {
      console.error('Database error:', err.message);
      return res.status(500).json({ error: 'Error retrieving members.' });
    }

    res.json({ members });
  });
});



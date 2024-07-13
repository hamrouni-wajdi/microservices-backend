const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const login = async (req,res)=>{
    console.log("login user ===============================")
  
      try {
          const { username, password } = req.body;
          const user = await User.findOne({ where: { username } });
          if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
          }   
          // Compare the entered password with the hashed password in the database
          const hashedPassword = await bcrypt.hash(password, 10);
          const passwordMatch = await bcrypt.compare(password, user.dataValues.password);
      
          if (!passwordMatch) {
  
            return res.status(401).json({ error: 'Invalid credentials' });
          }   
          // Generate a JWT token
          const token = jwt.sign({ userId: user.id, username: user.username }, 'your-secret-key', {
            expiresIn: '1h',
          });
          res.json({ user, token });
        } catch (error) {
          console.error('Login failed', error.message);
          res.status(500).json({ error: 'Login failed' });
        }
  }

  const register = async (req,res)=>{
    console.log("register user ===============================")
  
      try {
          const { username, email, password, firstname,lastname } = req.body;
      
          // Hash the password before saving it to the database
          const hashedPassword = await bcrypt.hash(password, 10);
      
          const user = await User.create({
            username,
            email,
            firstname,
            lastname,
            password: hashedPassword,
            address,
            phone
          });
      
          res.status(201).json({ user });
        } catch (error) {
          console.error('Registration failed', error.message);
          res.status(500).json({ error: 'Registration failed' });
        }
  }
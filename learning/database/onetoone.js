// User profile information - 
// where each user has one profile document that stores additional information about them, 
// such as their profile picture, bio, and contact information.

// Product options - 
// where each product has one options document that stores additional information about the product, 
// such as its color, size, and material.

// Employee and employment information - 
// where each employee has one employment document that stores information about their employment, 
// such as their start date, salary, and job title.
// user schema
const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    profile: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Profile'
    }
  });
  
  // profile schema
  const profileSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    bio: String,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  });

  
// create user route
app.post('/users', async (req, res) => {
    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    });
  
    try {
      const savedUser = await user.save();
      res.send(savedUser);
    } catch (err) {
      res.status(400).send(err);
    }
  });
  
  // create profile route
  app.post('/profiles', async (req, res) => {
    const profile = new Profile({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      bio: req.body.bio,
      user: req.body.userId
    });
  
    try {
      const savedProfile = await profile.save();
      res.send(savedProfile);
    } catch (err) {
      res.status(400).send(err);
    }
  });

  app.get('/users/:userId', async (req, res) => {
    try {
      const user = await User.findById(req.params.userId).populate('profile');
      res.send(user);
    } catch (err) {
      res.status(400).send(err);
    }
  });
  
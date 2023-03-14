// Address and user - 
// where each user has an address, and the address is always accessed with the user document.

// Orders and line items - 
// where each order has line items, and the line items are always accessed with the order document.

// Recipe and ingredients - 
// where each recipe has ingredients, and the ingredients are always accessed with the recipe document.
// user schema
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    posts: [{
      title: String,
      content: String
    }]
  });

// create user route
app.post('/users', async (req, res) => {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      posts: req.body.posts
    });
  
    try {
      const savedUser = await user.save();
      res.send(savedUser);
    } catch (err) {
      res.status(400).send(err);
    }
  });

// get all posts for user route
app.get('/users/:userId/posts', async (req, res) => {
    try {
      const user = await User.findById(req.params.userId);
      res.send(user.posts);
    } catch (err) {
      res.status(400).send(err);
    }
  });
  
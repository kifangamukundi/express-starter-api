// Blog posts and comments - 
// where each blog post can have multiple comments.

// Orders and order items - 
// where each order can have multiple order items.

// Customer and invoices - 
// where each customer can have multiple invoices.
// user schema
const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    posts: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post'
    }]
  });
  
  // post schema
  const postSchema = new mongoose.Schema({
    title: String,
    content: String,
    author: {
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
  
  // create post route
  app.post('/posts', async (req, res) => {
    const post = new Post({
      title: req.body.title,
      content: req.body.content,
      author: req.body.userId
    });
  
    try {
      const savedPost = await post.save();
      const user = await User.findById(req.body.userId);
      user.posts.push(savedPost);
      await user.save();
      res.send(savedPost);
    } catch (err) {
      res.status(400).send(err);
    }
  });

  app.get('/users/:userId/posts', async (req, res) => {
    try {
      const user = await User.findById(req.params.userId).populate('posts');
      res.send(user.posts);
    } catch (err) {
      res.status(400).send(err);
    }
  });
  
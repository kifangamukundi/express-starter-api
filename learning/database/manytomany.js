// Books and authors - 
// where each book can have multiple authors, and each author can have multiple books.

// Courses and students - 
// where each course can have multiple students, and each student can enroll in multiple courses.

// Blog posts and tags - 
// where each blog post can have multiple tags, and each tag can be associated with multiple blog posts.
// user schema
const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    groups: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Group'
    }]
  });
  
  // group schema
  const groupSchema = new mongoose.Schema({
    name: String,
    members: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }]
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
  
  // create group route
  app.post('/groups', async (req, res) => {
    const group = new Group({
      name: req.body.name,
      members: req.body.members
    });
  
    try {
      const savedGroup = await group.save();
      for (const memberId of req.body.members) {
        const user = await User.findById(memberId);
        user.groups.push(savedGroup);
        await user.save();
      }
      res.send(savedGroup);
    } catch (err) {
      res.status(400).send(err);
    }
  });

  
// get groups for user route
app.get('/users/:userId/groups', async (req, res) => {
    try {
      const user = await User.findById(req.params.userId).populate('groups');
      res.send(user.groups);
    } catch (err) {
      res.status(400).send(err);
    }
  });
  
  // get members of group route
  app.get('/groups/:groupId/members', async (req, res) => {
    try {
      const group = await Group.findById(req.params.groupId).populate('members');
      res.send(group.members);
    } catch (err) {
      res.status(400).send(err);
    }
  });
  
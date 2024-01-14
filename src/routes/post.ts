// Packages
import express from 'express';

// Project
import { Post } from '../models/post';
import { Comment } from '../models/comment';
import { ProtectedRoute } from '../middlewares';
import { Blogger } from '../models/blogger';
import { Sequelize } from 'sequelize';


const router = express.Router();


router.post('/', ProtectedRoute, async (req, res) => {
  const { content } = req.body;

  if (!content) {
    res.status(400).send({ message: "You must provide a content." });
    return
  };

  try {
    const newPost = await Post.create({ content, blogger_id: req.user.id });
    const serializedPost = newPost.toJSON();

    res.send(serializedPost);
    return
  } catch (err) {
    res.status(500).send({ message: err });
    return
  }
});

router.get('/', async (req, res) => {
  // @ts-ignore
  const offset = req.query.offset ? parseInt(req.query.offset) : 0
  // @ts-ignore
  const limit = req.query.limit ? parseInt(req.query.limit) : 10
  
  
  try {
    const posts = await Post.findAll({ 
      offset, 
      limit, 
      order: [['id', 'DESC']],
      include: [
        {
          model: Blogger,
          as: "blogger"
        },
        {
          model: Comment, 
          as: "comments"
        }
      ],
    });

    const serializedPosts = posts.map(post => post.toJSON());

    res.send(serializedPosts);
    return
  } catch (err) {
    res.status(500).send({ message: err });
    return
  }
})

router.get('/:postId', async (req, res) => {
  const { postId } = req.params;

  if (!postId) {
    res.status(400).send({ message: "You must provide a postId." });
    return
  };

  try {
    const post = await Post.findByPk(postId, {
      include: [
        {
          model: Comment,
          as: "comments",
          order: [
            ['id', 'DESC']
          ],
          include: [
            {
              model: Blogger,
              as: "blogger"
            }
          ]
        },
        {
          model: Blogger,
          as: "blogger"
        }
      ]
    });

    if (!post) {
      res.status(404).send({ message: "Post not found "});
      return
    }

    const serializedPost = post.toJSON();

    res.send(serializedPost);
    return
  } catch (err) {
    res.status(500).send({ message: err });
    return
  }
});

router.delete('/:postId', ProtectedRoute, async (req, res) => {
  const { postId } = req.params;

  if (!postId) {
    res.status(400).send({ message: "You must provide a postId." });
    return
  };

  try {
    const post = await Post.findByPk(postId);

    if (!post) {
      res.status(404).send({ message: "Post not found "});
      return
    }

    const serializedPost = post.toJSON();

    if (serializedPost.blogger_id != req.user.id) {
      res.status(403).send({ message: "This post doesn't belongs you."});
      return
    }
    await post.destroy()

    res.sendStatus(200);
    return
  } catch (err) {
    res.status(500).send({ message: err });
    return
  }
});

router.patch('/:postId', ProtectedRoute, async (req, res) => {
  const { postId } = req.params;
  const { content } = req.body;

  if (!postId) {
    res.status(400).send({ message: "You must provide a postId." });
    return
  };

  if (!content) {
    res.status(400).send({ message: "You must provide a content." });
    return
  };

  try {
    const post = await Post.findByPk(postId);
    
    if (!post) {
      res.status(404).send({ message: "Post not found"});
      return
    }

    const serializedPost = post.toJSON();

    if (serializedPost.blogger_id != req.user.id) {
      res.status(403).send({ message: "This post doesn't belongs you."});
      return
    }
    
    post.set('content', content);
    post.save()

    res.sendStatus(200);
    return
  } catch (err) {
    res.status(500).send({ message: err });
    return
  }
});

// PERFIL

router.get('/profile/:username', async (req, res) => {
  const { username } = req.params;

  if (!username) {
    res.status(400).send({ message: "You must provide a username." });
    return
  };

  try {
    const posts = await Post.findAll({
      include: [
        {
          model: Comment,
          as: "comments",
          order: [
            ['id', 'DESC']
          ]
        },
        {
          model: Blogger,
          as: "blogger",
          where: {
            username
          }
        }
      ]
    });

    if (!posts) {
      res.status(404).send({ message: "Post not found "});
      return
    }

    const serializedPosts = posts.map(post => post.toJSON())

    res.send(serializedPosts);
    return
  } catch (err) {
    res.status(500).send({ message: err });
    return
  }
});

// COMENTARIOS AQUI

router.post('/:postId/comment', ProtectedRoute, async (req, res) => {
  const { postId } = req.params;
  const { content } = req.body;

  if (!postId) {
    res.status(400).send({ message: "You must provide a postId." });
    return
  };

  if (!content) {
    res.status(400).send({ message: "You must provide a content." });
    return
  };

  try {
    const post = await Post.findByPk(postId);

    if (!post) {
      res.status(404).send({ message: "Post not found "});
      return
    }

    const newComment = await Comment.create({ content, post_id: postId, blogger_id: req.user.id,});
    const serializedComment = newComment.toJSON();
    
    const createdComment = await Comment.findByPk(serializedComment.id, {
      include: [
        {
          model: Blogger,
          as: "blogger"
        }
      ]
    });

    if(!createdComment) {
      res.status(404).send({ message: "Cant find recent created comment" });
      return
    }

    const serializedCreatedComment = createdComment.toJSON();

    res.send(serializedCreatedComment);
    return
  } catch (err) {
    res.status(500).send({ message: err });
    return
  }
});

export default router;

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();



async function store(req, res) {
    
    const inputData = req.body;
  
    const newPost = await prisma.post.create({
      data: {
        slug: inputData.slug,
        image: inputData.image,
        content: inputData.content,
        published: inputData.published,
        createdAt: inputData.createdAt,
        updatedAt: inputData.updatedAt
      }
    })
  
    return res.json(newPost);
  }


module.exports = {
    // index,
    // show,
    store,
    // update,
    // destroy,
  };
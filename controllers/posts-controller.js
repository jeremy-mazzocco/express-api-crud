const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();



async function search(req, res) {
    const { keyword } = req.query;

    const data = await prisma.post.findMany({
        where: {
            published: true,
            OR: [
                {
                    slug: {
                        contains: keyword || "",
                    },
                },
                {
                    content: {
                        contains: keyword || "",
                    },
                },
            ],
        },
    });

    if (!data) {
        throw new Error("Not found");
    }

    return res.json(data);
}



async function show(req, res) {
    const { slug } = req.params;

    const data = await prisma.post.findUnique({
        where: {
            slug: slug,
        },
    });

    if (!data) {
        throw new Error("Not found");
    }

    return res.json(data);
}



async function store(req, res) {
    try {
        const inputData = req.body;

        const newPost = await prisma.post.create({
            data: {
                slug: inputData.slug,
                image: inputData.image,
                content: inputData.content,
                published: inputData.published,
                createdAt: inputData.createdAt,
                updatedAt: inputData.updatedAt,
            },
        });

        return res.json(newPost);
    } catch (error) {
        return res.status(500).json({ error: "Errore durante la creazione del post" });
    }
}



async function update(req, res) {
    const { slug } = req.params;
    const inputData = req.body;

    const findPost = await prisma.post.update({
        where: {
            slug: slug,
        }
    });

    if (!findPost) {
        throw new Error('Not found');
    }

    const updatedPost = await prisma.pizza.update({
        data: inputData,
        where: {
            slug: slug,
        },
    })

    return res.json(updatedPost)
}



async function destroy(req, res) {
    await prisma.post.delete({
        where: {
            slug: slug,
        }
    });

    return res.json({ message: "Post deleted" });
}


module.exports = {
    search,
    show,
    store,
    update,
    destroy
};
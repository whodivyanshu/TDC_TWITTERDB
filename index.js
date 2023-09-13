import express from "express";
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();
const app = express();

app.use(express.json());

app.get("/users", async (req, res) => {
    try {
        const users = await prisma.users.findMany();
        res.send(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while fetching users." });
    }
});

app.post("/users", async (req, res) => {
    console.log("request", req.body)
    try {
        if (!req.body) {
            throw new Error("Request body is empty or not valid JSON.");
        }

        const newUser = await prisma.users.create({
            data: {
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                profile_picture: req.body.profile_picture,
                bio: req.body.bio,
                location: req.body.location,
                follower_count: req.body.follower_count,
                following_count: req.body.following_count,
            },
        });
        res.json(newUser);
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: "Invalid JSON data in the request body." });
    }
});

app.put("/users/:id", async (req, res) => {
    try {
        const updatedUser = await prisma.users.update({
            where: {
                id: parseInt(req.params.id),
            },
            data: {
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                profile_picture: req.body.profile_picture,
                bio: req.body.bio,
                location: req.body.location,
                follower_count: req.body.follower_count,
                following_count: req.body.following_count,
            },
        });
        res.json(updatedUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while updating the user." });
    }
}
);

app.delete("/users/:id", async (req, res) => {
    try {
        const deletedUser = await prisma.users.delete({
            where: {
                id: parseInt(req.params.id),
            },
        });
        res.json(deletedUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while deleting the user." });
    }
}
);

app.get("/tweets", async (req, res) => {
    try {
        const tweets = await prisma.tweets.findMany();
        res.send(tweets);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while fetching tweets." });

    }


});


app.post("/tweets", async (req, res) => {
    console.log("request", req.body)
    try {
        if (!req.body) {
            throw new Error("Request body is empty or not valid JSON.");
        }




        const newTweet = await prisma.tweets.create({
            data: {
                users: {
                    connect: { id: req.body.id }
                },
                tweet_content: req.body.tweet_content,
                like_count: req.body.like_count,
                retweetcount: req.body.retweet_count,

            }
        });
        res.json(newTweet);

    } catch (error) {
        console.error(error);
        res.status(400).json({ error: "Invalid JSON data in the request body." });
    }
});

app.put("/tweets/:id", async (req, res) => {
    try {
        const updatedTweet = await prisma.tweets.update({
            where: {
                id: parseInt(req.params.id),
            },
            data: {
                tweet_content: req.body.tweet_content,
                like_count: req.body.like_count,
                retweet_count: req.body.retweet_count,
            },
        });
        res.json(updatedTweet);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while updating the tweet." });
    }
}
);

app.delete("/tweets/:id", async (req, res) => {
    try {
        const deletedTweet = await prisma.tweets.delete({
            where: {
                id: parseInt(req.params.id),
            },
        });
        res.json(deletedTweet);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while deleting the tweet." });
    }
}

);


app.listen(3000, () => {
    console.log("Server started at port 3000");
})
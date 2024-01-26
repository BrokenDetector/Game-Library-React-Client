// src/mocks/handlers.js
import { HttpResponse, http } from "msw";

const handlers = [
    // Developers
    http.get("https://game-library-api-gsub.onrender.com/api/developers", () => {
        return HttpResponse.json({
            title: "Developers",
            allDevelopers: [
                { name: "Ubisoft Montreal" },
                { name: "Innersloth" },
                { name: "test dev" },
                { name: "Nintendo" },
                { name: "Mojang" },
            ],
        });
    }),
    http.get("https://game-library-api-gsub.onrender.com/api/developer/Innersloth", () => {
        return HttpResponse.json({
            title: "Developer",
            developer: { name: "Innersloth" },
            allGamesFromDeveloper: [{ title: "Among Us" }],
        });
    }),

    http.get("https://game-library-api-gsub.onrender.com/api/developer/Noname", () => {
        return HttpResponse.json({
            title: "Developer",
            developer: { name: "Noname" },
            allGamesFromDeveloper: [],
        });
    }),

    http.get("https://game-library-api-gsub.onrender.com/api/developer/Innersloth/delete", () => {
        return HttpResponse.json({
            title: "Delete Developer",
            developer: { name: "Innersloth" },
            allGamesFromDeveloper: [{ title: "Among Us" }],
        });
    }),

    http.get("https://game-library-api-gsub.onrender.com/api/developer/Noname/delete", () => {
        return HttpResponse.json({
            title: "Delete Developer",
            developer: { name: "Noname" },
            allGamesFromDeveloper: [],
        });
    }),

    http.get("https://game-library-api-gsub.onrender.com/api/developer/Innersloth/update", () => {
        return HttpResponse.json({
            developer: {
                name: "Innersloth",
            },
            title: "Update Developer",
        });
    }),

    http.get("https://game-library-api-gsub.onrender.com/api/developer/random", () => {
        return HttpResponse.json({
            message: "Developer Not Found",
        });
    }),

    http.get("https://game-library-api-gsub.onrender.com/api/developer/create", () => {
        return HttpResponse.json({
            title: "Create Developer",
        });
    }),

    http.get("https://game-library-api-gsub.onrender.com/api/developer/Mojang/update", () => {
        return HttpResponse.json({
            developer: {
                name: "Mojang",
            },
            title: "Update Developer",
        });
    }),

    http.post("https://game-library-api-gsub.onrender.com/api/developer/create", async ({ request }) => {
        const requestBody = await request.json();
        if (requestBody.name === "create") {
            return HttpResponse.json({ message: "Invalid developer name" });
        } else if (requestBody.name.length < 2) {
            return HttpResponse.json([{ msg: "Name must not be empty and have at least 2 symbols" }]);
        } else {
            return HttpResponse.json({
                developer: {
                    name: "New Developer",
                },
            });
        }
    }),

    // Games
    http.get("https://game-library-api-gsub.onrender.com/api/game/minecraft", () => {
        return HttpResponse.json({
            title: "Game",
            game: { title: "minecraft", developer: { name: "Mojang" }, genre: { name: "Sandbox" } },
        });
    }),

    http.get("https://game-library-api-gsub.onrender.com/api/game/minecraft/delete", () => {
        return HttpResponse.json({
            title: "Delete Game",
            game: { title: "minecraft" },
        });
    }),

    http.get("https://game-library-api-gsub.onrender.com/api/game/minecraft/update", () => {
        return HttpResponse.json({
            game: { title: "minecraft", developer: { name: "mojang", _id: "5" }, genre: { name: "sandbox", _id: "4" } },

            title: "Update Game",
            allDevelopers: [
                { name: "Ubisoft Montreal", _id: "1" },
                { name: "Innersloth", _id: "2" },
                { name: "test dev", _id: "3" },
                { name: "Nintendo", _id: "4" },
                { name: "Mojang", _id: "5" },
            ],
            allGenres: [
                { name: "sport", _id: "1" },
                { name: "RPG", _id: "2" },
                { name: "party", _id: "3" },
                { name: "sandbox", _id: "4" },
            ],
        });
    }),

    http.get("https://game-library-api-gsub.onrender.com/api/game/random", () => {
        return HttpResponse.json({
            message: "Game Not Found",
        });
    }),

    http.get("https://game-library-api-gsub.onrender.com/api/game/create", () => {
        return HttpResponse.json({
            title: "Create Game",
            allDevelopers: [
                { name: "Ubisoft Montreal", _id: "1" },
                { name: "Innersloth", _id: "2" },
                { name: "test dev", _id: "3" },
                { name: "Nintendo", _id: "4" },
                { name: "Mojang", _id: "5" },
            ],
            allGenres: [
                { name: "sport", _id: "1" },
                { name: "RPG", _id: "2" },
                { name: "party", _id: "3" },
                { name: "sandbox", _id: "4" },
            ],
        });
    }),

    http.post("https://game-library-api-gsub.onrender.com/api/game/create", async ({ request }) => {
        const formData = await request.formData();
        const title = formData.get("title");
        if (title === "create") {
            return HttpResponse.json({ message: "Invalid game name" });
        } else if (title.length < 2) {
            return HttpResponse.json({ message: "Name must not be empty and have at least 2 symbols" });
        } else {
            return HttpResponse.json({
                game: {
                    title: "New Game",
                },
                developer: {
                    _id: "1",
                },
            });
        }
    }),

    http.get("https://game-library-api-gsub.onrender.com/api/games", () => {
        return HttpResponse.json({
            title: "Games",
            allGames: [
                { title: "Minecraft", _id: "1" },
                { title: "FIFA", _id: "2" },
                { title: "some game", _id: "3" },
                { title: "GTA", _id: "4" },
                { title: "Fortnite", _id: "5" },
            ],
        });
    }),

    // Genres
    http.get("https://game-library-api-gsub.onrender.com/api/genre/sport", () => {
        return HttpResponse.json({
            title: "Genre",
            gamesInGenre: [{ title: "FIFA" }],
            genre: { name: "sport" },
        });
    }),

    http.get("https://game-library-api-gsub.onrender.com/api/genre/action", () => {
        return HttpResponse.json({
            title: "Genre",
            gamesInGenre: [],
            genre: { name: "action" },
        });
    }),

    http.get("https://game-library-api-gsub.onrender.com/api/genre/action/delete", () => {
        return HttpResponse.json({
            title: "Delete Genre",
            genre: { name: "sport" },
            gamesInGenre: [],
        });
    }),

    http.get("https://game-library-api-gsub.onrender.com/api/genre/sport/delete", () => {
        return HttpResponse.json({
            title: "Delete Genre",
            genre: { name: "sport" },
            gamesInGenre: [{ title: "FIFA", imageUrl: "blank.png" }],
        });
    }),

    http.get("https://game-library-api-gsub.onrender.com/api/genre/sport/update", () => {
        return HttpResponse.json({
            genre: {
                name: "sport",
            },
            title: "Update Genre",
        });
    }),

    http.get("https://game-library-api-gsub.onrender.com/api/genre/random", () => {
        return HttpResponse.json([
            {
                message: "Genre Not Found",
            },
        ]);
    }),

    http.get("https://game-library-api-gsub.onrender.com/api/genre/create", () => {
        return HttpResponse.json({
            title: "Create Genre",
        });
    }),

    http.post("https://game-library-api-gsub.onrender.com/api/genre/create", async ({ request }) => {
        const requestBody = await request.json();
        if (requestBody.name === "create") {
            return HttpResponse.json({ message: "Invalid genre name" });
        } else if (requestBody.name.length < 2) {
            return HttpResponse.json([{ message: "Name must not be empty and have at least 2 symbols" }]);
        } else {
            return HttpResponse.json({
                genre: {
                    name: "New Genre",
                },
            });
        }
    }),

    http.get("https://game-library-api-gsub.onrender.com/api/genres", () => {
        return HttpResponse.json({
            title: "Genres",
            allGenres: [{ name: "sport" }, { name: "Action RPG" }, { name: "sandbox" }],
        });
    }),
];

export { handlers };

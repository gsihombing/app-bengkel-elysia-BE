import { Elysia } from "elysia";


const routerBooks = new Elysia({prefix: "/books"});


routerBooks.get("/", () => {
    return {
        success: true,
        message: "From Router Books"
    }
})

export default routerBooks;
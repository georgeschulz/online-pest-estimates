export const endpoint = 
    process.env.NODE_ENV === "production"
        ? "https://onlinepestestimates.herokuapp.com"
        : "http://localhost:4000";
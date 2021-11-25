const express = require("express");

const vidly = express();
const port = process.env.PORT || 5000;
vidly.use(express.json());

const movies = [
  { id: 1, name: "Godzilla vs Kong" },
  { id: 2, name: "Fast and Furious 7" },
  { id: 3, name: "The croods" },
  { id: 4, name: "Joker" },
];

vidly.get("/api/movies", (req, res) => {
  res.send(movies);
});

//for creating data
vidly.post("/api/movies/:id", (req, res) => {
  if (!req.body.name || req.body.name.length < 6)
    //bad request
    return res
      .status(400)
      .send("Name is required and should be at least 6 character long");

  const movie = {
    id: movies.length + 1,
    name: req.body.name,
  };
  movies.push(movie);
  res.send(movie);
});

vidly.put("/api/movies/:id", (req, res) => {
  const movie = movies.find((m) => m.id === parseInt(req.params.id));
  if (!movie) return res.status(400).send("Please enter the valid id of movie");

  if (!req.body.name || req.body.name.length < 6)
    //bad request
    return res
      .status(400)
      .send("Name is required and should be at least 6 character long");

  movie.name = req.body.name;
  res.send(movie);
});

vidly.delete("/api/movies/:id", (req, res) => {
  const movie = movies.find((m) => m.id === parseInt(req.params.id));
  if (!movie) return res.status(400).send("Please enter the valid id of movie");
  const index = movies.indexOf(movie);
  movies.splice(index, 1);
  res.send(movie);
});

//for getting data
vidly.get("/api/movies/:id", (req, res) => {
  const movie = movies.find((m) => m.id === parseInt(req.params.id));
  if (!movie) return res.status(400).send("Please enter the valid id of movie");
  res.send(movie);
});

vidly.listen(port, () => {
  console.log(`Server is listening to the port ${port}....`);
});

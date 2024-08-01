const express = require("express");
const router = express.Router();
const Movie = require("../models/movie");

// GET movies with pagination
router.get("/", async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10; // Number of movies to retrieve
    const page = parseInt(req.query.page) || 1; // Current page
    const skip = (page - 1) * limit; // Calculate number of documents to skip

    const movies = await Movie.find().skip(skip).limit(limit);
    res.json(movies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET a movie by ID
router.get("/:id", async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).json({ message: "Movie not found" });
    res.json(movie);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new movie
router.post("/", async (req, res) => {
  const movie = new Movie({
    plot: req.body.plot,
    genres: req.body.genres,
    runtime: req.body.runtime,
    cast: req.body.cast,
    num_mflix_comments: req.body.num_mflix_comments,
    title: req.body.title,
    fullplot: req.body.fullplot,
    languages: req.body.languages,
    released: req.body.released,
    directors: req.body.directors,
    rated: req.body.rated,
    awards: req.body.awards,
    lastupdated: req.body.lastupdated,
    year: req.body.year,
    imdb: req.body.imdb,
    countries: req.body.countries,
    type: req.body.type,
    tomatoes: req.body.tomatoes,
  });

  try {
    const newMovie = await movie.save();
    res.status(201).json(newMovie);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT (update) a movie by ID
router.put("/:id", async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).json({ message: "Movie not found" });

    Object.assign(movie, req.body);
    await movie.save();
    res.json(movie);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE a movie by ID
router.delete("/:id", async (req, res) => {
  try {
    const movie = await Movie.findByIdAndDelete(req.params.id);
    if (!movie) return res.status(404).json({ message: "Movie not found" });
    res.json({ message: "Movie deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

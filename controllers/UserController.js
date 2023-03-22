const User = require("../models/UserModel");
module.exports.addToLikeMovies = async (req, res) => {
  try {
    const { email, data } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      const { likedMovies } = user;
      const moviesAlreadyLiked = likedMovies.find(({ id }) => id === data.id);
      if (!moviesAlreadyLiked) {
        await User.findByIdAndUpdate(
          user._id,
          {
            likedMovies: [...user.likedMovies, data],
          },
          { new: true }
        );
      } else {
        return res.json({ msg: "This movie is already in the list" });
      }
    } else {
      await User.create({ email, likedMovies: [data] });
      return res.json({ msg: "Movies added successfully" });
    }
  } catch (err) {
    return res.json({ msg: "Error in adding Movie" });
  }
};

module.exports.getLikedMovies = async (req, res) => {
  console.log(req.body)
  try {
    const { email } = req.params;
    const user = await User.findOne({ email });
    if (user) {
      res.json({ msg: "success", movies: user.likedMovies });
    } else {
      return res.json({ message: "User with given email is not found" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports.removeFromLikedMovies = async (req, res) => {
  try {
    const { email, movieId } = req.body;
    const user = await User.findOne({ email });
    console.log(req.body);
    if (user) {
      const movies = user.likedMovies;
      const movieIndex = movies.findIndex(({ id }) => id === movieId);
      if (!movieIndex) {
        res.status(400).send({ msg: "Movie not found" });
      }
      movies.splice(movieIndex, 1);

      await User.findByIdAndUpdate(
        user._id,
        {
          likedMovies: movies,
        },
        { new: true }
      );
      return res.json({ msg: "Movie successfully deleted", movies });
    } else {
      return res.json({ msg: "User with given email not found" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  } 
};

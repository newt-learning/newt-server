const userDbConn = require("../connections/usersDbConn");
const requireLogin = require("../middleware/requireLogin");

const Playlist = userDbConn.model("playlists");
const Content = userDbConn.model("content");

module.exports = (app) => {
  // GET request to fetch all of a user's playlists
  app.get("/api/playlists", requireLogin, async (req, res) => {
    const userId = req.user.uid;

    Playlist.find({ _user: userId }, (error, playlists) => {
      if (error) {
        res.status(500).send(error);
      } else {
        res.send(playlists);
      }
    });
  });

  // GET request to fetch individual playlist by id
  app.get("/api/playlists/:playlistId", requireLogin, (req, res) => {
    const { playlistId } = req.params;

    Playlist.findById(playlistId)
      .populate({ path: "content", model: Content })
      .exec((error, playlist) => {
        if (error) {
          res.status(500).send(error);
        } else {
          res.send(playlist);
        }
      });
  });

  // POST request to create a playlist
  app.post("/api/playlists/create", requireLogin, async (req, res) => {
    try {
      const data = req.body;
      // Add user id and dates to data object
      data._user = req.user.uid;
      data.dateAdded = Date.now();
      data.lastUpdated = Date.now();

      // Create Topic, save to database and send back to client
      const playlist = new Playlist(data);
      await playlist.save();
      res.send(playlist);
    } catch (error) {
      res.status(500).send(error);
    }
  });

  // PUT request to edit a playlist
  app.put("/api/playlists/:playlistId/update", requireLogin, (req, res) => {
    const { playlistId } = req.params;
    const data = req.body;
    // Set lastUpdated field to now
    data.lastUpdated = Date.now();

    // Find playlist by id and update
    Playlist.findByIdAndUpdate(
      playlistId,
      data,
      { new: true },
      (error, playlist) => {
        if (error) {
          res.status(500).send(error);
        } else {
          res.send(playlist);
        }
      }
    );
  });

  // PUT request to add content (contentId) to multiple playlists
  app.put("/api/playlists/add-content", requireLogin, (req, res) => {
    const { playlistIds, contentId } = req.body;

    // First argument matches _ids in the playlistIds array, second argument pushes
    // the contentId to those matched playlists
    Playlist.updateMany(
      { _id: { $in: playlistIds } },
      { $push: { content: contentId } },
      (error) => {
        if (error) {
          res.status(500).send(error);
        } else {
          res.sendStatus(200);
        }
      }
    );
  });

  // PUT request to remove content (contentId) from multiple playlists
  app.put("/api/playlists/remove-content", requireLogin, (req, res) => {
    const { playlistIds, contentId } = req.body;

    // First argument matches _ids in the playlistIds array, second argument pulls
    // (removes) the contentId to those matched playlists
    Playlist.updateMany(
      { _id: { $in: playlistIds } },
      { $pull: { content: contentId } },
      (error) => {
        if (error) {
          res.status(500).send(error);
        } else {
          res.sendStatus(200);
        }
      }
    );
  });

  // DELETE request to delete a playlist and remove all pointers to the playlist that
  // were there in particular content
  app.delete("/api/playlists/:playlistId", requireLogin, (req, res) => {
    const { playlistId } = req.params;

    Playlist.findById(playlistId, (error, playlist) => {
      if (error) {
        res.status(500).send(error);
      } else {
        // Get all the content ids that was saved in this playlist
        const { content } = playlist;

        // For all the content ids, remove pointers to this playlist from the playlist
        // array in Content model (because playlist is going to be deleted).
        Content.updateMany(
          { _id: { $in: content } },
          { $pull: { playlists: playlistId } },
          (error) => {
            if (error) {
              res.status(500).send(error);
            } else {
              // Now delete the playlist
              Playlist.findByIdAndDelete(playlistId, (error) => {
                if (error) {
                  res.status(500).send(error);
                } else {
                  res.sendStatus(200);
                }
              });
            }
          }
        );
      }
    });
  });
};

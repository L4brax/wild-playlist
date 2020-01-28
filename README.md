# wild-playlist

A simple API developped with NodeJs

## Scripts

- npm start
  lance le serveur avec l'outil nodemon, permettant le hot reload.

# Schéma de la Base de donnée

Trois tables :

- **track**
  track_id
  name
  author
  added_date

* **playlist**
  playlist_id
  name
  style
  created_date

- **playlist_track**
  playlist_id
  track_id

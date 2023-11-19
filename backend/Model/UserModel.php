<?php

class UserModel
{

  private $db;

  public function __construct($database)
  {
    $this->db = $database;
  }

  // Method to verify the user credentials
  public function verifyUserCredentials($username, $password)
  {
    $query = $this->db->getConnection()->prepare("SELECT password FROM username WHERE username = ?");
    $query->bind_param('s', $username);
    $query->execute();
    // Fetch the result of the query.
    $result = $query->get_result();
    $row = $result->fetch_assoc();


    if ($row && password_verify($password, $row['password'])) {
      return true;
    } else {
      return false;
    }
    $query->close();
  }

  public function checkUserExist($username)
  {
    $query = $this->db->getConnection()->prepare("SELECT password FROM username WHERE username = ?");
    $query->bind_param('s', $username);
    $query->execute();
    // Fetch the result of the query.
    $result = $query->get_result();
    if ($result->num_rows > 0) {
      //user already exist
      return true;
    } else {
      return false;
    }
  }

  public function registerUser($username, $password)
  {
    $password = password_hash($password, PASSWORD_DEFAULT);
    $query = $this->db->getConnection()->prepare("INSERT INTO username (username, password) VALUES (?, ?)");
    $query->bind_param('ss', $username, $password);
    $query->execute();
    $query->close();
  }

  // Method to get the ratings from database
  public function getAllRatings()
  {
    $query = $this->db->getConnection()->prepare("SELECT * FROM ratings");
    $query->execute();
    $result = $query->get_result();

    $rows = [];
    while ($row = $result->fetch_assoc()) {
      $rows[] = $row;
    }

    $query->close();

    return $rows;
  }

  public function getSongInfo($song_id)
  {
    $query = $this->db->getConnection()->prepare("SELECT * FROM ratings WHERE id = ?");
    $query->bind_param('i', $song_id);
    $query->execute();
    $result = $query->get_result();
    $row = $result->fetch_assoc();

    if ($row) {
      return [$row['artist'], $row['song'], $row['rating']];
    } else {
      return "wrong";
    }
    $query->close();
  }



  public function updateInfo($song_id, $artist, $song_name, $song_rating, $song_category)
  {
    $query = $this->db->getConnection()->prepare("UPDATE ratings SET artist = ?, song = ?, rating = ?, category = ? WHERE id = ?");
    $query->bind_param('ssisi', $artist, $song_name, $song_rating, $song_category, $song_id);
    $query->execute();
    $query->close();
  }

  public function checkValid($song_id, $user_name)
  {
    $query = $this->db->getConnection()->prepare("SELECT * FROM ratings WHERE id = ? AND username = ?");
    $query->bind_param('is', $song_id, $user_name);
    $query->execute();
    $result = $query->get_result();
    $row = $result->fetch_assoc();
    if ($row) {
      return "true";
    } else {
      return "false";
    }
    $query->close();
  }

  public function deleteSong($song_id)
  {
    $query = $this->db->getConnection()->prepare("DELETE FROM ratings WHERE id = ?");
    $query->bind_param('i', $song_id);
    $query->execute();
    $query->close();
  }

  public function checkDuplicate($song_name, $user_name, $song_artist)
  {
    $query = $this->db->getConnection()->prepare("SELECT * FROM ratings WHERE song = ? AND username = ? AND artist = ?");
    $query->bind_param('sss', $song_name, $user_name, $song_artist);
    $query->execute();
    $result = $query->get_result();
    $row = $result->fetch_assoc();
    if ($row) {
      return false;
    } else {
      return true;
    }
    $query->close();
  }

  public function getCategoryCount($category)
  {
    $query = $this->db->getConnection()->prepare("SELECT COUNT(*) FROM ratings WHERE category = ?");
    $query->bind_param('s', $category);
    $query->execute();
    $result = $query->get_result();
    $row = $result->fetch_assoc();
    $query->close();
    return $row['COUNT(*)'];
  }

  public function createSong($song_name, $user_name, $song_artist, $song_rating, $song_category)
  {
    $query = $this->db->getConnection()->prepare("INSERT INTO ratings (`username`, `artist`, `song`, `rating`, `category`) VALUES (?, ?, ?, ?, ?)");
    $query->bind_param('sssis', $user_name, $song_artist, $song_name, $song_rating, $song_category);
    $query->execute();
    $query->close();
  }
}

<?php

class Database
{

  private $conn;
  private $servername = "localhost";
  private $dbUsername = "root";
  private $dbPassword = "";
  private $dbname = "music_db";

  public function __construct()
  {
    $this->conn = new mysqli($this->servername, $this->dbUsername, $this->dbPassword, $this->dbname);
    //check connection error
    if ($this->conn->connect_error) {
      die("Connection failed: " . $this->conn->connect_error);
    }
  }

  //Method to initiate database connection.
  public function getConnection()
  {
    return $this->conn;
  }
  // Method to close the database connection.
  public function closeConnection()
  {
    $this->conn->close();
  }
}

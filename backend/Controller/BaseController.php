<?php

class BaseController
{

  protected function jsonResponse($data)
  {
    //make sure react knows the data is in JSON format
    header('Content-Type: application/json');
    //convert data into JSON
    echo json_encode($data);
  }
}

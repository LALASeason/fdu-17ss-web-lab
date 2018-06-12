<?php
//Fill this place

//****** Hint ******
//connect database and fetch data here
define('DBHOST', 'localhost');
define('DBUSER', 'root');
define('DBPASS', '');
define('DBNAME', 'travel');

$con = new mysqli(DBHOST, DBUSER, DBPASS, DBNAME);

if($con->connect_error){
    die("Connection failed:" . $con->connect_error);
}
echo "Connected successfully";

function getSearchResult(){
    global $con;
    $sql = "SELECT ImageID, Path, Title FROM ImageDetails";
    if (isset($_GET['continent']) && $_GET['continent'] != "" && $_GET['continent'] != "0"){
        $continent = $_GET['continent'];
        $sql .= " WHERE ContinentCode = '$continent'";
    }elseif (isset($_GET['country']) && $_GET['country'] != "" && $_GET['country'] != "0"){
        $country = $_GET['country'];
        $sql .= " WHERE CountryCodeISO = '$country'";
    }elseif (isset($_GET['title']) && $_GET['title'] != ""){
        $title = $_GET['title'];
        $sql .= " WHERE Title = '$title'";
    }
    $result = mysqli_query($con, $sql);
    $images = mysqli_fetch_all($result, MYSQLI_ASSOC);
    return $images;

}

?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <title>Chapter 14</title>

      <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href='http://fonts.googleapis.com/css?family=Lobster' rel='stylesheet' type='text/css'>
    <link href='http://fonts.googleapis.com/css?family=Open+Sans' rel='stylesheet' type='text/css'>

    <link rel="stylesheet" href="css/bootstrap.min.css" />



    <link rel="stylesheet" href="captions.css" />
    <link rel="stylesheet" href="css/bootstrap-theme.css" />

</head>

<body>
    <?php include 'header.inc.php'; ?>



    <!-- Page Content -->
    <main class="container">
        <div class="panel panel-default">
          <div class="panel-heading">Filters</div>
          <div class="panel-body">
            <form action="Lab10.php" method="get" class="form-horizontal">
              <div class="form-inline">
              <select name="continent" class="form-control">
                <option value="0">Select Continent</option>
                <?php
                //Fill this place

                //****** Hint ******
                //display the list of continents
                $result = mysqli_query($con, "SELECT ContinentCode, ContinentName FROM Continents");
                while($row = $result->fetch_assoc()) {
                  echo '<option value=' . $row['ContinentCode'] . '>' . $row['ContinentName'] . '</option>';
                }

                ?>
              </select>

              <select name="country" class="form-control">
                <option value="0">Select Country</option>
                <?php
                //Fill this place

                //****** Hint ******
                /* display list of countries */
                $result = mysqli_query($con, "SELECT ISO, CountryName FROM countries ORDER BY CountryName");
                while ($row = $result->fetch_assoc()){
                    echo '<option value =' . $row['ISO'] . '>' . $row['CountryName'] . '</option>';
                }
                ?>
              </select>
              <input type="text"  placeholder="Search title" class="form-control" name=title>
              <button type="submit" class="btn btn-primary">Filter</button>
              </div>
            </form>

          </div>
        </div>


		<ul class="caption-style-2">
            <?php
            //Fill this place

            //****** Hint ******
            /* use while loop to display images that meet requirements ... sample below ... replace ???? with field data
            <li>
              <a href="detail.php?id=????" class="img-responsive">
                <img src="images/square-medium/????" alt="????">
                <div class="caption">
                  <div class="blur"></div>
                  <div class="caption-text">
                    <p>????</p>
                  </div>
                </div>
              </a>
            </li>
            */
            $images = getSearchResult();
            for ($i = 0 ; $i < count($images); $i++){
                $title = $images[$i]['Title'];
                $id = $images[$i]['ImageID'];
                $path = $images[$i]['Path'];
                echo '<li>';
                echo "<a href = \"detail.php?id = $id\" class = \"img-responsive\">";
                echo "<img src = \"images/square-medium/$path\" alt = \"$title\">";
                echo '<div class = "caption">';
                echo '<div class = "blur"></div>';
                echo '<div class = "caption-text">';
                echo "<p>$title</p>";
                echo '</div>';
                echo '</div>';
                echo '</a>';
                echo '</li>';
            }
            ?>
       </ul>


    </main>

    <footer>
        <div class="container-fluid">
                    <div class="row final">
                <p>Copyright &copy; 2017 Creative Commons ShareAlike</p>
                <p><a href="#">Home</a> / <a href="#">About</a> / <a href="#">Contact</a> / <a href="#">Browse</a></p>
            </div>
        </div>


    </footer>


        <script src="https://code.jquery.com/jquery-2.2.4.min.js" integrity="sha256-BbhdlvQf/xTY9gja0Dq3HiwQF8LaCRTXxZKRutelT44=" crossorigin="anonymous"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js" integrity="sha384-0mSbJDEHialfmuBBQP6A4Qrprq5OVfW37PRR3j5ELqxss1yVqOtnepnHVP9aJ7xS" crossorigin="anonymous"></script>
</body>

</html>
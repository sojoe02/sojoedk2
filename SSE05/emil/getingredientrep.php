

<?php

header ("Content-Type:text/xml");  
$id=$_GET["id"];
$link = getLink();
mysql_select_db("mydb", $link);
$query = sprintf('SELECT * FROM ingredients WHERE replacement="'.$id.'"');

// Perform Query
$result = mysql_query($query);

// Check result
if (!$result) {
    $message  = 'Invalid query: ' . mysql_error() . "\n";
    $message .= 'Whole query: ' . $query;
    die($message);
}

//making a dropdown menu
//test purpose
echo    '<ingredients>';
while ($rowingredient = mysql_fetch_assoc($result)) {
    echo '<ingredient name="'.$rowingredient['name'].'" calories="'.$rowingredient['calories'].'"/>';
}
echo	'</ingredients>';

mysql_free_result($result);
mysql_close($link);

//get a connection to the mysql db
function getLink()
{
$link = mysql_connect('localhost', 'root', '123456');
	if (!$link) {
    	die('Could not connect: ' . mysql_error());
	}
return $link;
}
?>


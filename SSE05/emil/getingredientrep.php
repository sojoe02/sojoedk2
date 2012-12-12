<?php
header ("Content-Type:text/xml");  
$id=$_GET["id"];
echo '<ingredients>';
echo '<ingredient name="parrot" calories="1500"/>';
echo '<ingredient name="goat" calories="5"/>';
echo '</ingredients>';
?>
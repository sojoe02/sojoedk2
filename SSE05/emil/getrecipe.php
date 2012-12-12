
<?php
//header ("Content-Type:text/xml");  
$id=$_GET["id"];

echo '<recipe>';
echo '<title>Stiffy fiffy</title>';
echo '<desc>This is a description of the recipe</desc>';
echo '<ingredients>';
echo '<ingredient name="beef" calories="4500" amount="4" amountType="kg" id="97"/>';
echo ' <ingredient name="ash" calories="0" amount="43" amountType="g" id="98"/>';
echo '<ingredient name="soda" calories="1005" amount="3" amountType="ml" id="99"/>';
echo '<ingredient name="spicegirl" calories="40" amount="3" amountType="l" id="100"/>';
echo '</ingredients>';
echo '<video type="vimeo" id="54510052"/>';
echo '<images type="flikr" id="72157627429995851"/>';
echo '</recipe>';

?>
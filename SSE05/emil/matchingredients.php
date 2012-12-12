<?php
header ("Content-Type:text/xml");  
if (isset($_POST['match'])) {
    $str = $_POST['match'];             // get data
    $xml = simplexml_load_string($str);
}
else{
   $xml = simplexml_load_file("sdk.xml"); 
}

/*
$ingredients[]=array();
$str = "SELECT idIngredients FROM mydb.ingredients WHERE ";
for($i=0;$i<sizeof($xml->ingredient);$i++){
        foreach($xml->ingredient[$i]->attributes() as $a => $b) {
        if($a=="name"){
         
            if($i==0){
            $str=$str."name='".$b."'";    
            }
            else{
            $str=$str." or name='".$b."'";
            }
           
        }    
        } 
 }
 $link = getLink();
 mysql_select_db("mydb", $link);
 $result = mysql_query($str);
 $i=0;
 while ($row = mysql_fetch_assoc($result)) {
   
            if($i==0){
            $str="(".$row['idIngredients'];    
            }
            else{
            $str=$str.",".$row['idIngredients'];
            }
            $i++;
}
$str=$str.")";   
$qu="select r.idRecipe,r.title, count(rr.idRecipe) as count from recipe r left join relation rr on (r.idRecipe = rr.idRecipe) WHERE rr.idIngredients in".$str."  GROUP BY rr.idRecipe ORDER BY count DESC;";  

 * 
 */


 $xml = '<recipes>
    <recipe title="Stiffy iffy, brewed" id="14" score="2"/>
    <recipe title="Stiffy iffy" id="15" score="2"/>
    <recipe title="Stiffy fiffy " id="16" score="2"/>
    <recipe title="+$recipename+" id="1" score="1"/>
    <recipe title="Carrots and Parrots, stewed" id="2" score="1"/>
</recipes>';

 echo $xml;
//echo $qu; 
   
/*
 $link = getLink();
 mysql_select_db("mydb", $link);
$result = mysql_query($qu);
echo'<?xml version="1.0" encoding="utf-8"?>';
echo '<recipes>';
 while ($row2 = mysql_fetch_assoc($result)) {
   
   echo '<recipe title="'.$row2['title'].'" id="'.$row2['idRecipe'].'" score="'.$row2['count'].'" />';
}
echo '</recipes>';
function getLink()
{
$link = mysql_connect('localhost', 'root', '123456');
	if (!$link) {
    	die('Could not connect: ' . mysql_error());
	}
return $link;
}
 * 
 */
?>

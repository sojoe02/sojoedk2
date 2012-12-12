<?php

    if (isset($_POST['test'])) {
    $str = $_POST['test'];             // get data
    echo "The string: '<i>".$str."</i>' contains ". strlen($str). ' characters and '. str_word_count($str, 0). ' words.';
    }
    if (isset($_POST['recipe'])) {
        $str = $_POST['recipe'];             // get data
        $xml = simplexml_load_string($str);
        $ingrdient = $xml->ingredients->ingredient;
        $name = $xml->title;
        $instructions = $xml->desc;
        foreach($xml->video[0]->attributes() as $a => $b) {
        if($a=="type"){
           $vid_type= $b;
        }
        if($a=="id"){
            $vid_id= $b;
        }
            
        }
        foreach($xml->images[0]->attributes() as $a => $b) {
        if($a=="type"){
           $pic_type= $b;
        }
        if($a=="id"){
            $pic_id= $b;
        }
          
        }
        //$xml->video[0]->attributes() as $vid_type => $vid_id;
      $i=0;
      $k=0;
        $ingredients[]=array();
        $relation[]=array();
        for($i=0;$i<sizeof($xml->ingredients->ingredient);$i++){
        foreach($xml->ingredients->ingredient[$i]->attributes() as $a => $b) {
        if($a=="name"){
        
           $ingredients[$k]= $b;
        }
        if($a=="calories"){
       
            $ingredients[$k+1]= $b;
        }
        if($a=="amount"){
       
            $relation[$k]= $b;
        }
        if($a=="amountType"){
       
            $relation[$k+1]= $b;
        }
  
        }
        $k=$k+2;
        }  

        
        addRecipe($name,$instructions,$ingredients,$vid_type,$vid_id,$pic_type,$pic_id,$k,$relation);
    
}
else{
   echo "please make a post with the recipe.xml";
   exit(1);
}

function addRecipe($recipename,$recipeinstructions,$ingredients,$vid_type,$vid_id,$pic_type,$pic_id,$n,$relation ){

$link = getLink();
mysql_select_db("mydb", $link);
$query = sprintf("SELECT idRecipe FROM recipe WHERE title='".$recipename."'"); 
$result = mysql_query($query) or die(mysql_error());
$row = mysql_fetch_assoc($result);
$idrecipe = $row['idRecipe'];
if($idrecipe==NULL){
   mysql_query('INSERT INTO recipe (title, descr, vid_type, vid_id, pic_type, pic_id) VALUES ("'.$recipename.'","'.$recipeinstructions.'","'.$vid_type.'","'.$vid_id.'","'.$pic_type.'","'.$pic_id.'")'); 
   $query = sprintf("SELECT idRecipe FROM recipe WHERE title='".$recipename."'"); 
    $result = mysql_query($query) or die(mysql_error());
    $row = mysql_fetch_assoc($result);
    $idrecipe = $row['idRecipe'];
    
}
else{
    echo "title allready taken \n";
    exit(1); // A response code other than 0 is a failure
    
}


//var_dump($result);

$k=0;
for($i=0;$i<($n/2);$i++){
       
        
        $name=$ingredients[$k];
        
        $calori =$ingredients[$k+1];
        $amount =$relation[$k];
        $unit =$relation[$k+1];
        $query = sprintf("SELECT idIngredients FROM ingredients WHERE name='".$name."'");
        $result = mysql_query($query);
        $row = mysql_fetch_assoc($result);
        $idIngredient = $row['idIngredients'];
       
        if($idIngredient==NULL){
            mysql_query('INSERT INTO ingredients (name,calories) VALUES ("'.$name.'","'.$calori.'")');
            $query = sprintf("SELECT idIngredients FROM ingredients WHERE name='".$name."'");
            $result = mysql_query($query);
            $row = mysql_fetch_assoc($result);
            $idIngredient = $row['idIngredients'];
        }
        mysql_query('INSERT INTO relation (idRecipe,idIngredients,amount,unit) VALUES ("'.$idrecipe.'","'.$idIngredient.'","'.$amount.'","'.$unit.'")');
        $k=$k+2;
} 

    //debug
  
mysql_close($link);



}

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

<?php

class ImageFetch{
    private $apiKey = '233d3164af0d4da4ac09816038a5315a';
    private $userID = '63154520%40N05';
    
    public function __construct() {        
    }
    
    public function getFlikrSet($query){   
        
        //$query = '72157624042883634';
        
        $search = 'http://api.flickr.com/services/rest/'
                .'?method=flickr.photosets.getPhotos'
                .'&api_key=233d3164af0d4da4ac09816038a5315a'
                .'&photoset_id='. urlencode($query)
                .'&per_page=5&format=json&nojsoncallback=1';
                //.'&api_sig=b6f0cc0993ee36ce487bdd5b4521a686';
        $result = file_get_contents($search);     
        
        return $result; 
    } 
}

switch($_GET['func']){
    case 'getPics':
        getPictures();
        break;
    default:
}

function getPictures() {  
    $setID = (string)$_GET['setID']; 
    $Flickr = new ImageFetch();
    $data = $Flickr->getFlikrSet($setID);
    echo $data;
}

?>

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


//Video stuff:
function init(){
    // 2. This code loads the IFrame Player API code asynchronously.
    var tag = document.createElement('script');
    tag.src = "//www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    getRecipeData();
}


function getRecipeData(){

    document.getElementById('ingredients').innerHTML ="" ;

    var XMLdoc = loadXMLDoc("recipe.xml");
    var ingredients = [];
    var x = XMLdoc.getElementsByTagName("ingredient");

    for (var i=0;i< x.length ;i++){
        var inner = [2];
        inner[0] = x[i].getAttribute("name");
        inner[1] = x[i].getAttribute("calories");
        ingredients[i] = inner;
    }

    showIngredients(ingredients);
    showTitle(XMLdoc.getElementsByTagName("title")[0].childNodes[0].nodeValue);
    showDesc(XMLdoc.getElementsByTagName("desc")[0].childNodes[0].nodeValue);
    
    //load the video data, throw and exception if the video tag doesn't exist:
    try{
        var vidID = XMLdoc.getElementsByTagName("video")[0].getAttribute("id");        
        showVideo(vidID, XMLdoc.getElementsByTagName("video")[0].getAttribute("type"));                    
    } catch(e){}       
    try{
        var setID = XMLdoc.getElementsByTagName("images")[0].getAttribute("id");
        showImages(setID);
    } catch(e){}
    
}

function showIngredients(ingredients){

    var listing = document.getElementById('ingredients');
    var table   = document.createElement('table');
    table.setAttribute("id", "ingtable");
    var row=table.insertRow(0);

    for (var i=0; i<ingredients.length;i++){

        row         = table.insertRow(0);
        cell1 = row.insertCell(0);
        cell2 = row.insertCell(1);       

        cell1.innerHTML=ingredients[i][0];
        cell2.innerHTML=ingredients[i][1];
    }
    listing.appendChild(table);
}

function showTitle(title){
    document.getElementById("title").innerHTML = title;
}

function showDesc(desc){
    document.getElementById("desc").innerHTML = desc;
}



function showVideo(link, type){  
    
    document.getElementById('video').innerHTML = "";
    
    if(type == "youtube"){
        var player = new YT.Player('video', {
            height: '390',
            width: '640',
            videoId: link   
        });      
    } else if(type == "vimeo"){
        var frame = document.createElement('iframe');
        frame.setAttribute("src", "http://player.vimeo.com/video/"+ link);
        frame.setAttribute("width", 640);
        frame.setAttribute("height", 480);        
        document.getElementById('video').appendChild(frame);        
    }
    
}

function showImages(setID){    
    document.getElementById('images').innerHTML = "";  
    
    var func = 'getPics';
    
    jQuery.get("imageFetch.php",{
        func : func ,
        setID : setID
        
    },function(data){     
        var jsonobj = JSON.parse(data) ;
        var photoarray = jsonobj.photoset;
        
        for(var i=0; i<5;i++){
            jQuery("<img/>").attr({
                //building the image:
                src : 'http://farm' 
                + photoarray.photo[i].farm
                + '.static.flickr.com/'
                + photoarray.photo[i].server + '/'
                + photoarray.photo[i].id + '_'
                + photoarray.photo[i].secret + '.jpg',            
                id : photoarray.photo[i].id ,
                //setting the class and title:
                'class' : 'click',
                title : 'Click to show location on map'
            }).appendTo("#images");
        }
    });
}

function loadXMLDoc(dname)
{
    if (window.XMLHttpRequest)
    {
        xhttp=new XMLHttpRequest();
    }
    else
    {
        xhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
    xhttp.open("GET",dname,false);
    xhttp.send();
    return xhttp.responseXML;
}


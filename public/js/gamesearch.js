window.addEventListener("DOMContentLoaded", (event) => {
    const game_links = document.querySelectorAll("#content>div");
    const game_searchbar = document.getElementById("search");
    console.log("e");
    function arrayToString(fgh){
        let y = "";
        for(let k = 0;k<fgh.length;k++){
            y = y + fgh[k]
        }
        return y
    }
    function hide(elem){
        elem.style.position = "absolute"
        elem.style.visibility = "hidden"
    }
    function show(elem){	
        elem.style.position = "static"
        elem.style.visibility = "visible"
    }
    function doit(e){
        let search = e.target.value.toLowerCase()
        console.log(search)
        if(search!=""){
        for(let jk = 0;jk<game_links.length;jk++){
            if(game_links[jk].title.toLowerCase().indexOf(search)==-1){
                hide(game_links[jk]);
            }
        }
        }else{
            for(let jk = 0;jk<game_links.length;jk++){
                show(game_links[jk])
            }
        }
    }
    game_searchbar.addEventListener("input", doit);
    });
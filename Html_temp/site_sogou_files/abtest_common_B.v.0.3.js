define("", ["$"], function($){
    $s.wait("right", function(b) {
        var a = $s.$("main");
        if (a) {
            b.style.display="";
            if(typeof rflag != "undefined"){
                rflag = 1;
            }
            if (typeof(kmap_rsong_pos) != "undefined") {
                if (kmap_rsong_pos > 22) {
                    $s.$("kmap_song_scroll").scrollTop = kmap_rsong_pos
                }
            }
        }
    });
});
/*
 * Image Gallery in jQuery
 *
 * @John Kang
 */

$(function() {

    var picture = $(".row");
    var chk = $(".checkbox");
    var slideIdx = 1;
    
    var modal = $("#myModal")[0];
    var modalImg = $("#pic");
    var captionText = $("#caption")[0];
    
    function plusDivs(n) {
        showDivs(slideIdx += n);
    }
    
    function showDivs(n) {
        var i;
        var x = $("img");
        if (n > x.length-1) {
            slideIdx = 1;
        }
        if (n < 1) {
            slideIdx = x.length;
        }
        
        for (i=0 ; i < x.length; i++) {
            x[i].style.display = "none";
        }
        
        x[slideIdx-1].style.display = "block";
        if ($(x[slideIdx-1]).hasClass("plants")) {
            $(".Plant").prop("checked", true);
            $(".HR-Plant").prop("checked", false);
            $(".View").prop("checked", false);
            $(".HR-View").prop("checked",false);
        }
        if ($(x[slideIdx-1]).hasClass("hplants")) {
            $(".Plant").prop("checked", false);
            $(".HR-Plant").prop("checked", true);
            $(".View").prop("checked", false);
            $(".HR-View").prop("checked",false);
        }
        if ($(x[slideIdx-1]).hasClass("views")) {
            $(".Plant").prop("checked", false);
            $(".HR-Plant").prop("checked", false);
            $(".View").prop("checked", true);
            $(".HR-View").prop("checked",false);
        }
        if ($(x[slideIdx-1]).hasClass("hviews")) {
            $(".Plant").prop("checked", false);
            $(".HR-Plant").prop("checked", false);
            $(".View").prop("checked", false);
            $(".HR-View").prop("checked",true);
        }
    }
    
    $("#slide").on("click", function () {
        $('#mdiv').show();
        $('#pdiv').show();

        $(".Plant").prop("disabled", true);
        $(".HR-Plant").prop("disabled", true);
        $(".View").prop("disabled", true);
        $(".HR-View").prop("disabled",true);

        $("#slide").hide();
        $("#exit").show();
        showDivs(slideIdx);
    });       
    
    if ($("#exit").on("click", function () {
        $('#mdiv').hide();
        $('#pdiv').hide();
        
        $(".Plant").prop("disabled", false);
        $(".HR-Plant").prop("disabled", false);
        $(".View").prop("disabled", false);
        $(".HR-View").prop("disabled", false);
                    
        $('#exit').hide();
        $('#slide').show();
        
        $(".plants").remove();
        $(".hplants").remove();
        $(".views").remove();
        $(".hviews").remove();
        
        $(".context").remove();

        loadImages("all.json");
    }));
    
    $("#mdiv").on("click", function () {
        plusDivs(-1);
    });
    
    $("#pdiv").on("click", function () {
        plusDivs(1);
    });

    function loadImages(url) {
        var arr = [];
        $.getJSON(url, function(data) {
            $.each(data.items, function(key, value) {
                $(picture).append("<img class="+value.category + " id =" +
                                  "show"+ " src="+value.url+" alt="+value.caption+" /></div>");
                arr.push(value.check);
                });
            arr=$.unique(arr);
            var j;
            
            for (j=0; j<arr.length; j++) {
                $(chk).append("<label class="+"context"+">"+arr[j]+"<input type="+"checkbox"+" class="+arr[j]+
                              "> <span class="+"checkmark"+"></span></label>");
            }
            
            $(".Plant").prop("checked", true);
            $(".HR-Plant").prop("checked", true);
            $(".View").prop("checked", true);
            $(".HR-View").prop("checked", true);
    
            
            if ($(".Plant").prop("checked") === true) {
                $(".plants").show();
            }
            if ($(".HR-Plant").prop("checked") === true) {
                $(".hplants").show();
            }
            if ($(".View").prop("checked") === true) {
                $(".views").show();
            }
            if ($(".HR-View").prop("checked") === true) {
                $(".hviews").show();
            }
            if ($(".Plant").prop("checked") === false) {
                $(".plants").hide();
            }
            if ($(".HR-Plant").prop("checked") === false) {
                $(".hplants").hide();
            }
            if ($(".View").prop("checked") === false) {
                $(".views").hide();
            }
            if ($(".HR-View").prop("checked") === false) {
                $(".hviews").hide();
            }
            
            $(".Plant").on("click", function() {
                if ($(".Plant").prop("checked")===false){
                    $(".plants").hide();
                }
                else {
                    $(".plants").show();
                }
            });
            $(".HR-Plant").on("click", function() {
                if ($(".HR-Plant").prop("checked")===false){
                    $(".hplants").hide();
                }
                else {
                    $(".hplants").show();
                }
            });
            $(".View").on("click", function() {
                if ($(".View").prop("checked")===false){
                    $(".views").hide();
                }
                else {
                    $(".views").show();
                }
            });
            $(".HR-View").on("click", function() {
                if ($(".HR-View").prop("checked")===false){
                    $(".hviews").hide();
                }
                else {
                    $(".hviews").show();
                }
            });
        });       
    }

    $("body").on('click', "img", function() {
        modal.style.display = "block";
        modalImg.attr("src", $(this).attr("src")).show(); 
        captionText.innerHTML = this.alt;
        }
    );
    
    $(".close").on('click', function() {
        modal.style.display = "none";
    }); 
    
    
    $("#exit").hide();  
    $('#mdiv').hide();
    $('#pdiv').hide();
    loadImages("all.json"); 
});
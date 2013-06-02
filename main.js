var paper = Raphael(0, 0, "100%", "100%");

var i = 100,
triangleSize1 = 400,
triangleSize2 = 100,
xOffset = -100,
yOffset = -90,
vertices = new Array(i),
x,
y,
w = window,
d = document,
e = d.documentElement,
g = d.getElementsByTagName('body')[0],
wx = w.innerWidth || e.clientWidth || g.clientWidth,
wy = w.innerHeight|| e.clientHeight|| g.clientHeight;

//middle middle
vertices[0] = {x: wx/2 + xOffset, y: wy/2 + yOffset, type: "mm"};
//middle right
vertices[1] = {x: wx/2 + xOffset + triangleSize1, y: wy/2 + yOffset, type: "mr"};
//bottom
vertices[2] = {
    x: wx/2 + xOffset + triangleSize1/2,
    y: wy/2 +  Math.sqrt(Math.pow(triangleSize1,2) - Math.pow(triangleSize1/2,2)) + yOffset,
    type: "b"};
//middle left
vertices[3] = {
    x: wx/2 + xOffset - triangleSize2,
    y: wy/2 + yOffset,
    type: "ml"};
//top
vertices[4] = {
    x: wx/2 + xOffset - triangleSize2/2,
    y: wy/2 - Math.sqrt(Math.pow(triangleSize2, 2) - Math.pow(triangleSize2/2, 2)) + yOffset,
    type: "t"
};

var ty1 = triangleSize1/2 * Math.tan(Math.PI/6) + wy/2 + yOffset;
var tx1 = triangleSize1/2 + wx/2 + xOffset;
var r1 = triangleSize1/(2 * Math.cos(Math.PI/6));

var ty2 = -triangleSize2 * Math.tan(Math.PI/6)/2 + wy/2 + yOffset;
var tx2 = -triangleSize2/2 + wx/2 + xOffset;
var r2 = triangleSize2/(2 * Math.cos(Math.PI/6));

//paper.circle(tx1, ty1, r1);
//paper.circle(tx2, ty2, r2);

var distance1, distance2;


while(i > 5) {

    do{
        x = Math.random() - 0.03;
        y = Math.random() - 0.03;
        x = x * (wx + 60);
        y = y * (wy + 60);
        distance1 = Math.sqrt(Math.pow(tx1 - x, 2) + Math.pow(ty1 - y, 2));
        distance2 = Math.sqrt(Math.pow(tx2 - x, 2) + Math.pow(ty2 - y, 2));
    }while(distance1 < r1 || distance2 < r2);
    vertices[--i] = {x: x, y: y};
}

console.time("triangulate");
var triangles = triangulate(vertices);
console.timeEnd("triangulate");

i = triangles.length;
while(i)
    triangles[--i].drawRaleaph(paper);

/* jquery plugin */
$.fn.teletype = function(opts){
    var $this = this,
        defaults = {
            animDelay: 50
        },
        settings = $.extend(defaults, opts);

    $.each(settings.text.split(''), function(i, letter){
        setTimeout(function(){
            $this.html($this.html() + letter);
        }, settings.animDelay * i);
    });
};

$(document).ready(function(){
    $("#twentyThree").css("top", ty2 - 20 + "px");
    $("#twentyThree").css("left", tx2 - 20 + "px");
    $("#ideas").css("top", ty1 - 80 + "px");
    $("#ideas").css("left", tx1 - 110 + "px");

    $("#info").teletype({
        animDelay: 100,  // the bigger the number the slower the typing
        text: 'And More...'
    });
    $("#info").on('click', function(e){
        $("#overLay").css("top", "0px");
    });
    
    $("#overLay").on('click', function(e){
        $("#overLay").css("top", '');
    })
});

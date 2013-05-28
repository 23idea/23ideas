var canvas = document.getElementById("canvas"),
    ctx = canvas.getContext("2d"),
    i = 2048,
    vertices = new Array(i),
    x,
    y;

  while(i) {
    do {
      x = Math.random() - 0.5;
      y = Math.random() - 0.5;
    } while(x * x + y * y > 0.25);

    x = (x * 0.96875 + 0.5) * canvas.width;
    y = (y * 0.96875 + 0.5) * canvas.height;

    vertices[--i] = {x: x, y: y};
  }

  console.time("triangulate");
  var triangles = triangulate(vertices);
  console.timeEnd("triangulate");

  i = triangles.length;
  while(i)
    triangles[--i].draw(ctx);


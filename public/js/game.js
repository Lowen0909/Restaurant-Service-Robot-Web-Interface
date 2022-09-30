let sketch = function(p) {
    p.setup=function() {
      p.createCanvas(300, 300);
	  p.background(100);
    }
    p.draw=function() {
        p.background(0)
        // var ang = map(mouseX,0,width,0,PI*2,true)
        var s = p.second();
        var m = p.minute()
        var h = p.hour()
        var angleS =p.map(s,0,60,0,p.PI*2)
        var angleM =p.map(m,0,60,0,p.PI*2)
        var angleH =p.map(h,0,12,0,p.PI*2)
        p.fill('red')
        p.arc(p.width/2, p.height/2, 200, 200, 0, angleS, p.PIE);
        p.fill('yellow')
        p.arc(p.width/2,p.height/2, 100, 100, 0, angleM, p.PIE);
        p.fill('white')
        p.arc(p.width/2,p.height/2, 50, 50, 0, angleH, p.PIE);
    }
    function keyPressed() {
        if (value === 0) {
          value = 255;
        } else {
          value = 0;
        }
      }
  };
  new p5(sketch,'game');
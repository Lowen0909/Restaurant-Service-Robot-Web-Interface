function movebox(i, j) {
    this.i = i;
    this.j = j;
    this.width = 40;
    this.height = 10;
    this.show = function (k) {
        k.noStroke();
        k.fill('white');
        k.rect(this.i, this.j, this.width, this.height);
    };
}
function obstacle(i, j) {
    this.i = i;
    this.j = j;
    this.width = 10;
    this.height = 10;
    this.show = function (k) {
        k.noStroke();
        k.fill('white')
        k.rect(this.i, this.j, this.width, this.height);
    }
    this.down = function () {
        this.j += 10;
    }
}
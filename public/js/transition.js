var t = 2;
var i=0;
function jump(){
    if (t==1) 
        location = '/home';   
    t--;
};
function gif(){
    if(i%4==0)
        $('.anime').text("Redirect to homepage");
    else{
        let text=$('.anime').text();
        text+='.';
        $('.anime').text(text);
    }  
    i++;
}
$(document).ready(function(){
    setInterval("gif()",200);
    setInterval("jump()", 1000);
});
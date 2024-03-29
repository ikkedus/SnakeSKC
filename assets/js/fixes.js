/*
 * window.requestAnimationFrame is a way to let the browser determen what the best moment is to render a image,
 * some browsers implement this diffrently than others thats why this piece of code is implemented, some browsers dont a function forthis for that we implement a timeout.
*/
if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (callback, element) {
            window.setTimeout(callback, 1000 / 60);
        }
}
/*global CpuSolver GpuSolver Maze */

var RESET_DELAY = 10 * 1000;

function nearest(dim, scale) {
    var floor = Math.floor(dim / scale);
    return (floor % 2 == 0) ? floor - 1 : floor;
}

var solver = null;
function init() {
    var canvas = $('#display')[0],
        scale = 14,
        w = nearest(canvas.width, scale),
        h = nearest(canvas.height, scale),
        maze = Maze.kruskal(w, h);
    canvas.width = w * scale;
    canvas.height = h * scale;
    solver = new GpuSolver(w, h, maze, canvas).draw().animate(reset);
    function reset() {
        window.setTimeout(function() {
            solver.reset(Maze.kruskal(w, h));
            solver.animate(reset);
        }, RESET_DELAY);
    }
}

/* requestAnimationFrame shim */
if (window.requestAnimationFrame == null) {
    window.requestAnimationFrame =
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame    ||
        function(callback){
            window.setTimeout(callback, 1000 / 60);
        };
}

$(document).ready(init);

    function factorialRecursivo(n) {
        if (n === 0) {
        return 1;
        }
        return n * factorialRecursivo(n - 1);
    }
    
    function swap(a, i, j) {
        var temp = a[i];
        a[i] = a[j];
        a[j] = temp;
    }
    
    function calcDistance(points) {
        var sum = 0;
        for (var i = 0; i < points.length - 1; i++) {
        var d = dist(points[i].x, points[i].y, points[i + 1].x, points[i + 1].y);
        sum += d;
        }
        return sum;
    }
    
    function dist(x0, y0, x1, y1) {
        return Math.sqrt((x1 - x0) * (x1 - x0) + (y1 - y0) * (y1 - y0));
    }




    export { factorialRecursivo, swap, calcDistance, dist };
    
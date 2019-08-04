/*
    margin = 10px
    width of screen: 325px
    col count: 10
        no  description                     pos x
        1   left turtle starting point      0 px + margin            
        2   left 1st pad                    32.5 px + margin
        3   left turtle 1st land            65 px + margin        
        4   left 2nd pad                    97.5 px + margin
        5   left turtle finish land         130 px + margin        
        6   right turtle finish land        162.5 px + margin            
        7   right turtle 2nd pad            195 px + margin        
        8   right turtle 1st land           227.5 px + margin        
        9   right turtle 1st pad            260 px + margin        
        10  right turtle starting point     292.5 px + margin            

    row:
        10, 30, 50, 70, 90, 110, 130, 150, 170, 190, 210, 230, 250
    row count: 13
*/

// ------------------------------------------------------------------------------------------------ Expose
var world = {}

// ------------------------------------------------------------------------------------------------ Module

world.colCount = 13
world.rowCount = 10

world.getLocation = function(col, row, withoutMargin) {
    function getX() {
        return (col - 1) * 32.5
    }

    function getY() {
        var margin = 10
        return f.virtual.height - ((row) * 20) + margin
    }

    var location = {
        x: getX() + f.virtual.consoleWidth,
        y: getY() - 5
    }

    if(withoutMargin) {
        location.x -= f.virtual.consoleWidth
    }

    return location
}

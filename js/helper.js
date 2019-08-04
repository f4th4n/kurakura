var p = () => {
    if(cc.director._paused) {
        cc.director.resume()
    } else {
        cc.director.pause()
    }
}

function flog(obj) {
    cc.log('duadua', obj)
}

var empty = (obj) => {
    return (obj === null || obj === undefined || obj.length === 0)
}

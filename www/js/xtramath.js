Math.norm = function(value, min, max) {
    return (value - min) / (max - min)
}

Math.lerp = function(norm, min, max) {
    return (max - min) * norm + min
}

Math.clamp = function(value, min, max) {
    return Math.max(min, Math.min(max, value))
}

Math.map = function(value, sourceMin, sourceMax, destMin, destMax) {
    return this.lerp(this.norm(value, sourceMin, sourceMax), destMin, destMax)
}

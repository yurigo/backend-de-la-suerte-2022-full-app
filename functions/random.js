//random
function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

let number = random(1, 6);

export default (req, res) => {
    res.status(200).json({ random: number})
}

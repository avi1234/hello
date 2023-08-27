const getCats = (req, res) => res.json({success: true, content: [{id: 1, name:'🐱'}]})

module.exports = {getCats}
import express from 'express'


const path = require("path")

global.appRoot = path.resolve(__dirname + '/../')

const PORT = 8080

const app = express()

/* MIDDLEWARE */
app.use("/dist", express.static(path.resolve(__dirname + "/../", 'dist')))

/* VIEW TEMPLATING */
app.set('views', './server/views')
app.set('view engine', 'ejs')


/* ROUTES */
app.get('*', (req, res) => {
	res.render('index')
})

/* SETUP */
app.listen(PORT, () => {
	console.log("server listening on " + PORT)	
})


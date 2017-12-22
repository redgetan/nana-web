import express from 'express';
import ReactDOMServer from 'react-dom/server';
import React from 'react'
import Layout from './layouts/Layout';
import App from './components/Hello';

const path = require("path");

global.appRoot = path.resolve(__dirname + '/../');


const PORT = 8080

// silly example component:
const Fox = ({ name }) => (
	<div class="fox">
		<h5>{ name }</h5>
		<p>This page is all about {name}.</p>
	</div>
);

// basic HTTP server via express:
const app = express();
// app.use("dist", express.static("../dist"))
app.use("/dist", express.static(path.resolve(__dirname + "/../", 'dist')));

app.listen(PORT, () => {
	console.log("server listening on " + PORT)	
});

app.get('/', (req, res) => {
	res.send(`<!DOCTYPE html><html><body>hi</body></html>`);
});

// on each request, render and return a component:
app.get('/:fox', (req, res) => {
	let body = ReactDOMServer.renderToString(<App/>);
	// send it back wrapped up as an HTML5 document:
	res.send(Layout({ body: body, title: "test man.." }));
});

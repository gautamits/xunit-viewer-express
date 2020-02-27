const express=require('express');
const app= express();
const fileUpload = require('express-fileupload');
const PORT = Number(process.env.PORT) || 3000;
const xunitViewer = require('xunit-viewer')

app.use(express.json());
app.set('view engine', 'pug');
app.use(fileUpload());
app.get('/', (req, res) => {
    res.render('index')
});

app.post('/', async (req, res)=>{
    const result = await xunitViewer({
        server: false,
        title: 'Xunit View Sample Tests',
        xml: req.body.xmlcontent || req.files.xml.data.toString()
    })
    res.send(result)
})

if (require.main === module) { // true if file is executed
    app.listen(PORT, (err) => {
        if (err) {
            console.error(err);
        } else {
            console.log('app listening on ', PORT);
        }
    });
}
exports.default=app

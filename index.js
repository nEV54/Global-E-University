const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')
const servicesController = require('./controller/servicesController')
const adminController = require('./controller/adminController')
const servicesModel = require('./models/servicesModel')
const courseModel = require('./models/courseModel')
const courseController = require('./controller/courseController')
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

const app = express()
app.use(express.json());
app.use(cors())
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use('/uploads' , express.static('uploads'))

mongoose.connect('mongodb+srv://striver32:Tush%40kh79@cluster0.gunhw.mongodb.net/?retryWrites=true&w=majority',{
    useNewUrlParser: true, 
    useUnifiedTopology: true,
})
    .then(() => {
        console.log('DB Connected');
    })
    .catch((err) => {
        console.log('DB Error:', err);
    });

app.get('/hello', (req,res) =>{
    return res.send('Hello')
})

//SERVICE ROUTES
app.post('/api/services', upload.single('image') , servicesController.addServices)
app.get('/api/services',servicesController.getServices)

//COURSE ROUTES
app.post('/api/courses',  upload.single('image'),courseController.addCourse)
app.get('/api/courses', courseController.getCourses)

app.get('/api/slider',servicesController.getSlider)

app.get('/admin/admins' , adminController.getAdmins )
app.post('/admin/add' , adminController.addAdmins)
app.post('/admin/login' , adminController.loginAdmin)

app.listen(5000, ()=>{
    console.log("Backend Running At Port 5000");
})
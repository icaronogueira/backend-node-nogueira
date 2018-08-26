const express      = require("express");
const bodyParser   = require("body-parser");
const cookieParser = require("cookie-parser");
const mongoose     = require("mongoose");
const session      = require("express-session");
const MongoStore   = require("connect-mongo")(session);
const cors         = require('cors');
const passport     = require("passport");
const helmet       = require("helmet");
const compression  = require("compression");

const app = express();

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB);

app.use(helmet());
app.use(compression());



require('./passport/passport-local');

app.use(cors());

app.use((req,res,next) => {
    res.header("Acess-Control-Allow-Origin", "*");
    res.header("Acess-Control-Allow-Credentials", "true");
    res.header("Acess-Control-Allow-Methods", 'GET', 'POST','DELETE','PUT');
    res.header("Acess-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static('public'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(session({
    secret: process.env.SECRET,
//     secret: 'thisisasecretkey',
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({mongooseConnection: mongoose.connection})
}));

const user    = require("./routes/userRoute");
const company = require("./routes/companyRoute");
const file    = require ("./routes/fileRoute");
app.use('/api', user);
app.use('/api', company);
app.use('/api', file);




app.listen(process.env.PORT || 3000, () => {
    console.log("Server running on port 3000");
});
 
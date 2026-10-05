require("dotenv").config();

const express = require("express");

const session = require("express-session");

const MongoStore =
    require("connect-mongo").default;

const path = require("path");

require("./config/database");


const bookRoutes =
    require("./routes/bookRoutes");


const app = express();


// ==========================
// MIDDLEWARE
// ==========================

app.use(
    express.urlencoded({
        extended: true
    })
);

app.use(
    express.json()
);


app.use(
    express.static(
        path.join(
            __dirname,
            "public"
        )
    )
);


// ==========================
// HANDLEBARS
// ==========================

app.set(
    "view engine",
    "hbs"
);

app.set(
    "views",
    path.join(
        __dirname,
        "views"
    )
);


// ==========================
// GLOBAL INFORMATION
// ==========================

app.use(
    (req, res, next) => {

        const mssv =
            process.env.MSSV;

        const lastDigit =
            Number(
                mssv[mssv.length - 1]
            );

        const vat =
            lastDigit + 5;


        res.locals.fullName =
            process.env.FULL_NAME;

        res.locals.mssv =
            process.env.MSSV;

        res.locals.vat =
            vat;

        next();
    }
);


// ==========================
// STATELESS SESSION
// ==========================

app.use(
    session({

        secret:
            process.env.SESSION_SECRET,

        resave: false,

        saveUninitialized: false,

        store:
            MongoStore.create({

                mongoUrl:
                    process.env.MONGODB_URI_WRITE,

                collectionName:
                    "sessions"
            }),

        cookie: {

            maxAge:
                1000 *
                60 *
                60,

            httpOnly: true,

            secure:
                process.env.NODE_ENV ===
                "production"
        }

    })
);


// ==========================
// ROUTES
// ==========================

app.get(
    "/",
    (req, res) => {

        res.redirect(
            "/books"
        );

    }
);


app.use(
    "/",
    bookRoutes
);


// ==========================
// START SERVER
// ==========================

const PORT =
    process.env.PORT || 3000;


app.listen(
    PORT,
    () => {

        console.log(
            `Server running on port ${PORT}`
        );

    }
);
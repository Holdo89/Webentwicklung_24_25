import express from "express";
import cors from "cors";
import session from "express-session";
import loginBasicAuthRouter from "./routes/basicAuth/loginBasicAuth.js";
import signupRouter from "./routes/signup.js";
import loginTokenAuthRouter from "./routes/tokenAuth/loginTokenAuth.js";
import privateareaRouter from "./routes/basicAuth/privatearea.js";
import privateareaTokenRouter from "./routes/tokenAuth/privateareaToken.js";
import logoutRouter from "./routes/basicAuth/logout.js";
import logoutTokenRouter from "./routes/tokenAuth/logoutToken.js";

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());
app.use(
  session({
    secret: "your_secret_key",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

app.use(loginBasicAuthRouter);
app.use(signupRouter);
app.use(loginTokenAuthRouter);
app.use(privateareaRouter);
app.use(privateareaTokenRouter);
app.use(logoutRouter)
app.use(logoutTokenRouter)

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
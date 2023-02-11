import jwt from "jsonwebtoken"
import {accessTokenSecret} from "../controllers/UserController.js";
import {OAuth2Client} from 'google-auth-library';
import User from "../models/User.js";

export default function authenticateJWT(req, res, next) {
    const authHeader = req.headers.authorization;

    if (req.path !== "/login") {

        if (authHeader) {
            const token = authHeader.split(' ')[1];

            jwt.verify(token, accessTokenSecret, (err, user) => {
                if (err) {
                    return res.sendStatus(403);
                }
                req.user = user;
                next();
            });
        } else {
            res.sendStatus(401);
        }
    } else {

        const client = new OAuth2Client();

        /* Might be logged in by Google */

        /* Verity idToken */
        async function verify(token) {
            console.log("Verifying idToken");


            const ticket = await client.verifyIdToken({
                idToken: token,
            });

            /* Ok we have a verified Google user */
            /* Find or created */

            const [user, created] = await User.findOrCreate({
                where: {username: req.body.user.email},
                defaults: {
                    email: req.body.user.email,
                    name: req.body.user.displayName,
                    image: req.body.user.photoURL,
                    external_id: req.body.user.uid,
                }
            });

            req.user = user;
            next()
        }

        verify(req.body.idToken).catch(err => {
            console.log("Error", err);
            return res.sendStatus(403);
        });

    }
};

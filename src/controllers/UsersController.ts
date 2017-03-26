import * as express from 'express';
import * as bodyParser from 'body-parser';

import User from '../models/schemas/User';
import IUser from '../models/interfaces/IUser';

var router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));

router.post('/', (req, res) => {
  console.log('request: ' + JSON.stringify(req.body));
  User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  }, function (err: Response, user: IUser) {
    if (err) {
      return res.status(500).send("Error creating User");
    } else {
      res.status(200).send(user);
    }
  });
});

router.get('/', (req, res) => {
  User.find({}, function(err: Response, users: IUser[]) {
    if (err) {
      return res.status(500).send("Error finding Users");
    } else {
      res.status(200).send(users);
    }
  });
});

export default router;

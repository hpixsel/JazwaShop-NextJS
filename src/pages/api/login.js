import { withIronSessionApiRoute } from "iron-session/next";
import { ironOptions } from "../../lib/iron-config"; 
import axios from "axios";
import shajs from "sha.js"

export default withIronSessionApiRoute(loginRoute, ironOptions);

async function loginRoute(req, res) {
  const pass = shajs('SHA256').update(req.body.password).digest('hex')
  
  const form = new FormData();
  form.append("login", req.body.login);
  form.append("password", pass);
  
  const api = await axios.post(process.env.ENDPOINT + 'user/login', form)

  if (api.data.hash === undefined) {
    res.send({status: 401, message: "Zły login lub hasło"})
    return
  }
  
  req.session.user = {
    hash: api.data.hash,
    user: api.data.user
  }

  await req.session.save()

  if (req.session.user.hash) {
    res.status(200).send(api.data)
  }
}

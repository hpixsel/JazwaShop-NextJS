import { withIronSessionApiRoute } from "iron-session/next";
import { ironOptions } from "../../lib/iron-config"; 
import axios from "axios";
import shajs from "sha.js"

export default withIronSessionApiRoute(registerRoute, ironOptions);

async function registerRoute(req, res) {
  if (req.body.password !== req.body.confPassword) {
    res.send({status: 401, message: "Hasła nie są takie same"})
    return
  }

  const pass = shajs('SHA256').update(req.body.password).digest('hex')
  const form = new FormData();
  form.append("username", req.body.login)
  form.append("password", pass)
  form.append("mail", req.body.email)
  
  if (req.body.facebook) {
    form.append("facebook", req.body.facebook)
  }
  
  if (req.body.phone) {
    form.append("number", req.body.phone)
  }
  
  const api = await axios.post(process.env.ENDPOINT + 'user/register', form)
  console.log(api)

  /* req.session.user = {
    hash: api.data.hash,
    user: api.data.user
  }

  await req.session.save() */

  if (api.status === 200) {
    res.status(200).send(api.data)
  }
}

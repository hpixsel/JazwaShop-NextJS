import { withIronSessionApiRoute } from "iron-session/next";
import { ironOptions } from "../../lib/iron-config"; 
import axios from "axios";

export default withIronSessionApiRoute(logoutRoute, ironOptions);

async function logoutRoute(req, res) {
  const form = new FormData();
  form.append("id", req.body.id);
  form.append("hash", req.body.hash);

  await axios.post(process.env.ENDPOINT + 'user/logout', form)

  await req.session.destroy();

  res.status(200).send({message: 'User Logout'});
}

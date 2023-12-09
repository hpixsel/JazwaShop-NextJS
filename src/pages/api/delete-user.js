import { withIronSessionApiRoute } from "iron-session/next";
import { ironOptions } from "../../lib/iron-config"; 
import axios from "axios";

export default withIronSessionApiRoute(deleteUserRoute, ironOptions);

async function deleteUserRoute(req, res) {
  const form = new FormData();
  form.append("id", req.body.id);
  form.append("hash", req.body.hash);

  const response = await axios.post(process.env.ENDPOINT + 'user/delete', form).then(req.session.destroy())

  res.status(200).send({message: 'User Deleted'});
}

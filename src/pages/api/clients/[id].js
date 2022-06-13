import api from '../../../services/api'

export default async function handler(req, res) {
  const { token } = req.cookies;
  const { id } = req.query

  const { data: client} = await api.get(`clients/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  res.status(200).json(client);
}
import api from '../../services/api'

export default async function handler(req, res) {
  const { token } = req.cookies;
  const { data: clients} = await api.get('clients', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  res.status(200).json(clients)
}
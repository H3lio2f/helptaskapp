import api from '../../services/api'

export default async function handler(req, res) {

  const { token } = req.cookies;
  const { data: status} = await api.get('status', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  res.status(200).json(status)
}
import api from '../../services/api'

export default async function handler(req, res) {
  const { token } = req.cookies;
  const { data: logs} = await api.get('logs', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  res.status(200).json(logs)
}
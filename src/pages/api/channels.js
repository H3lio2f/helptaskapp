import api from '../../services/api'

export default async function handler(req, res) {
  const { token } = req.cookies;
  const { data: channels} = await api.get('channels', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  res.status(200).json(channels)
}
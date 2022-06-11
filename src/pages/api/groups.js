import api from '../../services/api'

export default async function handler(req, res) {
  const { token } = req.cookies;
  const { data: groups} = await api.get('groups', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  res.status(200).json(groups)
}
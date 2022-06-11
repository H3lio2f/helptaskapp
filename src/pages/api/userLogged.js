import api from '../../services/api'

export default async function handler(req, res) {

  const { token } = req.cookies;
  const { data: user} = await api.get('user/me', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  res.status(200).json(user)
}
import api from '../../services/api'

export default async function handler(req, res) {

  const { token } = req.cookies;
  const { data: users} = await api.get('users', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  res.status(200).json(users)
}
import api from '../../services/api'

export default async function handler(req, res) {
  const { token } = req.cookies;
  const { data: types} = await api.get('types', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  res.status(200).json(types)
}
import api from '../../../services/api'

export default async function handler(req, res) {
  const { token } = req.cookies;
  const { id } = req.query

  const { data: task} = await api.get(`tasks/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  res.status(200).json(task);
}
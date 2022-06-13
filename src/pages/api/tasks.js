import api from '../../services/api'

export default async function handler(req, res) {

  const { token } = req.cookies;
  const { data: tasks} = await api.get('tasks', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  res.status(200).json(tasks)
}
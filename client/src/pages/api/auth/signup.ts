// pages/api/auth/signup.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    try {
      const { username, email, password, role } = req.body;
      const response = await axios.post('http://127.0.0.1:3001/api/v1/auth/signup', {
        username,
        email,
        password,
        role,
      });
      res.status(200).json(response.data);
    } catch (error: any) {
      const statusCode = error.response?.status || 500;
      const message = error.response?.data?.message || 'An unexpected error occurred';

      res.status(statusCode).json({ message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default handler;

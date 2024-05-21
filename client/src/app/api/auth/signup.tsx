// pages/api/auth/signup.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    try {
      const { username, email, password, role } = req.body;
      const response = await axios.post('http://localhost:5000/api/auth/signup', {
        username,
        email,
        password,
        role,
      });
      res.status(200).json(response.data);
    } catch (error: any) {
      console.error('Error in API route:', error.response.data);
      res.status(error.response.status).json({ message: error.response.data.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default handler;

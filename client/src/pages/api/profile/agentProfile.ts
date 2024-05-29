import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import FormData from 'form-data';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const formData = new FormData();
    formData.append('companyName', req.body.companyName);
    formData.append('streetName', req.body.streetName);
    formData.append('area', req.body.area);
    formData.append('state', req.body.state);
    formData.append('lga', req.body.lga);

    // if (req.body.logo) {
    //   formData.append('logo', req.body.logo);
    // }

    try {
      const response = await axios.post('http://127.0.0.1:3001/api/v1/agents/profile', formData, {
        headers: {
          ...formData.getHeaders(),
        },
      });
      res.status(200).json(response.data);
    } catch (error: any) {
      const statusCode = error.response?.status || 500;
      const message = error.response?.data?.message || 'An unexpected error occurred';
      res.status(statusCode).json({ message });
      console.log(error);
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default handler;

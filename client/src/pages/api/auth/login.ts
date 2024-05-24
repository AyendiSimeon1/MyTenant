import type { NextApiRequest, NextApiResponse } from "next";
import  axios  from "axios";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

    if (req.method === 'POST') {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        console.log(token); 

        if (!token) {
            return res.status(401).json({ message: 'Authorization token missing' });
        }
        try {
            const response = await axios.post('http://127.0.0.1:3001/api/v1/auth/login', req.body, {
            headers : {
                'Authorization': `Bearer ${token}`
            },    
        });
            res.status(200).json(response.data);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
    
        }

    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
    
};

export default handler;


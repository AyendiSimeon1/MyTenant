export default async function handler(req, res) {
    if (req.method === 'GET') {
      const templates = await prisma.template.findMany();
      res.status(200).json(templates);
    } else {
      res.status(405).end(); // Method Not Allowed
    }
  }
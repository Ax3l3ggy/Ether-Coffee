import type { NextApiRequest, NextApiResponse } from 'next';

type ResponseData = {
  success: boolean;
  file?: {
    id: string;
    name: string;
    type: string;
    uploadedAt: string;
    details: string;
  };
  message?: string;
};

export default function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
  const { id } = req.query;

  // Mock database lookup
  const file = {
    id: id as string,
    name: `sample${id}.wav`,
    type: 'audio/wav',
    uploadedAt: new Date().toISOString(),
    details: `Detailed information for file ${id}`,
  };

  return res.status(200).json({
    success: true,
    file,
  });
}

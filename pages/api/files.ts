import type { NextApiRequest, NextApiResponse } from 'next';

type File = {
  id: string;
  name: string;
  type: string;
  uploadedAt: string;
};

type ResponseData = {
  success: boolean;
  files?: File[];
  message?: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    // Mock data
    const files: File[] = [
      {
        id: '1',
        name: 'sample1.wav',
        type: 'audio/wav',
        uploadedAt: new Date().toISOString(),
      },
      {
        id: '2',
        name: 'sample2.wav',
        type: 'audio/wav',
        uploadedAt: new Date().toISOString(),
      },
    ];

    return res.status(200).json({
      success: true,
      files,
    });
  } catch (err: unknown) {
    console.error('Error fetching files:', err);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
}

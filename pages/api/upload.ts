import type { NextApiRequest, NextApiResponse } from 'next';

type ResponseData = {
  success: boolean;
  message: string;
  uploadId?: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    // Simulate some async processing
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Mock successful response
    return res.status(200).json({
      success: true,
      message: 'File upload processed successfully',
      uploadId: `upload_${Date.now()}`,
    });
  } catch (error) {
    console.error('Upload error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error during upload',
    });
  }
}

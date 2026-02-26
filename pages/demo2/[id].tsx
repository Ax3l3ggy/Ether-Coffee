import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Button, Flex, Heading } from '@radix-ui/themes';
import Link from 'next/link';

type FileDetails = {
  id: string;
  name: string;
  type: string;
  uploadedAt: string;
  details?: string;
};

export default function FileDetails() {
  const router = useRouter();
  const { id } = router.query; // Get the dynamic id from the URL
  const [file, setFile] = useState<FileDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Only fetch when we have an id
    if (id) {
      const fetchFileDetails = async () => {
        try {
          const response = await fetch(`/api/files/${id}`);
          const data = await response.json();
          if (data.success) {
            setFile(data.file);
          }
        } catch (error) {
          console.error('Error fetching file details:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchFileDetails();
    }
  }, [id]); // Re-run when id changes

  if (loading) return <div>Loading...</div>;
  if (!file) return <div>File not found</div>;

  return (
    <Flex direction="column" gap="4" style={{ padding: '2rem' }}>
      <Heading>File Details - {id}</Heading>
      <div>Name: {file.name}</div>
      <div>Type: {file.type}</div>
      <div>Uploaded: {new Date(file.uploadedAt).toLocaleString()}</div>
      <div>Details: {file.details}</div>
      <Link href="/demo2">
        <Button>Back to ID List</Button>
      </Link>
    </Flex>
  );
}

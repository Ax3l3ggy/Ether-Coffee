import { useEffect, useState } from 'react';
import { Table, Button, Flex } from '@radix-ui/themes';
import Link from 'next/link';

type File = {
  id: string;
  name: string;
  type: string;
  uploadedAt: string;
};

export default function Demo1() {
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await fetch('/api/files');
        const data = await response.json();
        if (data.success) {
          setFiles(data.files);
        }
      } catch (error) {
        console.error('Error fetching files:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFiles();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div style={{ padding: '2rem', width: '100%' }}>
      <Flex direction="column" gap="4">
        <h1>Files List</h1>
        <Table.Root>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell>Name</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Type</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Uploaded At</Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {files.map(file => (
              <Table.Row key={file.id}>
                <Table.Cell>{file.name}</Table.Cell>
                <Table.Cell>{file.type}</Table.Cell>
                <Table.Cell>{new Date(file.uploadedAt).toLocaleString()}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
        <Link href="/">
          <Button>Back to Home</Button>
        </Link>
      </Flex>
    </div>
  );
}

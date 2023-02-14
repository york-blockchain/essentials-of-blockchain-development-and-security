import React, { useState, useCallback } from 'react';
import { Layout, Card, TextField, FormLayout, ButtonGroup, Button } from '@shopify/polaris';
import axios from 'axios';

const Download = () => {

    const [hash, setHash] = useState('');
    const [openLink, setOpenLink] = useState('');
    const [downloadLink, setDownloadLink] = useState('');

    const handleChange = useCallback(hash => {
        setHash(hash);
        setOpenLink();
        setDownloadLink();
        axios
            .request(`http://127.0.0.1:8080/ipfs/${hash}`, { responseType: 'blob' })
            .then(({ data }) => {
                const downloadUrl = window.URL.createObjectURL(new Blob([data]));
                setOpenLink(`http://127.0.0.1:8080/ipfs/${hash}`);
                setDownloadLink(downloadUrl);
            })
            .catch(err => {
                console.log(err);
            })
    }, []);

    return (
        <Layout.Section>
            <Card sectioned title="Download file">
                <FormLayout>
                    <TextField label="Input hash" placeholder="Hash" value={hash} onChange={handleChange} />
                    <ButtonGroup>
                        <a
                            href={openLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ textDecoration: 'none' }}
                            download
                        >
                            {openLink ? <Button primary>Open</Button> : <Button disabled primary>Open</Button>}
                        </a>
                        <a
                            href={downloadLink}
                            style={{ textDecoration: 'none' }}
                            download={hash}
                        >
                            {downloadLink ? <Button primary>Download</Button> : <Button disabled primary>Download</Button>}
                        </a>
                    </ButtonGroup>
                </FormLayout>
            </Card>
        </Layout.Section>
    );
}

export default Download;
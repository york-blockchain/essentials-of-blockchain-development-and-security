import React, { useState } from 'react';
import { Layout, Card, DisplayText, TextStyle } from '@shopify/polaris';

import Dropzone from '../Dropzone';

const Upload = () => {

    const [selectedFile, setSelectedFile] = useState();

    return (
        <Layout.Section>
            <Card sectioned title="Upload file">
                <Card.Section>

                    <Dropzone onFileUploaded={setSelectedFile} />
                </Card.Section>
                {selectedFile &&
                    <Card.Section>
                        <DisplayText size="small">
                            Hash generated: <TextStyle variation="positive">{selectedFile}</TextStyle>
                        </DisplayText>
                    </Card.Section>
                }
            </Card>
        </Layout.Section>
    );
}

export default Upload;
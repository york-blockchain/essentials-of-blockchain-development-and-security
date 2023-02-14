import React from 'react';

import { Page, Layout } from '@shopify/polaris';

import Upload from './components/Upload';
import Download from './components/Download';

function App() {
  return (
    <Page title="IPFS Demo">
      <Layout>
        <Upload />
        <Download />
      </Layout>
    </Page>
  );
}

export default App;
### IPFS REACT Prep

Pre-requisites 

- Install go-ipfs from [this](https://dist.ipfs.io/#go-ipfs) link.
- Follow [this](https://docs.ipfs.io/guides/guides/install/) link to install ipfs command-line tools.

- Install Repo run `git clone https://github.com/dhruvinparikh93/ipfs-react-demo.git`
- run `cd ./ipfs-react-demo`
- run `npm install`
- run `npm run start`

### Running IPFS node locally

- run `ipfs daemon`

### Start playing with the decentralised image uploader

### Facing CORS Issues?
Run the following commands on new terminal window.

`ipfs config --json API.HTTPHeaders.Access-Control-Allow-Origin '["*"]'`

`ipfs config --json API.HTTPHeaders.Access-Control-Allow-Methods '["GET", "POST"]'`

`ipfs config --json API.HTTPHeaders.Access-Control-Allow-Headers '["Authorization"]'`

`ipfs config --json API.HTTPHeaders.Access-Control-Expose-Headers '["Location"]'`

`ipfs config --json API.HTTPHeaders.Access-Control-Allow-Credentials '["true"]'`

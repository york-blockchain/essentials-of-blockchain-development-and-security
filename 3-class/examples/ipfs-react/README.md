# IPFS Demo

Demo of IPFS usage using ReactJS and IPFS HTTP client

<p align="center">

<img src="IPFS_Demo.gif" max-height="400">

</p>

## :runner: How to run

Open your terminal in the folder you want to clone the project

```sh
# Clone this repo

# Go to the project folder

# Install dependencies
yarn
```

Now you will need two opened terminals to run the project. One for IPFS and another one for the frontend.

IPFS will run on http://127.0.0.1:5001/

Frontend will run on http://localhost:3000/

Use go-ipfs. You may download and install [here](https://dist.ipfs.io/#go-ipfs). In windows you just have to click on the executable file to run IPFS. In both Linux and Mac you may follow command line of [these steps](https://docs.ipfs.io/how-to/command-line-quick-start/#install-ipfs).

If you are running IPFS locally there is a great chance of having problems due to cross-origin requests, because there will be requests from localhost:3000 to 127.0.0.1:5001. To fix that you may access [IPFS web UI](http://127.0.0.1:5001/webui) and change JSON configuration file adding the following code in API key:

```json
"API": {
	"HTTPHeaders": {
		"Access-Control-Allow-Methods": ["GET","POST","PUT"],
		"Access-Control-Allow-Origin": ["*"]
		}
	}
```

```sh
## In the another terminal ##

# Run the project
yarn start
```

## :book: Resources and technologies :computer:

- [IPFS](https://ipfs.io/) - InterPlanetary File System
- [IPFS http client](https://www.npmjs.com/package/ipfs-http-client) - IPFS for client side
- [ReactJS](https://reactjs.org/) - frontend library
- [Polaris](https://polaris.shopify.com/) - design system
- [React icons](https://www.npmjs.com/package/react-icons) - icons library provider
- [React dropzone](https://react-dropzone.js.org/) - create zone to drop files
- [Detect file type](https://www.npmjs.com/package/detect-file-type) - file type detection
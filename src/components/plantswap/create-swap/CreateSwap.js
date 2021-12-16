import React, { useState } from 'react'
import PhotoCamera from '@material-ui/icons/PhotoCamera'
import './CreateSwap.css'
import { PLANTSWAP } from '../../../PLANTSWAPAPIKEYS'
import { NFTStorage, File } from 'nft.storage'
import {
  TextField,
  Container,
  StylesProvider,
  Typography,
  Button,
  IconButton,
  MenuItem,
  Card,
} from '@material-ui/core'
import { createRef } from 'react'
import { providers } from 'ethers'
import { init } from '@textile/eth-storage'

function CreateSwap({ account, contractData }) {
  const swapTypeRef = createRef()
  const [swapType, setSwapType] = useState('')
  const [description, setDescription] = useState('')
  const [codeHash, setCodeHash] = useState('')
  const [image, setImage] = useState('')
  const [imageName, setImageName] = useState('')
  const [imageType, setImageType] = useState('')

  const saveToTextile = async () => {
    try {
      // connects to ethereum & web3
      await window.ethereum.enable()
      const provider = new providers.Web3Provider(window.ethereum)
      const wallet = provider.getSigner()
      const storage = await init(wallet)

      // creates a file to save data
      const createSwap = new Blob([swapType, description, account], {
        type: 'text/plain',
      })
      const file = new File([createSwap], 'createSwap.txt', {
        type: 'text/plain',
        lastModified: new Date().getTime(),
      })

      // await storage.addDeposit()
      const { cid } = await storage.store(file)
      let formattedCid = cid['/']

      if (cid) {
        setCodeHash(formattedCid)
        return formattedCid
      }
    } catch (err) {
      console.error(err)
    }
  }

  const handleImage = (event) => {
    setImage(event.target.files[0])
    setImageName(event.target.files[0].name)
    setImageType(event.target.files[0].type)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!account) {
      alert('Please connect your wallet!')
    }

    try {
      saveToTextile()
      const client = new NFTStorage({ token: PLANTSWAP })

      const metadata = await client.store({
        name: swapType,
        description: `${description}, ${account}`,
        image: new File([image], imageName, { type: imageType }),
      })

      if (metadata) {
        console.log(' metadata', metadata)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <StylesProvider injectFirst>
      <Container
        className="root-create-swap"
        style={{ minHeight: '40vh', paddingBottom: '6rem' }}
      >
        <div>
          {codeHash ? (
            <Card className="code-hash">
              <Typography gutterBottom className="title">
                Your PlantSwap was created succesfully!
              </Typography>

              <Typography gutterBottom variant="subtitle1">
                Confirmation cid:
              </Typography>
              <p> {codeHash}</p>

              <br />

              <a
                target="_blank"
                rel="noopener noreferrer"
                href={'https://ipfs.io/ipfs/' + codeHash}
              >
                <Button
                  variant="contained"
                  color="primary"
                  className="transaction-btn"
                >
                  See details
                </Button>
              </a>
            </Card>
          ) : (
            ''
          )}

          <br />
          <br />

          <Typography className="title" color="textPrimary" gutterBottom>
            Create A PlantSwap
          </Typography>

          {/* Add Form */}
          <div className="form-container">
            <form className="form" noValidate autoComplete="off">
              <input
                accept="image/*"
                className="input"
                id="icon-button-photo"
                defaultValue={image}
                onChange={handleImage}
                type="file"
              />
              <label htmlFor="icon-button-photo">
                <IconButton color="primary" component="span">
                  <PhotoCamera />
                </IconButton>
              </label>
              <TextField
                fullWidth
                name="swapType"
                select
                label="Plant Swap"
                variant="outlined"
                className="text-field"
                onChange={(e) => setSwapType(e.target.value)}
                defaultValue=""
                ref={swapTypeRef}
              >
                <MenuItem value="Cutting to Cutting">
                  Cutting to Cutting
                </MenuItem>
                <MenuItem value="Plant to Plant">Plant to Plant</MenuItem>
                <MenuItem value="Free">Free</MenuItem>
              </TextField>

              <TextField
                fullWidth
                multiline
                rows={2}
                id="outlined-basic"
                label="Description"
                variant="outlined"
                className="text-field"
                defaultValue={description}
                onChange={(e) => setDescription(e.target.value)}
              />

              <Button
                size="large"
                variant="contained"
                color="primary"
                onClick={handleSubmit}
              >
                Submit
              </Button>
            </form>
          </div>
        </div>
      </Container>
    </StylesProvider>
  )
}

export default CreateSwap

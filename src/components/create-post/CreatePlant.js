import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import PhotoCamera from '@material-ui/icons/PhotoCamera'
import './CreatePlant.css'
import {
  TextField,
  Container,
  StylesProvider,
  Typography,
  Button,
  IconButton,
  MenuItem,
} from '@material-ui/core'
import { NFTStorage, File } from 'nft.storage'
import { createRef } from 'react'
import { apiKey } from '../../APIKEYS'

function CreatePet() {
  // Add variables
  const history = useHistory()
  const [image, setImage] = useState('')
  const petTypeRef = createRef()
  const [petName, setPetName] = useState('')
  const [loading, setLoading] = useState(false)
  const [ownerName, setOwnerName] = useState('')
  const [imageName, setImageName] = useState('')
  const [imageType, setImageType] = useState('')
  const [petType, setPetType] = useState('')

  const handleImage = (event) => {
    setImage(event.target.files[0])
    setImageName(event.target.files[0].name)
    setImageType(event.target.files[0].type)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      setLoading(true)
      console.log(loading)

      const client = new NFTStorage({ token: apiKey })
      const metadata = await client.store({
        name: petName,
        description: `${ownerName}, ${petType}`,
        image: new File([image], imageName, { type: imageType }),
      })
      if (metadata) {
        history.push('/')
      }
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  return (
    <StylesProvider injectFirst>
      <Container
        className="root-create-pet"
        style={{ minHeight: '70vh', paddingBottom: '3rem' }}
      >
        <div>
          <Typography className="title" color="textPrimary" gutterBottom>
            Add a photo of your plant
          </Typography>

          {/* Add Form */}
          {image ? (
            <img
              src={URL.createObjectURL(image)}
              alt="pet"
              className="img-preview"
            />
          ) : (
            ''
          )}
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
                id="outlined-basic"
                label="Plant's name"
                variant="outlined"
                className="text-field"
                defaultValue={petName}
                onChange={(e) => setPetName(e.target.value)}
              />
              <TextField
                fullWidth
                id="outlined-basic"
                label="Owner's name"
                variant="outlined"
                className="text-field"
                defaultValue={ownerName}
                onChange={(e) => setOwnerName(e.target.value)}
              />
              <TextField
                fullWidth
                name="petType"
                select
                label="Plant Type"
                variant="outlined"
                className="text-field"
                onChange={(e) => setPetType(e.target.value)}
                defaultValue=""
                ref={petTypeRef}
              >
                <MenuItem value="Aquatic plants">Aquatic plants</MenuItem>
                <MenuItem value="Bulbs">Bulbs</MenuItem>
                <MenuItem value="Cacti and succulents">
                  Cacti and succulents
                </MenuItem>
                <MenuItem value="Climbers">Climbers</MenuItem>
                <MenuItem value="Ferns">Ferns</MenuItem>
                <MenuItem value="Carnivorous plants">
                  Carnivorous plants
                </MenuItem>
                <MenuItem value="Alpines">Alpines</MenuItem>
                <MenuItem value="Annuals and biennials">
                  Annuals and biennials
                </MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </TextField>
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

export default CreatePet

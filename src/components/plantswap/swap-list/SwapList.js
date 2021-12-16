import React, { useState, useEffect } from 'react'
import './SwapList.css'
import {
  Typography,
  Button,
  IconButton,
  Grid,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
} from '@material-ui/core'
import Avatar from '@mui/material/Avatar'
import { red } from '@mui/material/colors'
import FavoriteIcon from '@mui/icons-material/Favorite'
import ShareIcon from '@mui/icons-material/Share'
import MoreVertIcon from '@mui/icons-material/MoreVert'

import { Link } from 'react-router-dom'
import { PLANTSWAP } from '../../../PLANTSWAPAPIKEYS'
import CircularStatic from '../../commons/CircularProgressWithLabel'

function SwapList({ account, contractData }) {
  const [loading, setLoading] = useState(false)
  const [swapsData, setSwapsData] = useState([])

  useEffect(() => {
    const loadSwapList = async () => {
      try {
        setLoading(true)
        let cids = await fetch('https://api.nft.storage', {
          headers: {
            Authorization: `Bearer ${PLANTSWAP}`,
            'Content-Type': 'application/json',
          },
        })
        cids = await cids.json()
        console.log(' cids', cids)
        const temp = []
        for (let cid of cids.value) {
          if (cid?.cid) {
            let data = await fetch(
              `https://ipfs.io/ipfs/${cid.cid}/metadata.json`,
            )
            data = await data.json()
            let dataSplit = data.description.split(',')
            data.description = dataSplit[0]
            data.userAccount = dataSplit[1]

            const getImage = (ipfsURL) => {
              if (!ipfsURL) return
              ipfsURL = ipfsURL.split('://')
              return 'https://ipfs.io/ipfs/' + ipfsURL[1]
            }
            data.image = await getImage(data.image)
            data.cid = cid.cid
            data.created = cid.created
            temp.push(data)
          }
        }
        setSwapsData(temp)
        setLoading(false)
      } catch (error) {
        console.log(error)
        setLoading(false)
      }
    }
    loadSwapList()
  }, [])

  return (
    <div style={{ minHeight: '40vh' }}>
      {loading ? (
        <CircularStatic />
      ) : (
        <div>

          <Grid container spacing={24}>
            {swapsData.length ? (
              swapsData.map((swap, index) => (
                <Grid item md={3} spacing={1} className="swap-card">
                  <Card sx={{ maxWidth: 245 }}>
                    <CardHeader
                      className="card-header-swap"
                      avatar={
                        <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                          R
                        </Avatar>
                      }
                      action={
                        <IconButton aria-label="settings">
                          <MoreVertIcon />
                        </IconButton>
                      }
                      title={swap.name}
                      subheader="September 1, 2021"
                    />
                    <CardMedia
                      component="img"
                      height="194"
                      image={swap.image}
                      alt="Paella dish"
                    />
                    <CardContent>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        className="card-header-swap"
                      >
                        {swap.description}
                      </Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                      <IconButton aria-label="add to favorites">
                        <FavoriteIcon />
                      </IconButton>
                      <IconButton aria-label="share">
                        <ShareIcon />
                      </IconButton>
                      <Button
                        variant="contained"
                        size="small"
                        component={Link}
                        // to={`/pet-details/${pet.cid}`}
                        // className="swap-msg-btn"
                      >
                        Send message
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))
            ) : (
              <h2>No PlantSwaps Yet...</h2>
            )}
          </Grid>
        </div>
      )}
    </div>
  )
}

export default SwapList

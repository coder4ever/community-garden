import React from 'react'
import './PlantswapContainer.css'
import { Container, StylesProvider, Typography, Chip } from '@material-ui/core'
import CreateSwap from '../create-swap/CreateSwap'
import SwapList from '../swap-list/SwapList'

function PlantswapContainer({ account, contractData }) {
  return (
    <StylesProvider injectFirst>
      <Container style={{ minHeight: '70vh', paddingBottom: '3rem' }}>
        <CreateSwap account={account} contractData={contractData} />
        <div className="flex-container">
          <Typography gutterBottom className="title" id="title-swap">
            Current PlantSwap List
          </Typography>
          <div className="label-btns-swap">
            <Chip size="medium" label="All swaps" color="primary" clickable />
            <Chip size="medium" label="Free" clickable />
            <Chip size="medium" label="PlantToPlant" clickable />
            <Chip size="medium" label="Cuttings" clickable />
          </div>
        </div>
        <SwapList account={account} contractData={contractData} />
      </Container>
    </StylesProvider>
  )
}

export default PlantswapContainer

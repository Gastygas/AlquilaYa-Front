import React from 'react'
import Grid from '../Grid/Grid'
import Card from '../Card/Card'
import IProperty from '@/Interfaces/IProperties'

const GridProperties = async () => {
    
  const url = "http://localhost:3001/property"

  const res = await fetch(url,{
      method:"GET",
      cache:"no-store"
    })
    if(!res) throw new Error("Can not get all properties")
  
  const properties = await res.json()
  return (
    <Grid>
    {properties.filter((prop: IProperty) => prop.propertyStatus === "approved").map((property: IProperty) => (
      <Card key={properties.id} property={property} />
    ))}
  </Grid>
  )
}

export default GridProperties
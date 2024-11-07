"use client"
import React, { useEffect, useState } from 'react'
import Grid from '../Grid/Grid'
import Card from '../Card/Card'
import IProperty from '@/Interfaces/IProperties'
import { getPropertyById, getUserData } from '@/services/dataUserService';
import { IUser } from '@/Interfaces/IUser'
import styles from "./GridFav.module.css"

const GridFav = () => {

        const [properties, setProperties] = useState<IProperty[]>([]);
        const [userData, setUserData] = useState<IUser | null>(null);
        const [error, setError] = useState<string | null>(null);
      
        useEffect(() => {
          const fetchUserData = async () => {
            const data = await getUserData();
            if (data) {
              setUserData(data);
              const fetchedProperties = await Promise.all(data.favoriteProperties.map((id: string) => getPropertyById(id))); 
              const validProperties = fetchedProperties.filter(property => property !== null) as IProperty[];
              setProperties(validProperties);
            } else {
              setError("Failed to load user data");
            }
          };
      
          fetchUserData();
        }, []);
      
        if (!userData || userData?.favoriteProperties.length === 0) {
          return ( <div>
          <h4 className={styles.center}>No tienes Propiedades favoritas</h4>
          </div>);
        }
  
  return (
    <Grid>
{properties.map((property: IProperty, i) => (
   <Card key={i} property={property} />))}
  </Grid>
  )
}

export default GridFav
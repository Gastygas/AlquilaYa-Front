"use client";
import React, { useEffect, useState } from "react";
import Grid from "../Grid/Grid";
import Card from "../Card/Card";
import IProperty from "@/Interfaces/IProperties";

const GridProperties = () => {
  const [properties, setProperties] = useState<IProperty[]>([]);
  const [userId, setUserId] = useState<string | null>(null);

  const fetchProperties = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACK_URL}/property`, {
        method: "GET",
        cache: "no-store"
      });
      if (!res.ok) throw new Error("Can not get all properties");

      const data = await res.json();
      setProperties(data);
    } catch (err: any) {
      alert("Error en base de datos, intenta nuevamente");
    }
  };

  useEffect(() => {
    fetchProperties();

    // Obtener el userId del usuario logueado si está presente en localStorage
    const storedData = localStorage.getItem("user");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setUserId(parsedData.user.id);
    }
  }, []);

  return (
    <Grid>
      {properties
        .filter((prop: IProperty) => 
          prop.propertyStatus === "approved" && 
          prop.user.status === true &&
          (!userId || prop.user.id !== userId) // Filtra si el usuario no es el propietario
        )
        .map((property: IProperty) => (
          <Card key={property.id} property={property} />
        ))}
    </Grid>
  );
};

export default GridProperties;
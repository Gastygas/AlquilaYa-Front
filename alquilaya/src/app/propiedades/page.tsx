import Card from "@/Components/Card/Card"
import Grid from "@/Components/Grid/Grid"
import Header from "@/Components/Header/Header"
import IProperty from "@/Interfaces/IProperties"

const propiedades = async() => {

  const url = "http://localhost:3001/property"

  const res = await fetch(url,{
      method:"GET",
      cache:"no-store"
    })
    if(!res) throw new Error("Can not get all properties")
  
  const properties = await res.json()

  return (
    <div><Header/>
    <main className="container">
    <div className="padding-section">
      <h1 className="mb-20">Propiedades Disponibles</h1>
      <Grid>
        {properties.map((property: IProperty) => (
          <Card key={properties.id} property={property} />
        ))}
      </Grid>
    </div>
  </main>
  </div>
  )
}

export default propiedades
import Card from "@/Components/Card/Card"
import Grid from "@/Components/Grid/Grid"
import IProperty from "@/Interfaces/IProperties"
import mockProperties from "@/mocks/properties"

const propiedades = () => {



  return (
    <main className="container">
    <div className="padding-section">
      <h1 className="mb-20">Propiedades Disponibles</h1>
      <Grid>
        {mockProperties.map((property: IProperty, i:number) => (
          <Card key={i} property={property} />
        ))}
      </Grid>
    </div>
  </main>
  )
}

export default propiedades
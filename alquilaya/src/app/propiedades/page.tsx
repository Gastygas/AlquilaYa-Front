import GridProperties from "@/Components/GridProperties/GridProperties"
import Header from "@/Components/Header/Header"

const propiedades = async () => {

  return (
    <div><Header />
      <main className="container">
        <div className="padding-section">
          <h1 className="mb-20">Propiedades Disponibles</h1>
          <GridProperties />
        </div>
      </main>
    </div>
  )
}

export default propiedades;
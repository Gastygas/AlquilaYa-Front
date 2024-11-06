import GridProperties from "@/Components/GridProperties/GridProperties"
import Header from "@/Components/Header/Header"

const propiedadesFav = async () => {

  return (
    <div><Header />
      <main className="container">
        <div className="padding-section">
          <h1 className="mb-20">Tus Propiedades Favoritas</h1>
          <GridProperties />
        </div>
      </main>
    </div>
  )
}

export default propiedadesFav;
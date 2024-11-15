import GridFav from "@/Components/GridPropertiesFav/GridFav";
import Header from "@/Components/Header/Header"

const propiedadesFav = async () => {

  return (
    <div><Header />
      <main className="container">
        <div className="padding-section">
          <h1 className="mb-20">Tus Propiedades Favoritas</h1>
          <GridFav />
        </div>
      </main>
    </div>
  )
}

export default propiedadesFav;
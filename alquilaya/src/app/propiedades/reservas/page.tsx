import GridBooks from "@/Components/gridBooks/gridBooks";
import GridProperties from "@/Components/GridProperties/GridProperties"
import GridFav from "@/Components/GridPropertiesFav/GridFav";
import Header from "@/Components/Header/Header"

const propiedadesFav = async () => {

  return (
    <div><Header />
      <main className="container">
        <div className="padding-section">
          <h1 className="mb-20">Tus Reservas</h1>
          <GridBooks />
        </div>
      </main>
    </div>
  )
}

export default propiedadesFav;
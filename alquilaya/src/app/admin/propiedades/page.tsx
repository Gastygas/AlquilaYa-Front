import HeaderAdmin from '@/Components/HeaderAdmin/HeaderAdmin'
import styles from "./propiedades.module.css"
import Link from 'next/link';
import ApprovedProperties from '@/Components/ApprovedProperties/ApprovedProperties';

const page = async () => {


  const url = "http://localhost:3001";

  const res = await fetch(url + "/property", {
    method: "GET",
    cache: 'no-store',
  });
  if (!res.ok) throw new Error('Error al obtener los usuarios');

  const properties = await res.json()


  return (
    <div>
      <HeaderAdmin />
      <div className='container'>
        <div className='padding-section'>
          <h1 className="pb-12 text-primary">Propiedades</h1>
      <ApprovedProperties properties={properties}/>
        <Link href="/admin"><button className={styles.button}>Volver</button></Link>
      </div>
      </div>
    </div>
  )
}

export default page
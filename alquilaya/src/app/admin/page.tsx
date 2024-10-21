import HeaderAdmin from '@/Components/HeaderAdmin/HeaderAdmin'
import styles from "./admin.module.css"

const page = () => {
    return (
        <div>
            <HeaderAdmin />
            <div className='container'>
                <div className='padding-section'>
                    <h1 className="pb-12 text-primary">Dashboard</h1>
                    <div className='grid grid-cols-3 gap-8 w-full'>
                        <div className='bg-primary p-6 rounded-lg'>
                            <h3 className='text-white text-center'>Usuarios Registrados</h3>
                            <h4 className='text-white py-4 text-center'>500 usuarios activos</h4>
                            <button className={styles.button}>Ver Más</button>
                        </div>
                        <div className='bg-primary p-6 rounded-lg'>
                            <h3 className='text-white text-center'>Propiedades activas</h3>
                            <h4 className='text-white py-4 text-center'>500 Propiedades</h4>
                            <button className={styles.button}>Ver Más</button>
                        </div>
                        <div className='bg-primary p-6 rounded-lg'>
                            <h3 className='text-white text-center'>Total transacciones</h3>
                            <h4 className='text-white py-4 text-center'>$500 USD</h4>
                            <button className={styles.button}>Ver Más</button>
                        </div>
                        
                        


                    </div>
                </div>
            </div>
        </div>
    )
}

export default page
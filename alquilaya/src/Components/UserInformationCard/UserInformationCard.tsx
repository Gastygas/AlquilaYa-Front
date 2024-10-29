import styles from "./UserInformationCard.module.css"

const UserInformationCard = () => {
  return (
    <div className='w-2/3 flex flex-col bg-cyan-100  p-4 rounded-2xl justify-center align-middle'>
    <h3 className='text-primary text-center opacity-1 pb-4'>Tu Información</h3>
    <div className='flex flex-row'>
      <div className='w-1/2 flex flex-col opacity-80'>
        <h4 className='pt-4 text-center font-bold'>Nombre</h4>
        <h4 className='pb-4 text-center'>Ejemplo1</h4>
        <h4 className='pt-4 text-center font-bold'>Email</h4>
        <h4 className='pb-4 text-center'>Ejemplo1</h4>
        <h4 className='pt-4 text-center font-bold'>Dni</h4>
        <h4 className='pb-4 text-center'>Ejemplo1</h4>
      </div>
      <div className='w-1/2 flex flex-col opacity-80'>
        <h4 className='pt-4 text-center font-bold'>País</h4>
        <h4 className='pb-4 text-center'>Ejemplo1</h4>
        <h4 className='pt-4 text-center font-bold'>Dirección</h4>
        <h4 className='pb-4 text-center'>Ejemplo1</h4>
        <h4 className='pt-4 text-center font-bold'>Teléfono</h4>
        <h4 className='pb-4 text-center'>Ejemplo1</h4>
      </div>

    </div>
    <button className={styles.editButton}>Editar</button>
  </div>
  )
}

export default UserInformationCard
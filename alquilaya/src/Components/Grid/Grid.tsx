import styles from "./Grid.module.css"

const Grid = ({children}: { children: React.ReactNode }) => {
  return (
    <div className={styles.gridCard}>
        {children}
    </div>
  )
}

export default Grid
export default function Row({ item, deleteTask }) {
  return (
    <li>
      {item.description}
      <button className='deleteButton' onClick={()=>
        deleteTask(item.id)}>remove</button>
    </li>
  )
}
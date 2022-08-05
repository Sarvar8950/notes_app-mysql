import React from 'react'

export default function Card({ details, setcount, setname, setdescription, seteditcardcount }) {
  function deletebtn(id) {
    fetch(`http://localhost:8001/deletedata/${id}`, {
      method: "DELETE"
    })
      .then(() => alert("Card deleted succesfully"))
    setcount(1)
  }

  function editbtn(id) {
    fetch(`http://localhost:8001/finddata/${id}`)
      .then((res) => res.json())
      .then((res) => {
        alert("Add data to field which you want to update")
        setname(res[0].name)
        setdescription(res[0].body)
        seteditcardcount(id)
        setcount(1)
      })
  }

  return (
    <div className='cardbox' key={details.id}>
      <p>Subject : {details.name} </p>
      <p>Details : {details.body} </p>
      <button className='deletebtn' onClick={() => deletebtn(details.id)}>Delete</button>
      <button className='editbtn' onClick={() => editbtn(details.id)}>Edit</button>
    </div>
  )
}

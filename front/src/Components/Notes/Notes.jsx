import React from "react"
import Card from "./Card"
import "./notes.css"

export function Notes() {
    const [name, setname] = React.useState("")
    // const [author, setauthor] = React.useState("")
    const [description, setdescription] = React.useState("")
    const [notesdata, setnotesdata] = React.useState([])
    const [count, setcount] = React.useState(0)
    const [editcardcount, seteditcardcount] = React.useState("")

    React.useEffect(() => {
        fetch('http://localhost:8001/')
            .then((res) => res.json())
            .then((res) => setnotesdata(res))
            .catch(() => alert("You backend is not working"))
        setcount(0)
    }, [count])

    function createcard(e) {
        e.preventDefault();
        if (name === "" || description === "") {
            alert("All fields are required")
            return;
        }
        var obj = {
            name: name,
            body: description
        }
        if (editcardcount !== "") {
            try {
                fetch(`http://localhost:8001/updatedata/${editcardcount}`, {
                    method: "PUT",
                    body: JSON.stringify(obj),
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    }
                })
                .then(() => setcount(1))
                alert("Data updated successfully :)")
                setdescription("")
                setname("")
                seteditcardcount("")
            } catch (error) {
                alert(error)
            }
        } else {
            try {
                fetch('http://localhost:8001/adddata', {
                    method: 'POST',
                    body: JSON.stringify(obj),
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    }
                })
                    .then(res => res.json())
                    .then(() => setcount(1))
                alert("Data added successfully :)")
                setdescription("")
                setname("")
            } catch (error) {
                alert(error)
            }
        }
    }

    return (
        <section className="notesapp">
            <h1 style={{ textAlign: "center", fontSize: "50px", marginTop: "30px" }}>Notes App</h1>
            <div className="notes">
                <form className="form" onSubmit={createcard}>
                    <input type="text" placeholder="Subject" value={name} name="author" onChange={e => setname(e.target.value)} />
                    {/* <input type="text" placeholder="About" value={author} name="about" onChange={e => setauthor(e.target.value)} /> */}
                    <input type="text" placeholder="details" value={description} name="details" onChange={e => setdescription(e.target.value)} />
                    <input type="submit" className="submitbtn" value="Create Card" />
                </form>
                <div className="cards" >
                    {
                        notesdata.length === 0 ? <h1>No data to show</h1> : notesdata.map((ele) => <Card key={ele.id} details={ele} setcount={setcount} setdescription={setdescription} setname={setname} seteditcardcount={seteditcardcount} />)
                    }
                </div>
            </div>
        </section>
    )
}
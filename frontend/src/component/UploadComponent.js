import React, {useState} from 'react'

export default function UploadComponent() {
  
  const [image, setImage] = useState({ preview: '', data: '' })
  const [status, setStatus] = useState('')
  const handleSubmit = async (e) => {
    e.preventDefault()
    let formData = new FormData()
    formData.append('file', image.data)
    const response = await fetch('http://localhost:5001/image', {
      method: 'POST',
      body: formData,
    })
    if (response){
      if(response.statusText==="Created")
        setStatus("ID uploaded successfully")
      else
        setStatus("ID uploading failed")
    }
    const data = await response.json();
    console.log(data)
    alert(`id: ${data.id}`)
  }

  const handleFileChange = (e) => {
    const img = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    }
    setImage(img)
  }

  return (
    <div className='App'>
      <h3 style={{marginTop:"10vh",marginLeft:"2vw"}}>Upload to Identity Card</h3>
      {image.preview && <img src={image.preview} width='400' height='300' />}
      <hr></hr>
      <form onSubmit={handleSubmit} style={{marginLeft:"2vw"}}>
        <input type='file' name='file' onChange={handleFileChange}></input>
        <button type='submit'>Submit</button>
      </form>
      {status && <h4>{status}</h4>}
    </div>
  )
}

import {useState} from "react";
function Admin() {
    const [movieName, setMovieName] = useState("");
    const [Genre, setGenre] = useState("");
    const [movieLength, setMovieLength] = useState("");
    const [Certification, setCertification] = useState("");
    const [Format, setFormat] = useState("");
    const [Image, setImage] = useState("");
  return (
    <div>
      <h1>Admin Page</h1>
      <p>Welcome to the admin page. Here you can manage the application.</p>
      <label>Movie Name:<input type="text" value={movieName} required placeholder="Enter a movie name" onChange={(event)=>setMovieName(event.target.value)}/></label>
      <label>Genre:<input type="text" value={Genre} required placeholder="Enter a Genre" onChange={(event)=>setGenre(event.target.value)}/></label>
      <label>Certification:<select value={Certification} onChange={(event)=>setCertification(event.target.value)}>
        <option value="U">U</option>
        <option value="UA">UA</option>
        <option value="A">A</option>
      </select></label>
      <label>Format:<select value={Format} onChange={(event)=>setFormat(event.target.value)}>
        <option value="2D">2D</option>
        <option value="3D">3D</option>
        <option value="4DX">4DX</option>
      </select></label>
      <label>Movie Length:<input type="text" min="1" value={movieLength} placeholder="e.g. 148" onChange={(event)=>setMovieLength(event.target.value)} required/></label>
      <label>Image:<input type="text" value={Image} placeholder="Enter image URL" onChange={(event)=>setImage(event.target.value)}/></label>
    </div>
  );
}

export default Admin;
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
function Admin() {
  const [movies, setMovies] = useState(() => {
    const savedMovies = localStorage.getItem("movies");
    return savedMovies ? JSON.parse(savedMovies) : [];
  });
  const [imageError, setImageError] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    localStorage.setItem("movies", JSON.stringify(movies));
  }, [movies]);
  const [movieName, setMovieName] = useState("");
  const [editingMovieId, setEditingMovieId] = useState(null);
  const [Genre, setGenre] = useState("");
  const [movieLength, setMovieLength] = useState("");
  const [Certification, setCertification] = useState("U");
  const [Format, setFormat] = useState("2D");
  const [Image, setImage] = useState("");
  const [shows, setShows] = useState([{ id: Date.now(), showtime: "", hallName: "" }]);
  const inputClass = "mt-2 min-h-11 w-full rounded-xl border border-white/15 bg-slate-950 px-3 text-white outline-none focus:border-violet-400 focus:ring-4 focus:ring-violet-400/10";
  const labelClass = "block text-sm font-semibold text-slate-300";
//function to handle editing a movie
function handleEditMovie(movie) {
  setEditingMovieId(movie.id);
  setMovieName(movie.name);
  setGenre(movie.genre);
  setMovieLength(
    String(
      Number.parseInt(movie.length.split("h")[0], 10) * 60 +
      Number.parseInt(movie.length.split("h")[1], 10)
    )
  );
  setCertification(movie.certification);
  setFormat(movie.format);
  setImage(movie.image);
  setShows(
    movie.shows.map((show) => ({
      ...show,
      id: Date.now() + Math.random(),
    }))
  );
}

function handleCancelEdit() {
  const confirmed_edit=window.confirm("Are you sure you want to cancel editing? Unsaved changes will be lost.");
  if(!confirmed_edit)return;
  setEditingMovieId(null);
  setMovieName("");
  setGenre("");
  setMovieLength("");
  setCertification("U");
  setFormat("2D");
  setImage("");
  setShows([{ id: Date.now(), showtime: "", hallName: "" }]);
}
  //Function to handle deleting a movie
  function handleDeleteMovie(movieID){
    const confirmed=window.confirm("Are you sure you want to delete this movie?");
    if (confirmed) {
      setMovies((prevMovies) => prevMovies.filter((movie) => movie.id !== movieID));
    }
    else{
      return;
    }
  }
  // Function to handle adding a new showtime
  function handleAddShow() {
    setShows((prevShows) => [...prevShows, { id: Date.now(), showtime: "", hallName: "" }]);
  }
  // Function to handle form submission
  function handleSubmit(event) {
    event.preventDefault();
    if (!movieName.trim() || !Genre.trim()) {
  alert("Please enter the movie name and genre.");
  return;
}
const duplicateMovie = movies.some(
  (movie) =>
    movie.name.trim().toLowerCase() ===
      movieName.trim().toLowerCase() &&
    movie.id !== editingMovieId
);
if (duplicateMovie) {
  alert("A movie with this name already exists.");
  return;
}
    if (!movieLength || Number(movieLength) <= 0) {
      alert("Please enter a valid movie length.");
      return;
    }
    const hasInvalidShow = shows.some(
  (show) => !show.showtime || !show.hallName.trim()
);

if (hasInvalidShow) {
  alert("Please enter a showtime and hall name for every show.");
  return;
}

const showKeys = shows.map(
  (show) => `${show.showtime}-${show.hallName.trim().toLowerCase()}`
);

if (new Set(showKeys).size !== showKeys.length) {
  alert("Duplicate showtime and hall combinations are not allowed.");
  return;
}
    const movie = {
      id: Date.now(),
      name: movieName.trim(),
      genre: Genre.trim(),
      length: `${Math.floor(movieLength / 60)}h ${movieLength % 60}m`,
      certification: Certification,
      format: Format,
      image: Image.trim(),
      shows: shows.map((show) => ({
        showtime: show.showtime,
        hallName: show.hallName.trim()
      })),
    };
    if (editingMovieId !== null) { setMovies((previousMovies) => previousMovies.map((existingMovie) =>existingMovie.id === editingMovieId ? { ...movie, id: editingMovieId }: existingMovie));
} else {
  setMovies((previousMovies) => [...previousMovies, movie]);
}
setMovieName("");
setGenre("");
setMovieLength("");
setCertification("U");
setFormat("2D");
setImage("");
setShows([
  {
    id: Date.now(),
    showtime: "",
    hallName: "",
  },
]);
setEditingMovieId(null);
  }
  return (
    <main className="min-h-screen bg-slate-950 px-4 py-10 text-white sm:px-8">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-violet-300">Management</p>
            <h1 className="mt-2 text-3xl font-black sm:text-4xl">Admin dashboard</h1>
            <p className="mt-2 text-slate-400">Add movies and manage their screenings.</p>
          </div>
          <button className="rounded-xl border border-white/20 px-4 py-2.5 font-semibold transition hover:bg-white/10" onClick={() => navigate("/")}>Go to movies</button>
        </header>

        <form className="rounded-3xl border border-white/10 bg-slate-900 p-6 sm:p-8" onSubmit={handleSubmit}>
          <h2 className="text-xl font-bold">{editingMovieId!==null ? "Edit movie" : "Add a movie"}</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <label className={labelClass}>Movie name
              <input className={inputClass} type="text" value={movieName} required placeholder="Enter a movie name" onChange={(event) => setMovieName(event.target.value)} />
            </label>
            <label className={labelClass}>Genre
              <input className={inputClass} type="text" value={Genre} required placeholder="e.g. Action" onChange={(event) => setGenre(event.target.value)} />
            </label>
            <label className={labelClass}>Certification
              <select className={inputClass} value={Certification} onChange={(event) => setCertification(event.target.value)}>
                <option value="U">U</option><option value="UA">UA</option><option value="A">A</option>
              </select>
            </label>
            <label className={labelClass}>Format
              <select className={inputClass} value={Format} onChange={(event) => setFormat(event.target.value)}>
                <option value="2D">2D</option><option value="3D">3D</option><option value="4DX">4DX</option>
              </select>
            </label>
            <label className={labelClass}>Duration (minutes)
              <input className={inputClass} type="number" min="1" value={movieLength} placeholder="e.g. 148" onChange={(event) => setMovieLength(event.target.value)} required />
            </label>
            <label className={labelClass}>Poster image URL
              <input className={inputClass} type="url" required value={Image} placeholder="https://example.com/poster.jpg" onChange={(event) => {setImage(event.target.value);setImageError(false);}} />
{Image.trim() && (
  <>
    <img
      src={Image.trim()}
      alt="Movie preview"
      className="mt-3 h-40 w-28 rounded-lg object-cover"
      onError={() => setImageError(true)}
      onLoad={() => setImageError(false)}
    />
    {imageError && (
      <p className="mt-2 text-sm text-red-400">
        Unable to load image. Please check the URL.
      </p>
    )}
  </>
)}            
            </label>
          </div>

          <div className="mt-8">
            <h3 className="text-lg font-bold">Showtimes and halls</h3>
            <div className="mt-4 grid gap-4">
              {shows.map((show, index) => (
                <div className="grid gap-4 rounded-2xl border border-white/10 bg-slate-950/60 p-4 sm:grid-cols-2" key={show.id}>
                  <label className={labelClass}>Showtime
                    <input className={inputClass} type="time" value={show.showtime} required onChange={(event) => {
                      const updatedShows = shows.map((item, i) => i === index ? { ...item, showtime: event.target.value } : item);
                      setShows(updatedShows);
                    }} />
                  </label>
                  <label className={labelClass}>Hall name
                    <input className={inputClass} type="text" value={show.hallName} required placeholder="Enter a hall name" onChange={(event) => {
                      const updatedShows = shows.map((item, i) => i === index ? { ...item, hallName: event.target.value } : item);
                      setShows(updatedShows);
                    }} />
                  </label>
                  <button type="button" onClick={()=>{
                  if(shows.length===1){
                    alert("A movie must have at least one show.");
                    return;
                  }
                    setShows((prevShows) => prevShows.filter((shows) => shows.id !== show.id))}} className="rounded-lg bg-red-500/80 px-4 py-2 text-sm font-semibold hover:bg-red-400">Remove show</button>
                </div>
              ))}
            </div>
            <div className="mt-5 flex flex-wrap gap-3">
              <button className="rounded-xl border border-violet-300/40 px-5 py-3 font-semibold text-violet-200 transition hover:bg-violet-300/10" type="button" onClick={handleAddShow}>+ Add show</button>
              {editingMovieId!==null&&(<button type="button" onClick={handleCancelEdit} className="rounded-xl bg-gray-600 px-5 py-3 font-bold transition hover:bg-gray-500">Cancel</button>)}
              <button className="rounded-xl bg-violet-500 px-5 py-3 font-bold transition hover:bg-violet-400" type="submit">{editingMovieId!==null?"Save Changes":"Add Movie"}</button>
            </div>
          </div>
        </form>

        <section className="mt-12">
          <div className="mb-5 flex items-end justify-between gap-4">
            <h2 className="text-2xl font-black">Existing movies</h2>
            <span className="text-sm text-slate-400">{movies.length} movie{movies.length === 1 ? "" : "s"}</span>
          </div>
          {movies.length === 0 ? (
            <p className="rounded-2xl border border-dashed border-white/15 p-8 text-center text-slate-400">No movies have been added yet.</p>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {movies.map((movie) => (
                <article className="flex gap-4 rounded-2xl border border-white/10 bg-slate-900 p-4" key={movie.id}>
                  <img className="h-32 w-24 shrink-0 rounded-xl bg-slate-800 object-cover" src={movie.image} alt={`${movie.name} poster`} />
                  <div className="min-w-0">
                    <h3 className="truncate text-lg font-bold">{movie.name}</h3>
                    <p className="mt-1 text-sm text-slate-400">{movie.genre} · {movie.certification} · {movie.format} · {movie.length}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {(movie.shows || []).map((show, index) => (
                        <span className="rounded-lg bg-white/5 px-2.5 py-1.5 text-xs text-slate-300" key={`${movie.id}-${index}`}>
                          {show.showtime} · {show.hallName}
                        </span>
                      ))}
                    </div>
                    <div className="mt-5 flex flex-wrap gap-3">
                    <button type="button" onClick={()=>handleEditMovie(movie)} className="mt-4 rounded-xl bg-amber-500/80 px-4 py-2 text-sm font-semibold hover:bg-amber-400">Edit Movie</button>
                    <button type="button" onClick={()=>handleDeleteMovie(movie.id)} className="mt-4 rounded-xl bg-red-500/80 px-4 py-2 text-sm font-semibold hover:bg-red-400">Delete Movie</button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </main >
  );
}

export default Admin;
import { useNavigate } from "react-router-dom";
function Moviecard(props) {
  const navigate = useNavigate();
  return (
    <article className="group overflow-hidden rounded-2xl border border-white/10 bg-slate-900 shadow-xl shadow-black/20 transition duration-300 hover:-translate-y-1 hover:border-violet-400/50">
      <div className="h-72 overflow-hidden bg-slate-800">
        <img
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          src={props.image}
          alt={`${props.title} poster`}
          loading="lazy"
        />
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <h2 className="text-xl font-bold text-white">{props.title}</h2>
          <span className="shrink-0 rounded-full bg-violet-400/10 px-3 py-1 text-xs font-semibold text-violet-200">
            {props.certification} · {props.format}
          </span>
        </div>
        <button
          className="mt-5 w-full rounded-xl bg-violet-500 px-4 py-3 font-bold text-white transition hover:bg-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-300 focus:ring-offset-2 focus:ring-offset-slate-900"
          onClick={() => navigate(`/moviedetails/${props.id}`)}
        >
          View movie
        </button>
      </div>
    </article>
  );
}

export default Moviecard;

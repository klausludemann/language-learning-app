import { Link } from "react-router-dom";
import { GRAMMAR } from "../data/grammar";

export default function Grammar() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Grammatik & Aussprache</h1>
      <p className="text-sm text-zinc-500">
        Kurze Erklärungen auf Deutsch. Du kannst sie jederzeit nachschlagen – auch unterwegs offline.
      </p>
      <ul className="space-y-3">
        {GRAMMAR.map((g) => (
          <li key={g.id}>
            <Link to={`/grammatik/${g.id}`} className="card block hover:ring-terra-500">
              <div className="font-semibold">{g.title}</div>
              <div className="mt-1 text-sm text-zinc-500">{g.summary}</div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

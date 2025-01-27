import Link from "next/link";
import { Articles } from "@/app/types/articles";
import { getArticles } from "@/app/_services/articles/articles";

export default async function ArticleList() {
  const article: Articles[] = await getArticles();

  return (
    <>
      {article.map((ticket) => (
        <div key={ticket.id} className="card my-5">
          <Link href={`articles/${ticket.id}`}>
            <h3>{ticket.title}</h3>
            <p>{ticket.body?.slice(0, 200)}...</p>
          </Link>
        </div>
      ))}
      {article.length === 0 && (
        <p className="text-center">There are no open article, yay!</p>
      )}
    </>
  );
}

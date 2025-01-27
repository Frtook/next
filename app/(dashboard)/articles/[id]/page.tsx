import DeleteButton from "./DeleteButton";
import { getArticle } from "@/app/_services/articles/articles";
import { getEmailServer } from "@/app/_services/user/userServer";
import LikeButton from "./LikeButton";
import { Articles } from "@/app/types/articles";

interface Params {
  id: string;
}
export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}) {
  const { id } = await params;

  const article = await getArticle(id);

  return {
    title: `Dojo Helpdesk | ${article?.title || "not found article"}`,
  };
}

export default async function TicketDetails({
  params,
}: {
  params: Promise<Params>;
}) {
  const { id } = await params;
  const article: Articles = await getArticle(id);
  const email = (await getEmailServer()) || "";
  console.log(article.user_likes);
  return (
    <main>
      <nav>
        <h2 className="mr-auto">Articles Details</h2>
        {email === article.user_email && <DeleteButton id={article.id} />}
      </nav>
      <div className="card">
        <h3>{article.title}</h3>
        <small>Created by {article.user_email}</small>
        <p>{article.body}</p>

        <LikeButton
          isLikes={article.user_likes.includes(email) ? true : false}
          likes={article.like}
          id={article.id}
        />
      </div>
    </main>
  );
}

import { addArticle } from "../actions";
import SubmitButton from "@/components/SubmitButton";

export default function CreateForm() {
  return (
    <form action={addArticle} className="w-1/2">
      <label>
        <span>Title:</span>
        <input required type="text" name="title" />
      </label>
      <label>
        <span>Body:</span>
        <textarea required name="body" />
      </label>
      <SubmitButton />
    </form>
  );
}

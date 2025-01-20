import { addTiket } from "../actions";
import SubmitButton from "@/components/SubmitButton";

export default function CreateForm() {
  return (
    <form action={addTiket} className="w-1/2">
      <label>
        <span>Title:</span>
        <input required type="text" name="title" />
      </label>
      <label>
        <span>Body:</span>
        <textarea required name="body" />
      </label>
      <label>
        <span>Priority:</span>
        <select name="priority">
          <option value="low">Low Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="high">High Priority</option>
        </select>
      </label>
      <SubmitButton />
    </form>
  );
}

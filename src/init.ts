import { fade } from "./defaultAnims";
import { Present, Slide } from "./elements";

export default function init() {
  customElements.define("p-present", Present);
  customElements.define("p-slide", Slide);
  fade.define();
}

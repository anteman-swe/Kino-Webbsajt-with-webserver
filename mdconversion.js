import { marked } from "marked";

export default function convertMD2HTML (mdinput) {
    return marked.parse(mdinput);
}

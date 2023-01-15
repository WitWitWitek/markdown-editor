import { useSelector, useDispatch } from "react-redux";
import { selectFileData } from "../../context/fileDataSlice";
import { setFileContent } from "../../context/fileDataSlice";
import { selectPreviewState } from "../../context/navSlice";

export default function MarkdownForm() {
    const dispatch = useDispatch()
    const { fileName, fileContent } = useSelector(selectFileData);
    const isPreviewOpen = useSelector(selectPreviewState);

    return (
          <form className={`${isPreviewOpen ? 'preview-active' : ''}`}>
            <label htmlFor="markdown-editor" className="markdown__field-label">Markdown
            </label>
            <textarea 
            name="markdown-editor" 
            id="markdown-editor"
            value={fileContent}
            onChange={(e) => dispatch(setFileContent(e.target.value))}
            ></textarea>
          </form>
    )
}

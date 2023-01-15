import ReactMarkdown from "react-markdown"
import { selectFileData } from "../../context/fileDataSlice";
import { useSelector } from "react-redux";
import { selectPreviewState } from "../../context/navSlice";
import { MarkdownTags } from "./MarkdownTags/MarkdownTags";
import { useEffect } from "react";

export default function MarkdownOutput() {
    const { fileContent } = useSelector(selectFileData);
    const isPreviewOpen = useSelector(selectPreviewState);
    
    return (
        <div className={`markdown__output ${isPreviewOpen ? 'preview-active' : ''}`}>
                <label htmlFor="preview" className="markdown__field-label">Preview
                </label>
                <section className="markdown__output-field">
                    <div className="markdown__output-field-wrapper">
                        <ReactMarkdown id="preview" components={MarkdownTags}>
                            {fileContent}
                        </ReactMarkdown>
                    </div>
                </section>
        </div>
    )
}

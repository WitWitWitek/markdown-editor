/* eslint-disable @next/next/no-img-element */
import { Prism as SyntaxHighlighter} from "react-syntax-highlighter"
import { duotoneSpace as theme } from 'react-syntax-highlighter/dist/cjs/styles/prism';
export const MarkdownTags = {
    code(code) {
        const { children, className } = code;
        const language = className ? className.split('-')[1] : 'js';
        return (
            <SyntaxHighlighter
                // eslint-disable-next-line react/no-children-prop
                children={children}
                language={language}
                PreTag="div"
                style={theme}
            />
        )
    },
    h1(h1) {
        return <h1 className="markdown__h1">{h1.children}</h1>
    },
    h2(h2) {
        return <h2 className="markdown__h2">{h2.children}</h2>
    },
    h3(h3) {
        return <h3 className="markdown__h3">{h3.children}</h3>
    },
    h4(h4) {
        return <h4 className="markdown__h4">{h4.children}</h4>
    },
    h5(h5) {
        return <h5 className="markdown__h5">{h5.children}</h5>
    },
    h6(h6) {
        return <h6 className="markdown__h6">{h6.children}</h6>
    },
    p (paragraph) {
        if (paragraph.node.children[0].tagName === 'img') {
            return <p className="markdown__img-p">{paragraph.children}</p>
        }
        return <p className="markdown__p">{paragraph.children}</p>
    },
    blockquote(blockquote) {
        return <blockquote className="markdown__blockquote">{blockquote.children}</blockquote>
    },
    ol (ol) {
        return <ol className="markdown__ordered-list">{ol.children}</ol>
    },
    ul(ul) {
        return <ul className="markdown__unordered-list">{ul.children}</ul>
    },
    a(link) {
        return <a href={link.href} className="markdown__link">{link.children}</a>
    },
    img(img) {
        return <img className="markdown__img" src={`${img.src}`} alt={img.alt} />
    }
}
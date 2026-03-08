import { OutputBlockData } from "@editorjs/editorjs";

export const getHtmlInEditor = (blocks: OutputBlockData[] = []) => {
    if (!blocks || blocks.length === 0) {
        return;
    }

    let html = "";

    blocks.forEach((block) => {
        switch (block.type) {
            case "paragraph":
                html += `<p>${block.data.text}</p>`;
                break;
            default:
                break;
        }
    });

    return html;
};

export const convertHtmlToEditorBlocks = (html: string) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");

    const blocks: OutputBlockData[] = [];

    doc.body.childNodes.forEach((node) => {
        if (!(node instanceof Element)) return;

        const block: OutputBlockData = {
            data: "",
            type: "",
        };

        if (node.nodeName === "P") {
            block.type = "paragraph";
            block.data = {
                text: node.innerHTML,
            };
        }

        blocks.push(block);
    });

    return blocks;
};

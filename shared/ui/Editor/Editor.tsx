"use client";

import React from "react";
import { OutputData } from "@editorjs/editorjs";
import { createReactEditorJS } from "react-editor-js";

import styles from "./index.module.scss";

import { EDITOR_TRANSLATE } from "@/shared/const";

const ReactEditorJS = createReactEditorJS();

type Props = {
    placeholder?: string;
    id?: string | undefined;
    minHeight?: number;
    title?: string;
    editorRef: React.MutableRefObject<EditorCore | null>;
    onReady?: () => void;
};

export interface EditorCore {
    destroy(): Promise<void>;
    clear(): Promise<void>;
    save(): Promise<OutputData>;
    render(data: OutputData): Promise<void>;
    get dangerouslyLowLevelInstance(): any | null;
}

const Editor: React.FC<Props> = (props) => {
    const {
        placeholder = "",
        id = "",
        minHeight = 60,
        title,
        editorRef,
        onReady,
        ...editorProps
    } = props;

    const handleInitialize = React.useCallback(
        (instance: EditorCore) => {
            editorRef.current = instance;
        },
        [editorRef],
    );

    return (
        <div className={styles.editorWrapper}>
            {title && <p className={styles.editorTitle}>{title}</p>}

            <ReactEditorJS
                onInitialize={handleInitialize}
                minHeight={minHeight}
                holder={id}
                placeholder={placeholder}
                i18n={EDITOR_TRANSLATE}
                onReady={onReady}
                {...editorProps}
            >
                <div id={id} className={styles.editor}></div>
            </ReactEditorJS>
        </div>
    );
};

Editor.displayName = "editor";

export default Editor;

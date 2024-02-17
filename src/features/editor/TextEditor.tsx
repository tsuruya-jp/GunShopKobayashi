import {
  AtomicBlockUtils,
  DraftHandleValue,
  EditorState,
  RichUtils,
  SelectionState,
  convertFromRaw,
  convertToRaw,
} from "draft-js";
import Editor from "@draft-js-plugins/editor";
import createInlineToolbarPlugin, { Separator } from "@draft-js-plugins/inline-toolbar";
import "draft-js/dist/Draft.css";
import "@draft-js-plugins/inline-toolbar/lib/plugin.css";
import { ComponentType, Dispatch, useEffect, useMemo, useState } from "react";
import {
  ItalicButton,
  BoldButton,
  UnderlineButton,
  HeadlineOneButton,
  HeadlineTwoButton,
  HeadlineThreeButton,
} from "@draft-js-plugins/buttons";
import createLinkPlugin from "@draft-js-plugins/anchor";
import "@draft-js-plugins/anchor/lib/plugin.css";
import createImagePlugin from "@draft-js-plugins/image";
import "@draft-js-plugins/image/lib/plugin.css";

const TextEditor = ({ content, update }: { content: any; update: Dispatch<any> }) => {
  const [plugins, InlineToolbar, LinkButton] = useMemo(() => {
    const linkPlugin = createLinkPlugin({ placeholder: "http://..." });
    const imagePlugin = createImagePlugin();
    const inlineToolbarPlugin = createInlineToolbarPlugin();
    return [
      [inlineToolbarPlugin, linkPlugin, imagePlugin],
      inlineToolbarPlugin.InlineToolbar,
      linkPlugin.LinkButton,
    ];
  }, []);

  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());

  useEffect(() => {
    if (Object.keys(content).length !== 0) {
      const contentState = convertFromRaw(content);
      const newEditorState = EditorState.createWithContent(contentState);
      setEditorState(newEditorState);
    }
  }, [content]);

  useEffect(() => {
    const contentState = editorState.getCurrentContent();
    const raw = convertToRaw(contentState);
    update(raw);
  }, [editorState, update]);

  const insertImage = (url: any) => {
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity("image", "IMMUTABLE", { src: url });
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const nextEditorState = EditorState.set(editorState, {
      currentContent: contentStateWithEntity,
    });
    const newEditorState = AtomicBlockUtils.insertAtomicBlock(nextEditorState, entityKey, " ");
    setEditorState(newEditorState);
  };

  const handleDroppedFiles = (selection: SelectionState, files: any): DraftHandleValue => {
    insertImage(files[0].name);
    return "handled";
  };

  const handleKeyCommand = (command: any, editorState: EditorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);

    if (newState) {
      setEditorState(newState);
      return "handled";
    }

    return "not-handled";
  };

  interface OverrideContentProps {
    getEditorState: () => EditorState;
    setEditorState: (editorState: EditorState) => void;
    onOverrideContent: (content: ComponentType<unknown> | undefined) => void;
  }

  type OverrideOnOverrideContent = (
    content: ComponentType<OverrideContentProps> | undefined
  ) => void;

  return (
    <>
      <div className="prose max-w-none m-auto bg-white h-[calc(100vh/2.25)] w-full overflow-scroll rounded-md border border-gray-300 p-3 shadow-sm sm:text-sm">
        <Editor
          placeholder="入力してください"
          editorState={editorState}
          onChange={setEditorState}
          plugins={plugins}
          handleDroppedFiles={handleDroppedFiles}
          handleKeyCommand={handleKeyCommand}
        />
        <InlineToolbar>
          {(externalProps) => (
            <>
              <ItalicButton {...externalProps} />
              <BoldButton {...externalProps} />
              <UnderlineButton {...externalProps} />
              <Separator />
              <HeadlineOneButton {...externalProps} />
              <HeadlineTwoButton {...externalProps} />
              <HeadlineThreeButton {...externalProps} />
              <LinkButton
                {...externalProps}
                onOverrideContent={externalProps.onOverrideContent as OverrideOnOverrideContent}
              />
            </>
          )}
        </InlineToolbar>
      </div>
    </>
  );
};

export default TextEditor;

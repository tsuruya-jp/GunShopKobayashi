import {
  AtomicBlockUtils,
  DraftHandleValue,
  EditorState,
  RichUtils,
  SelectionState,
  convertFromRaw,
  convertToRaw,
} from 'draft-js';
import Editor, { createEditorStateWithText } from '@draft-js-plugins/editor';
import createInlineToolbarPlugin, { Separator } from '@draft-js-plugins/inline-toolbar';
import 'draft-js/dist/Draft.css';
import '@draft-js-plugins/inline-toolbar/lib/plugin.css';
import { ComponentType, useEffect, useMemo, useState } from 'react';
import {
  ItalicButton,
  BoldButton,
  UnderlineButton,
  HeadlineOneButton,
  HeadlineTwoButton,
  HeadlineThreeButton,
} from '@draft-js-plugins/buttons';
import createLinkPlugin from '@draft-js-plugins/anchor';
import '@draft-js-plugins/anchor/lib/plugin.css';
import createImagePlugin from '@draft-js-plugins/image';
import '@draft-js-plugins/image/lib/plugin.css';

const TextEditor = () => {
  const [plugins, InlineToolbar, LinkButton] = useMemo(() => {
    const linkPlugin = createLinkPlugin({ placeholder: 'http://...' });
    const imagePlugin = createImagePlugin();
    const inlineToolbarPlugin = createInlineToolbarPlugin();
    return [[inlineToolbarPlugin, linkPlugin, imagePlugin], inlineToolbarPlugin.InlineToolbar, linkPlugin.LinkButton];
  }, []);

  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());

  useEffect(() => {
    setEditorState(createEditorStateWithText(''));
  }, []);

  const [readonly, setReadOnly] = useState(false);

  useEffect(() => {
    const raw = localStorage.getItem('test');
    if (raw) {
      const contentState = convertFromRaw(JSON.parse(raw));
      const newEditorState = EditorState.createWithContent(contentState);
      setEditorState(newEditorState);
    }
  }, []);

  const insertImage = (url: any) => {
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity('image', 'IMMUTABLE', { src: url });
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const nextEditorState = EditorState.set(editorState, {
      currentContent: contentStateWithEntity,
    });
    const newEditorState = AtomicBlockUtils.insertAtomicBlock(nextEditorState, entityKey, ' ');
    setEditorState(newEditorState);
  };

  const handleDroppedFiles = (selection: SelectionState, files: Blob[]): DraftHandleValue => {
    insertImage(files[0].name);
    return 'handled';
  };

  const saveContent = () => {
    const contentState = editorState.getCurrentContent();
    const raw = convertToRaw(contentState);
    localStorage.setItem('test', JSON.stringify(raw, null, 2));
  };

  const toggleBold = (event: any) => {
    event.preventDefault();
    setEditorState(RichUtils.toggleInlineStyle(editorState, 'BOLD'));
  };

  const handleKeyCommand = (command: any, editorState: EditorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);

    if (newState) {
      setEditorState(newState);
      return 'handled';
    }

    return 'not-handled';
  };

  const toggleHeaderOne = (event: any) => {
    event.preventDefault();
    setEditorState(RichUtils.toggleBlockType(editorState, 'header-one'));
  };

  interface OverrideContentProps {
    getEditorState: () => EditorState;
    setEditorState: (editorState: EditorState) => void;
    onOverrideContent: (content: ComponentType<unknown> | undefined) => void;
  }

  type OverrideOnOverrideContent = (content: ComponentType<OverrideContentProps> | undefined) => void;

  return (
    <>
      <div className='prose max-w-none m-auto bg-white h-[calc(100vh-144px)] w-full overflow-scroll rounded-md border border-gray-300 p-3 shadow-sm sm:text-sm'>
        <Editor
          placeholder='入力してください'
          editorState={editorState}
          onChange={setEditorState}
          plugins={plugins}
          readOnly={readonly}
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
      <div className='prose max-w-none m-auto'>
        {!readonly && (
          <button className='rounded-md border border-gray-300 px-2' onClick={saveContent}>
            保存
          </button>
        )}
        {readonly ? (
          <button className='rounded-md border border-gray-300 px-2' onClick={() => setReadOnly(false)}>
            Edit
          </button>
        ) : (
          <button className='rounded-md border border-gray-300 px-2' onClick={() => setReadOnly(true)}>
            ReadOnly
          </button>
        )}
        <button className='rounded-md border border-gray-300 px-2' onClick={toggleBold}>
          太字
        </button>
        <button className='rounded-md border border-gray-300 px-2' onClick={toggleHeaderOne}>
          h1
        </button>
      </div>
    </>
  );
};

export default TextEditor;

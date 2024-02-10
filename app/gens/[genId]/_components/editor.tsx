"use client";

import { useCallback, useState } from "react";
import { useOthers, useSelf } from "@/liveblocks.config";
import { UserAvatar } from "./avatar";
import { Editor } from "@monaco-editor/react";
import { editor } from "monaco-editor";
import { BlockNoteEditor } from "@blocknote/core";
import {
  BlockNoteView,
  Theme,
  useBlockNote,
  lightDefaultTheme,
  darkDefaultTheme,
} from "@blocknote/react";
import "@blocknote/react/style.css";

const MAX_SHOWN_USERS = 2;

export const EditorComponent = () => {
  const info = useSelf((me) => me.info);
  const users = useOthers();
  const currentUser = useSelf();
  const hasMoreUsers = users.length > MAX_SHOWN_USERS;

  const [editorRef, setEditorRef] = useState<editor.IStandaloneCodeEditor>();

  const defaultCode = `
    const solvePuzzle = () => {
      // Write your puzzle-solving logic here
    };
  `;

  const handleOnMount = useCallback((e: editor.IStandaloneCodeEditor) => {
    setEditorRef(e);
  }, []);

  const editor: BlockNoteEditor = useBlockNote({});

  const darkModifiedTheme = {
    ...darkDefaultTheme,
    borderRadius: 0,
  } satisfies Theme;

  const modifiedTheme = {
    light: lightDefaultTheme,
    dark: darkModifiedTheme,
  };

  return (
    <div className="h-full w-full">
      <div className="w-full h-full flex flex-col items-center ">
        <div className="w-3/4 h-1/2 flex items-center justify-center">
          <div className="flex h-full  w-[150px] mr-2 p-2 bg-slate-600">
            {users.slice(0, MAX_SHOWN_USERS).map(({ connectionId, info }) => (
              <UserAvatar
                key={connectionId}
                src={info?.picture}
                name={info?.name}
                fallback={info?.name?.[0] || "T"}
              />
            ))}
            {currentUser && (
              <UserAvatar
                src={currentUser.info?.picture}
                name={`${currentUser.info?.name} (You)`}
                fallback={currentUser.info?.name?.[0] || "T"}
              />
            )}
          </div>
          <div className="w-full h-full bg-slate-500 ">
            <Editor
              onMount={handleOnMount}
              height="100%"
              width="100hw"
              theme="vs-dark"
              defaultLanguage="typescript"
              defaultValue={defaultCode}
              options={{
                tabSize: 2,
                padding: { top: 20 },
              }}
            />
          </div>
        </div>
        <div className="w-3/4 h-1/4 mt-4">
          <BlockNoteView
            editor={editor}
            theme={modifiedTheme}
            className="rounded-xs h-full"
          />
        </div>
      </div>
    </div>
  );
};

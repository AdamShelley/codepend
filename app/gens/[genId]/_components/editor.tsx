"use client";

import { useCallback, useState } from "react";
import { useOthers, useSelf } from "@/liveblocks.config";
import { UserAvatar } from "./avatar";
import { Editor } from "@monaco-editor/react";
import { editor } from "monaco-editor";
import {
  useBlockNote,
  lightDefaultTheme,
  darkDefaultTheme,
  BlockNoteView,
} from "@blocknote/react";
import "@blocknote/react/style.css";
import { Button } from "@/components/ui/button";

const MAX_SHOWN_USERS = 2;

export const EditorComponent = () => {
  const users = useOthers();
  const currentUser = useSelf();

  const [editorRef, setEditorRef] = useState<editor.IStandaloneCodeEditor>();
  const [codeOutput, setCodeOutput] = useState<string>("");
  const [initialContent, setInitialContent] = useState<string>(
    `// Welcome to the code editor!`
  );

  const defaultCode = `const solvePuzzle = () => {
    // Write your puzzle-solving logic here
};`;

  const handleOnMount = useCallback((e: editor.IStandaloneCodeEditor) => {
    setEditorRef(e);
  }, []);

  const editor = useBlockNote({});

  const darkModifiedTheme = {
    ...darkDefaultTheme,
    borderRadius: 2,
  };

  const modifiedTheme = {
    light: lightDefaultTheme,
    dark: darkModifiedTheme,
  };

  const runCode = () => {
    if (editorRef) {
      const code = editorRef.getValue();
      try {
        const output = eval(code);
        setCodeOutput(output);

        console.log(codeOutput);
      } catch (e) {
        console.error(e);
      }
    }
  };

  return (
    <div className="flex flex-col h-full w-full p-4 bg-gray-100 text-gray-800">
      <div className="flex-1 overflow-y-scroll">
        <BlockNoteView
          editor={editor}
          theme={modifiedTheme}
          className="flex-grow-1 w-full h-full"
          initialContent={initialContent}
        />
      </div>
      <div className="flex flex-1 min-h-[30%] mb-4">
        <div className="flex-grow mr-4">
          <Editor
            onMount={handleOnMount}
            height="100%"
            theme="vs-dark"
            defaultLanguage="typescript"
            defaultValue={defaultCode}
            options={{
              tabSize: 2,
              padding: { top: 20 },
              minimap: { enabled: false },
            }}
            className="rounded-md shadow-lg overflow-hidden h-full"
          />
        </div>
        <div className="w-1/4">
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
      </div>
      <div className="flex-1 min-h-[20%]">
        <div className="bg-gray-700 text-white rounded-md shadow-lg h-full p-4">
          Console area - Implement your console output here
          <Button onClick={runCode}>Run Code</Button>
          <div className="mt-4">
            <pre>{codeOutput}</pre>
          </div>
        </div>
      </div>
    </div>
  );
};

import {FiDownload, FiCopy} from 'react-icons/fi';
import {useState} from 'react';
import copy from 'copy-to-clipboard';
import Tippy from '@tippyjs/react';
import toast, {Toaster} from 'react-hot-toast';

export default function Editor({updateProgram}) {
  const [program, setProgram] = useState();
  const [downloadLink, setDownloadLink] = useState('');

  // function for generating file and set download link
  const makeTextFile = (_var) => {
    try {
      // This creates the file.
      const data = new Blob([_var], {type: 'text/plain'});
      // this part avoids memory leaks
      if (downloadLink !== '') window.URL.revokeObjectURL(downloadLink);
      // update the download link state
      setDownloadLink(window.URL.createObjectURL(data));
    } catch (error) {
      // console.error(error);
    }
  };

  return (
    <>
      <div className="flex items-center justify-between gap-6 px-6 h-10 min-h-10">
        <Toaster position="top-center" reverseOrder={false} />
        <span className="text-sm font-bold opacity-80 capitalize">code</span>
        <div className="flex items-center gap-6">
          <Tippy
            arrow={false}
            content={
              <span className="bg-neutral-gray-2 tracking-tight font-medium text-xs py-0.5 px-1.5 rounded-md">
                Download code
              </span>
            }
          >
            <a href={downloadLink} download="code.txt">
              <FiDownload className="text-lg stroke-1 hover:text-neutral-green-2" />
            </a>
          </Tippy>
          <Tippy
            arrow={false}
            content={
              <span className="bg-neutral-gray-2 tracking-tight font-medium text-xs py-0.5 px-1.5 rounded-md">
                Copy code
              </span>
            }
          >
            <button
              onClick={() => {
                copy(program, {
                  debug: false,
                  format: 'text/plain',
                });
                toast.success('content copied to clipboard.');
              }}
            >
              <FiCopy className="text-lg stroke-1 hover:text-neutral-green-2" />
            </button>
          </Tippy>
        </div>
      </div>
      <textarea
        spellCheck={false}
        onChange={(e) => {
          updateProgram(e.target.value);
          setProgram(e.target.value);
          makeTextFile(program);
        }}
        className="flex-1 flex p-6 bg-transparent resize-none focus:outline-none text-base font-mono"
      />
    </>
  );
}

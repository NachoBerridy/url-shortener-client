/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import PrimaryButton from "../atoms/PrimaryButton";
import InputField from "../atoms/InputField";
import { useEffect, useState } from "react";
import { User } from "../../interfaces/user";

interface PrimaryInputProps {
  placeholder: string;
  buttonText: string;
  onClick: (url: string, name: string) => void;
  user: User | null;
}

export default function UrlForm({ placeholder, buttonText, onClick, user }: PrimaryInputProps) {

  const [url, setUrl] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [showModal, setShowModal] = useState<boolean>(false);
  const [disabledFirstButton, setDisabledFirstButton] = useState<boolean>(true);
  const [disabledSecondButton, setDisabledSecondButton] = useState<boolean>(true);
  const [urlError, setUrlError] = useState<string | null>(null);

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log('submit')
    e.preventDefault();
    onClick(url, name);
  }

  const isValidURL = (urlString: string) => {
    const patronURL = new RegExp(
      // valida protocolo
      '^(https?:\\/\\/)?' +
      // valida nombre de dominio
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' +
      // valida OR direccion ip (v4)
      '((\\d{1,3}\\.){3}\\d{1,3}))' +
      // valida puerto y path
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' +
      // valida queries
      '(\\?[;&a-z\\d%_.~+=-]*)?' +
      // valida fragment locator
      '(\\#[-a-z\\d_]*)?$', 'i');
    return !!patronURL.test(urlString);
  }

  useEffect(() => {
    if (url != '' && user) {
      if (isValidURL(url)) {
        setDisabledFirstButton(false);
        setUrlError(null);
      } else {
        setDisabledFirstButton(true);
        setUrlError('Invalid URL');
      }
    } else {
      setDisabledFirstButton(true);
      setUrlError(null);
    }
  }, [url, user]);

  useEffect(() => {
    if (name != '') {
      setDisabledSecondButton(false);
    } else {
      setDisabledSecondButton(true);
    }
  }, [name]);

  return (
    <form
      className="dark:bg-white bg-slate-800 shadow-lg rounded p-4 mb-4 flex gap-0"
    >
      <div className="flex flex-1 gap-0 flex-col">
        <InputField
          type="text"
          placeholder={placeholder}
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          error={urlError}
        />
      </div>
      <PrimaryButton
        text={buttonText}
        onClick={() => setShowModal(true)}
        disabled={disabledFirstButton}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className={`fixed inset-0 z-50 bg-black bg-opacity-50 ${showModal ? 'block' : 'hidden'}`}
        tabIndex={-1}
        onClick={() => {
          console.log('click')
          setShowModal(false)
        }}
      >
        <div
          className="dark:bg-white bg-slate-800 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-4 rounded flex flex-col gap-4 justify-center"
          onClick={(e) => e.stopPropagation()}
          role="document"
        >
          <h2 id="modal-title" className="text-2xl text-gray-500 dark:text-blue-950 font-bold">Add a name to your URL</h2>
          <InputField
            type="text"
            placeholder="Enter a name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <PrimaryButton
            text="Save"
            onClick={(e) => {
              e.stopPropagation();
              setShowModal(false);
              handleSubmit(e);
            }}
            disabled={disabledSecondButton}
          />
        </div>
      </div>

    </form>
  )
}
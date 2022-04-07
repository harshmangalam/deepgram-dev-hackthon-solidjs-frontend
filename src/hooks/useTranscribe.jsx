import { createStore } from "solid-js/store";

export default function useTranscribe() {
  const [store, setStore] = createStore({
    file: null,
    loading: false,
    transcribe: "",
  });

  function handleFileChange(e) {
    const file = e.target.files[0];
    setStore("file", file);
    transcribeLocalFile(file);
  }
  async function transcribeLocalFile(file) {
    try {
      const body = new FormData();
      body.append("file", file);
      setStore("loading", true);
      const res = await fetch(
        "http://localhost:4000/transcribe/pre-recorded-file",
        {
          method: "POST",
          body,
        }
      );
      const data = await res.json();
      console.log(data);
      setStore("transcribe", data.results.channels[0].alternatives[0].transcript);
    } catch (error) {
      console.log(error);
    } finally {
      setStore("loading", false);
    }
  }
  return {
    store,
    handleFileChange,
    transcribeLocalFile,
  };
}

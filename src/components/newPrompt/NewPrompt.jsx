import { useEffect, useRef, useState } from "react";
import "./newPrompt.scss";
import Upload from "../upload/Upload";
import { IKImage } from "imagekitio-react";
import model from "../../lib/gemini";
import Markdown from "react-markdown";
import { QueryClient, useMutation, useQueryClient } from "@tanstack/react-query";

const NewPrompt = ({data}) => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [img, setImg] = useState({
    isLoading: false,
    error: "",
    dbData: {},
    aiData: {},
  });

  const chat = model.startChat({
    history:[],
    generationConfig:{
      // maxOutputTokens:100,
    }
  })
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current.scrollIntoView({ behaviour: "smooth" });
  }, [question, answer, img.dbData]);

  const queryClient =  useQueryClient()

   
   const mutation = useMutation({
    mutationFn: ()=>{
       return fetch(`${import.meta.env.VITE_API_URL}/api/chats/${data._id}`, {
        method: "PUT",
        credentials:"include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question: question.length ? question : undefined,
        answer,
        img : img.dbData?.filePath || undefined,
        }),
      }).then((res) => res.json());
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.
      invalidateQueries({ queryKey: ["chat", data._id] })
      .then(()=>{
        setQuestion("")
        setAnswer("")
        setImg({
          isLoading: false,
          error: "",
          dbData: {},
          aiData: {},
        })
      });
    },
    onError:(err)=>{
      console.log(err);
    }
  })

  const handleSubmit = async (e) => {
    e.preventDefault();

    const text = e.target.text.value;
    if (!text) return;
    add(text);
    
  };

  const add = async (text) => {
    setQuestion(text);

    try{

      const result = await chat.sendMessageStream(
        Object.entries(img.aiData).length ? [img.aiData, text] : [text]
        );
        let accumulatedText = "";
        for await (const chunk of result.stream) {
          const chunkText = chunk.text();
          
          for (let i = 0; i < chunkText.length; i++) {
            // Her bir karakteri yazmadan önce belirli bir gecikme
            await new Promise((resolve) => setTimeout(resolve, 10)); // 50 ms gecikme
            
            // Gelen karakteri mevcut metne ekleyip güncelle
            accumulatedText += chunkText[i];
            setAnswer(accumulatedText);
          }
        }
        

        mutation.mutate();
        
      }
    catch(err){
      console.log(err);
    }
    
  };

  return (
    <div className="newPrompt">
      {img.isLoading && <span>Loading..</span>}
      {img.dbData?.filePath && (
        <IKImage
          urlEndpoint={import.meta.env.VITE_IMAGE_KIT_ENDPOINT}
          path={img.dbData?.filePath}
          width={300}
          transformation={[{ width: 300 }]}
        />
      )}
      {question && <div className="message user">{question}</div>}
      {answer && (
        <div className="message ">
          <Markdown>{answer}</Markdown>
        </div>
      )}
      <div className="endChat" ref={endRef}></div>
      <form action="" className="newForm" onSubmit={handleSubmit}>
        <Upload setImg={setImg} />
        <input id="file" type="file" multiple={false} hidden />
        <input type="text" name="text" placeholder="Ask me anything..." />
        <button>
          <img src="/arrow.png" alt="" />
        </button>
      </form>
    </div>
  );
};

export default NewPrompt;

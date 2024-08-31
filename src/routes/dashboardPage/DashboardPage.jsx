import { QueryClient, useMutation, useQueryClient } from "@tanstack/react-query";
import "./dashboardPage.scss";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";
import { useEffect } from "react";
const DashboardPage = () => {
  const { getToken } = useAuth();
  const [token,setUserToken] = useState("")
  
  useEffect(()=>{
    const takeToken = async ()=>{
      const takenToken = await getToken();
      setUserToken(takenToken)
      console.log(takenToken);
    }
    takeToken()
  },[])

  const queryClient =  useQueryClient()
  const navigate = useNavigate()

   
   const mutation = useMutation({
    mutationFn: (text)=>{
       return fetch(`${import.meta.env.VITE_API_URL}/api/chats`, {
        method: "POST",
        credentials:"include",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ text: text }),
      }).then((res) => res.json());
    },
    onSuccess: (id) => {
    
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['userChats'] });
      navigate(`/dashboard/chats/${id}`)
    },
  })

  

  const handleSubmit = async(e)=>{
    
      e.preventDefault();
      const text = e.target.text.value
      if(!text) return
      
      mutation.mutate(text)
    
  }
  return (
    <div className="dashboardPage">
      <div className="texts">
        <div className="logo">
          <img src="/logo2.png" alt="" />
          <h1>SmartAI</h1>
        </div>
        <div className="options">
          <div className="option">
            <img src="/chat.png" alt="" />
            <span>Create a New Chat</span>
          </div>
          <div className="option">
            <img src="/image.png" alt="" />
            <span>Analyze images</span>
          </div>
          <div className="option">
            <img src="/code.png" alt="" />
            <span>Help me with my code</span>
          </div>
        </div>
      </div>
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <input type="text" name= "text" placeholder="ask me anything..." />
          <button>
            <img src="/arrow.png" alt="" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default DashboardPage;

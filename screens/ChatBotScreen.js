import React, { useState, useCallback, useEffect } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import { GoogleGenerativeAI, GoogleGenerativeAIError } from "@google/generative-ai";
import { SafeAreaView } from "react-native-safe-area-context";
import { GEMINI_API_KEY } from "@env"; 

export default function ChatBotScreen() {
    const[messages , setMessages]=useState([]);
    const genAI=new GoogleGenerativeAI(GEMINI_API_KEY);
    const model=genAI.getGenerativeModel({model: "gemini-1.5-flash"});

    useEffect(() => {
        setMessages([
            {
                _id:1,
                text: "Hello! I am your AI assistant \nHow can I help you today?",
                createdAt: new Date(),
                user: { _id: 2, name: "Bot", avatar: "https://i.imgur.com/7k12EPD.png" },
            },
        ]);
    },[]);

    const onSend=useCallback(async(newMessages = []) =>{
        const userMessage=newMessages[0];
        setMessages((prev)=>GiftedChat.append(prev,newMessages));

        try{
            const result=await model.generateContent(userMessage.text);
            const reply=result.response.text();

            const botMessage = {
                 _id: Math.random().toString(),
                  text: reply,
                  createdAt: new Date(),
                  user: { _id: 2, name: "Bot", avatar: "https://i.imgur.com/7k12EPD.png" },
            };
            setMessages((prev) => GiftedChat.append(prev, [botMessage]));
        } catch(error) {
            console.log("API Error: ",error);
            const errorMessage={
                 _id: Math.random().toString(),
                 text: "Oops! Something went wrong. Try again! ",
                 createdAt: new Date(),
                 user: { _id: 2 },
            };
            setMessages((prev) => GiftedChat.append(prev, [errorMessage]));
        }
    },[]);

    return(
        <SafeAreaView style={{flex:1, backgroundColor:"#e9e1e1ff"}}>
            <GiftedChat
              messages={messages}
              onSend={(msgs)=>onSend(msgs)}
              user={{ _id: 1 }}
              placeholder="Ask me anything..."
              />
        </SafeAreaView>
    );

}
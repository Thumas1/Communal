import React, { useRef, useState } from "react";
import { Button } from "src/components/Button";
import { Card } from "src/components/Card";
import { CardTitle } from "src/components/CardTitle";
import { Chat } from "src/pages/chats/Chat";
import { ChatsWrapper } from "src/pages/chats/ChatsWrapper";
import { addMessagesToChat } from "src/parse/addMessagesToChat";
import { theme } from "src/theme";
import styled from "styled-components";

export enum chatType {
  Private,
  Group,
}

export const ChatsPage = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [selectedChat, setSelectedChat] = useState<string>("B5LoAjTM1Y");

  const handleClick = () => {
    if (inputRef && inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleSend = async (chatid: string) => {
    if (inputRef && inputRef.current) {
      const result = await addMessagesToChat(chatid, inputRef.current.value);
      if (result) {
        inputRef.current.value = "";
      }
    }
  };

  return (
    <>
      <Card>
        <ChatTypeWrapper>
          <CardTitle style={{ padding: 0 }}>Common</CardTitle>
          <ChatsWrapper
            type={chatType.Group}
            chatId={selectedChat}
            setSelectedChat={setSelectedChat}
          />
        </ChatTypeWrapper>
        <ChatTypeWrapper>
          <CardTitle style={{ padding: 0 }}>Private</CardTitle>
          <ChatsWrapper
            type={chatType.Private}
            chatId={selectedChat}
            setSelectedChat={setSelectedChat}
          />
        </ChatTypeWrapper>
      </Card>
      <Card
        style={{
          gap: theme.flexGap.small,
          flexGrow: 1,
          alignItems: "flex-start",
          maxWidth: "750px",
        }}
      >
        {/* Make below dynamic (chat name) */}
        <CardTitle style={{ padding: 0 }}>Eric Cartman</CardTitle>
        <GrowContainer />
        <PaddingContainer>
          <OverflowContainer>
            <Chat id={selectedChat} />
          </OverflowContainer>
        </PaddingContainer>
        <InputContainer className="parent" onClick={handleClick}>
          <ChatInput ref={inputRef} />
          <Button
            color={theme.colors.cta}
            onClick={() => handleSend(selectedChat)}
          >
            Send
          </Button>
        </InputContainer>
      </Card>
    </>
  );
};

const ChatTypeWrapper = styled.div`
  gap: ${({ theme }) => theme.flexGap.small};
  display: flex;
  flex-direction: column;
  height: calc(50% - ${({ theme }) => theme.flexGap.small});
  width: 100%;
`;

const PaddingContainer = styled.div`
  overflow: hidden;
  padding: ${theme.padding.large} 0;
  width: 100%;
`;

const GrowContainer = styled.div`
  border-top: 1px solid ${theme.colors.tertiary};
  flex-grow: 1;
  width: 100%;
`;

const OverflowContainer = styled.div`
  height: 100%;
  overflow-y: auto;
`;

const ChatInput = styled.input`
  border: 0;
  color: ${({ theme }) => theme.colors.secondary};
  ::placeholder {
    color: ${({ theme }) => theme.colors.secondary};
    font-size: ${({ theme }) => theme.fontSize.medium};
  }
  resize: none;
  height: 100%;
  box-sizing: border-box;
  font-family: "SF Pro";
  flex-grow: 1;
  outline: none;
`;

const InputContainer = styled.div`
  padding: ${({ theme }) => `${theme.padding.medium} ${theme.padding.large}`};
  line-height: 0;
  width: 100%;
  box-sizing: border-box;
  border-radius: ${({ theme }) => theme.utils.borderRadius};
  border: 1px solid ${({ theme }) => theme.colors.tertiary};
  display: flex;
  align-content: center;
  gap: ${({ theme }) => theme.flexGap.medium};
  &:hover {
    cursor: text;
  }
`;

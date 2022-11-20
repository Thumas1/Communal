import React from "react";
import Avatar from "src/components/Avatar";
import Sharktooth from "src/components/Sharktooth";
import { theme } from "src/theme";
import styled from "styled-components";
import { messageType } from "./Chat";

const Wrapper = styled.div<{ type: messageType }>`
  display: flex;
  gap: ${({ theme }) => theme.flexGap.large};
  ${(props) =>
    props.type === messageType.Sent && "flex-direction: row-reverse;"}
`;

const MessageContainer = styled.div<{ type: messageType }>`
  border-radius: ${theme.utils.borderRadius};
  border: 1px solid ${theme.colors.tertiary};
  background-color: ${(props) =>
    props.type === messageType.Sent
      ? theme.colors.primary
      : theme.colors.white};
  padding: ${theme.padding.large};
  color: ${(props) =>
    props.type === messageType.Sent
      ? theme.colors.white
      : theme.colors.tertiary};
  max-width: 300px;
  font-size: ${theme.fontSize.medium};
  position: relative;
`;

const SharktoothContainer = styled.div<{ type: messageType }>`
  position: absolute;
  ${(props) => (props.type === messageType.Sent ? "right" : "left")}: -13px;
  ${(props) => props.type === messageType.Sent && "transform: rotate(180deg);"}
`;

export default function Message({ type }: { type: messageType }) {
  return (
    <Wrapper type={type}>
      <Avatar
        imageUrl="/img/EricCartman.png"
        altText="user-avatar"
        size={theme.avatarSize.medium}
      />

      <MessageContainer type={type}>
        <SharktoothContainer type={type}>
          <Sharktooth
            color={
              type === messageType.Sent
                ? theme.colors.primary
                : theme.colors.white
            }
            borderColor={theme.colors.tertiary}
          />
        </SharktoothContainer>
        Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Aenean
        lacinia bibendum nulla sed consectetur.
      </MessageContainer>
    </Wrapper>
  );
}

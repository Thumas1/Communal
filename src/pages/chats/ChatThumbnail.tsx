import { theme } from "src/theme";
import styled from "styled-components";
import Avatar from "../../components/Avatar";

export const ChatThumbnail = ({
  id,
  selected,
  onClick,
  name,
  avatarUrl,
  lastMessage,
}: ChatThumbnailProps) => {
  // TODO: Get the chat data from the database from id

  return (
    <ThumbnailContainer selected={selected} onClick={onClick} key={id}>
      <Avatar
        imageUrl={avatarUrl}
        altText="user-picture"
        size={theme.avatarSize.medium}
      />
      <TextContainer>
        <UpperTextContainer>
          <Name selected={selected}>{name}</Name>
          <LastMessageTime>Now</LastMessageTime>
        </UpperTextContainer>
        <Message>{lastMessage}</Message>
      </TextContainer>
    </ThumbnailContainer>
  );
};

// TODO: fix IDE errors
const ThumbnailContainer = styled.div<{ selected: boolean }>`
  cursor: pointer;
  border-radius: ${({ theme }) => theme.utils.borderRadius};
  border: 1px solid ${({ theme }) => theme.colors.tertiary};
  padding: ${({ theme }) => theme.padding.medium}
    ${({ theme }) => theme.padding.large};
  display: flex;
  gap: ${({ theme }) => theme.flexGap.medium};
  background-color: ${({ theme }) =>
    (props) =>
      props.selected ? theme.colors.primary : theme.colors.white};
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 200px;
`;

const UpperTextContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

interface ChatThumbnailProps {
  id: string;
  selected: boolean;
  onClick: () => void;
  name: string;
  avatarUrl: string;
  lastMessage: string;
}

const Name = styled.p<{ selected: boolean }>`
  font-size: ${({ theme }) => theme.fontSize.medium};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  color: ${({ theme }) =>
    (props) =>
      props.selected ? theme.colors.white : theme.colors.tertiary};
  margin: 0;
`;

const LastMessageTime = styled.p`
  font-size: ${({ theme }) => theme.fontSize.medium};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.tertiary};
  margin: 0;
`;

const Message = styled.p`
  font-size: ${({ theme }) => theme.fontSize.small};
  font-weight: ${({ theme }) => theme.fontWeight.regular};
  color: ${({ theme }) => theme.colors.tertiary};
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  margin: 0;
`;

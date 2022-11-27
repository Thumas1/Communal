import Parse from "parse";
import { getObject } from "./getObject";
import { chatType } from "src/pages/chats/ChatsPage";

export const getChatsByUserId = async function (
  userid: string,
  type: chatType
) {
  try {
    const parseQuery = new Parse.Query("Chat");
    let user = await getObject("User", userid);
    parseQuery.equalTo("type", type === chatType.Group ? "group" : "private");
    parseQuery.equalTo("users", user);
    const chats = await parseQuery.find();

    return chats;
  } catch (error) {
    // Error can be caused by lack of value selection
    console.log(error);
    return [];
  }
};

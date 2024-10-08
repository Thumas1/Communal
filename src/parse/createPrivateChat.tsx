import Parse from "parse";
import { getObject } from "./getObject";

export const createPrivateChat = async (
  userIds: string[]
): Promise<boolean> => {
  try {
    let userArray: Parse.Object<Parse.Attributes>[] = [];
    let name = "";
    for (let index = 0; index < userIds.length; index++) {
      let user = await getObject("User", userIds[index]);
      if (user) {
        name += user?.attributes.username + " ";
        userArray.push(user);
      }
    }

    const chatTypeValue: string = "private";
    const chatNameValue: string = name;

    let chat: Parse.Object = new Parse.Object("Chat");
    chat.set("type", chatTypeValue);
    chat.set("name", chatNameValue);
    let chatRelation = chat.relation("users");
    chatRelation.add(userArray);

    try {
      let result = await chat.save();
      console.log(result);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
};

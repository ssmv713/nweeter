import { useState } from "react";

import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import styled from "styled-components";

import { auth, db, storage } from "../routes/firebase";
import { ITweet } from "./timeline";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
  padding: 20px;
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 15px;
`;

const Column = styled.div``;

const Photo = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 15px;
`;

const Username = styled.span`
  font-weight: 600;
  font-size: 15px;
`;

const Payload = styled.p`
  margin: 10px 0;
  font-size: 18px;
`;

const EditPayload = styled.textarea`
  width: 80%;
  margin: 10px 0;
  font-size: 18px;
  margin-right: 12px;
  display: block;
  resize: none;
`;

const DeleteButton = styled.button`
  background-color: tomato;
  color: white;
  font-weight: 600;
  border: 0;
  font-size: 12px;
  padding: 5px 10px;
  text-transform: uppercase;
  border-radius: 5px;
  cursor: pointer;
`;
const EditButton = styled.button`
  background-color: #1fab57;
  color: white;
  font-weight: 600;
  border: 0;
  font-size: 12px;
  padding: 5px 10px;
  text-transform: uppercase;
  border-radius: 5px;
  margin-left: 10px;
  cursor: pointer;
`;

export default function Tweet({ username, photo, tweet, userId, id }: ITweet) {
  const [edit, setEdit] = useState(false);

  const user = auth.currentUser;
  const onDelete = async () => {
    const ok = confirm("정말로 삭제하시겠습니까?");

    if (!ok || user?.uid !== userId) return;
    try {
      await deleteDoc(doc(db, "tweets", id));
      if (photo) {
        const photoRef = ref(storage, `tweets/${user.uid}/${id}`);
        await deleteObject(photoRef);
      }
    } catch (e) {
      console.log(e);
    } finally {
      //}
    }
  };

  const onEdit = () => {
    setEdit(true);
  };
  const [editedValue, setEditedValue] = useState(tweet);
  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditedValue(e.target.value);
  };
  const onSave = async () => {
    if (editedValue == "") return;
    try {
      await updateDoc(doc(db, "tweets", id), {
        tweet: editedValue,
      });
      setEdit(false);
    } catch (e) {
      console.log(e);
    } finally {
      //}
    }
  };
  return (
    <Wrapper>
      <Column>
        <Username>{username}</Username>
        {edit ? (
          <EditPayload value={editedValue} onChange={onChange}></EditPayload>
        ) : (
          <Payload>{tweet}</Payload>
        )}
        {user?.uid === userId ? (
          <>
            <DeleteButton onClick={onDelete}>Delete</DeleteButton>
            {edit ? (
              <EditButton onClick={onSave}>Save</EditButton>
            ) : (
              <EditButton onClick={onEdit}>Edit</EditButton>
            )}
          </>
        ) : null}
      </Column>
      {photo ? (
        <Column>
          <Photo src={photo} />
        </Column>
      ) : null}
    </Wrapper>
  );
}

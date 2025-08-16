import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { db, auth } from '../../../firebaseconfig';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  orderBy,
  onSnapshot,
  addDoc,
  serverTimestamp
} from 'firebase/firestore';

const GroupPage = () => {
  const { groupId } = useParams();
  const [group, setGroup] = useState(null);
  const [members, setMembers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState('');
  const [indexError, setIndexError] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Fetch group info & members
  useEffect(() => {
    const fetchGroup = async () => {
      try {
        const groupRef = doc(db, 'groups', groupId);
        const groupSnap = await getDoc(groupRef);

        if (groupSnap.exists()) {
          const data = groupSnap.data();
          setGroup({ id: groupSnap.id, ...data });

          const usersSnap = await getDocs(collection(db, 'users'));
          const usersData = usersSnap.docs
            .map(d => ({ id: d.id, ...d.data() }))
            .filter(u => data.members.includes(u.uid));
          setMembers(usersData);
        } else {
          console.error("Group not found!");
        }
      } catch (err) {
        console.error("Error fetching group:", err);
      }
    };

    fetchGroup();
  }, [groupId]);

  // Realtime messages with fallback
  useEffect(() => {
    if (!groupId) return;

    const messagesRef = collection(db, 'groupLoans');

    const q = query(
      messagesRef,
      where('groupId', '==', groupId),
      orderBy('createdAt', 'asc')
    );

    const unsubscribe = onSnapshot(q, snapshot => {
      const msgs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setMessages(msgs);
      scrollToBottom();
      setIndexError(false);
    }, async (err) => {
      console.error("Snapshot error:", err);

      if (err.code === 'failed-precondition' || err.code === 'permission-denied') {
        // likely missing index
        setIndexError(true);

        // Fallback: fetch messages without orderBy
        const fallbackQuery = query(messagesRef, where('groupId', '==', groupId));
        const snap = await getDocs(fallbackQuery);
        const fallbackMsgs = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        console.log("Fallback messages:", fallbackMsgs);
        setMessages(fallbackMsgs);
      }
    });

    return () => unsubscribe();
  }, [groupId]);

  const sendMessage = async () => {
    if (!messageText.trim()) return;

    try {
      await addDoc(collection(db, 'groupLoans'), {
        groupId,
        addedBy: auth.currentUser.uid,
        description: messageText,
        createdAt: serverTimestamp()
      });
      setMessageText('');
    } catch (err) {
      console.error("Error sending message:", err);
    }
  };

  if (!group) return <p>Loading group...</p>;

  return (
    <div style={{ maxWidth: '600px', margin: '20px auto', padding: '10px', display: 'flex', flexDirection: 'column', height: '80vh', border: '1px solid #ccc', borderRadius: '10px' }}>
      <h2>{group.name}</h2>
      <p>Members: {members.map(m => m.username).join(', ')}</p>

      {indexError && (
        <p style={{ color: 'red', textAlign: 'center' }}>
          Firestore index missing for messages. Showing unsorted messages. Please create the index <a href="https://console.firebase.google.com/" target="_blank" rel="noreferrer">here</a>.
        </p>
      )}

      <div style={{ flex: 1, overflowY: 'auto', padding: '10px', border: '1px solid #eee', borderRadius: '8px', marginBottom: '10px', display: 'flex', flexDirection: 'column' }}>
        {messages.length === 0 && <p style={{ textAlign: 'center', color: '#666' }}>No messages yet</p>}
        {messages.map(msg => {
          const user = members.find(m => m.uid === msg.addedBy);
          const isCurrentUser = msg.addedBy === auth.currentUser.uid;

          return (
            <div key={msg.id} style={{
              marginBottom: '10px',
              backgroundColor: isCurrentUser ? '#DCF8C6' : '#ebe2e2ff',
              padding: '8px',
              borderRadius: '8px',
              alignSelf: isCurrentUser ? 'flex-end' : 'flex-start',
              maxWidth: '80%'
            }}>
              <p style={{ margin: 0, fontWeight: 'bold' }}>{user?.username || 'Unknown'}</p>
              <p style={{ margin: 0 }}>{msg.description}</p>
              <p style={{ fontSize: '10px', color: '#666', textAlign: 'right' }}>
                {msg.createdAt?.toDate ? msg.createdAt.toDate().toLocaleString() : new Date().toLocaleString()}
              </p>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      <div style={{ display: 'flex', gap: '5px' }}>
        <input
          type="text"
          value={messageText}
          onChange={e => setMessageText(e.target.value)}
          placeholder="Type a message..."
          style={{ flex: 1, padding: '8px', borderRadius: '20px', border: '1px solid #ccc' }}
          onKeyDown={e => e.key === 'Enter' && sendMessage()}
        />
        <button onClick={sendMessage} style={{ padding: '8px 15px', borderRadius: '20px', backgroundColor: '#1E90FF', color: '#fff', border: 'none' }}>Send</button>
      </div>
    </div>
  );
};

export default GroupPage;

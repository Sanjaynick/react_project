import React, { useEffect, useState } from 'react';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { db, auth } from '../../../firebaseconfig';

const CreateGroup = () => {
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [groupName, setGroupName] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch all registered users
  useEffect(() => {
    const fetchUsers = async () => {
      const snapshot = await getDocs(collection(db, 'users'));
      const usersArray = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setUsers(usersArray.filter(u => u.uid !== auth.currentUser.uid)); // exclude current user
      setLoading(false);
    };
    fetchUsers();
  }, []);

  // Handle checkbox selection
  const toggleUser = (uid) => {
    setSelectedUsers(prev => 
      prev.includes(uid) ? prev.filter(id => id !== uid) : [...prev, uid]
    );
  };

  // Handle Create Group
  const handleCreateGroup = async () => {
    if (!groupName) return alert("Enter group name");
    if (selectedUsers.length === 0) return alert("Select at least one member");

    try {
      await addDoc(collection(db, 'groups'), {
        name: groupName,
        createdBy: auth.currentUser.uid,
        members: [auth.currentUser.uid, ...selectedUsers], // include admin
        createdAt: new Date()
      });

      setGroupName("");
      setSelectedUsers([]);
      alert("Group created successfully!");
    } catch (error) {
      console.error("Error creating group:", error);
    }
  };

  if (loading) return <p>Loading users...</p>;

  return (
    <div style={{ maxWidth: '500px', margin: '20px auto', padding: '10px', border: '1px solid #ccc', borderRadius: '10px' }}>
      <h2>Create Group</h2>
      <input
        type="text"
        placeholder="Enter group name"
        value={groupName}
        onChange={e => setGroupName(e.target.value)}
        style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
      />

      <h3>Select Members</h3>
      <div style={{ maxHeight: '200px', overflowY: 'auto', border: '1px solid #ddd', padding: '5px', marginBottom: '10px' }}>
        {users.map(user => (
          <div key={user.uid}>
            <label>
              <input
                type="checkbox"
                checked={selectedUsers.includes(user.uid)}
                onChange={() => toggleUser(user.uid)}
              />
              <span style={{ marginLeft: '5px' }}>{user.username} ({user.email})</span>
            </label>
          </div>
        ))}
      </div>

      <button onClick={handleCreateGroup} style={{ padding: '8px 16px', backgroundColor: '#1E90FF', color: '#fff', border: 'none', borderRadius: '5px' }}>
        Create Group
      </button>
    </div>
  );
};

export default CreateGroup;

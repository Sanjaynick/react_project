import React, { useEffect, useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db, auth } from '../../../firebaseconfig';
import { Link } from 'react-router-dom';

const GroupsList = () => {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        // Get groups where current user is a member
        const q = query(
          collection(db, 'groups'),
          where('members', 'array-contains', auth.currentUser.uid)
        );
        const snapshot = await getDocs(q);
        const groupsArray = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setGroups(groupsArray);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching groups:", error);
      }
    };

    fetchGroups();
  }, []);

  if (loading) return <p>Loading groups...</p>;

  return (
    <div style={{ maxWidth: '600px', margin: '20px auto', padding: '10px' }}>
      <h2>Your Groups</h2>
      {groups.length === 0 && <p>You are not in any group yet.</p>}
      <ul>
        {groups.map(group => (
          <li key={group.id} style={{ marginBottom: '10px', border: '1px solid #ddd', padding: '10px', borderRadius: '8px' }}>
            <Link to={`/group/${group.id}`} style={{ textDecoration: 'none', color: '#333' }}>
              <strong>{group.name}</strong>
              <p style={{ fontSize: '12px', color: '#666' }}>Members: {group.members.length}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GroupsList;

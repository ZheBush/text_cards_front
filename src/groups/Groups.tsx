import React, { useState, useEffect, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext.tsx';
import { Group } from '../types';

interface GroupUser {
  id: string;
  email: string;
  role_in_group: string;
}

interface CardList {
  id: string;
  title: string;
  cards_count: number;
}

const Groups: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [cardsNum, setCardsNum] = useState(5);
  const [groups, setGroups] = useState<Group[]>([]);
  const [newGroupName, setNewGroupName] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
  const [groupUsers, setGroupUsers] = useState<GroupUser[]>([]);
  const [groupCardLists, setGroupCardLists] = useState<CardList[]>([]);
  const [newUserId, setNewUserId] = useState('');
  const [newCardListTitle, setNewCardListTitle] = useState('');
  const [newCardListText, setNewCardListText] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileType, setFileType] = useState<'text' | 'txt' | 'pdf'>('text');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchGroups();
  }, []);

  const fetchGroups = async () => {
    try {
      const token = localStorage.getItem('access_token');
      const response = await fetch('/groups/my', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      setGroups(data);
    } catch (error) {
      console.error('Error fetching groups:', error);
    }
  };

  const createGroup = async () => {
    if (!newGroupName.trim()) return;
    try {
      const token = localStorage.getItem('access_token');
      const response = await fetch('/groups/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ name: newGroupName })
      });
      if (response.ok) {
        setNewGroupName('');
        fetchGroups();
      }
    } catch (error) {
      console.error('Error creating group:', error);
    }
  };

  const openManageModal = async (group: Group) => {
    setSelectedGroup(group);
    await Promise.all([
      fetchGroupUsers(group.id),
      fetchGroupCardLists(group.id)
    ]);
    setIsOpen(true);
  };

  const fetchGroupUsers = async (groupId: string) => {
    try {
      const token = localStorage.getItem('access_token');
      const response = await fetch(`/groups/${groupId}/users`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      setGroupUsers(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching group users:', error);
    }
  };

  const fetchGroupCardLists = async (groupId: string) => {
    try {
      const token = localStorage.getItem('access_token');
      const response = await fetch(`/groups/${groupId}/card_lists`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      setGroupCardLists(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching card lists:', error);
    }
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedGroup(null);
    setGroupUsers([]);
    setGroupCardLists([]);
  };

  const addUserToGroup = async () => {
    if (!newUserId.trim() || !selectedGroup) return;
    try {
      const token = localStorage.getItem('access_token');
      const response = await fetch(`/groups/${selectedGroup.id}/add_user`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ user_id: newUserId, role_in_group: 'member' })
      });
      if (response.ok) {
        setNewUserId('');
        await fetchGroupUsers(selectedGroup.id);
        await fetchGroups(); 
      }
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  const removeUserFromGroup = async (userId: string) => {
    if (!selectedGroup) return;
    try {
      const token = localStorage.getItem('access_token');
      const response = await fetch(`/groups/${selectedGroup.id}/remove_user/${userId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        await fetchGroupUsers(selectedGroup.id);
        await fetchGroups();
      }
    } catch (error) {
      console.error('Error removing user:', error);
    }
  };

  const addCardListToGroup = async () => {
    if (!newCardListTitle.trim() || !selectedGroup) return;
    if (fileType === 'text' && !newCardListText.trim()) return;
    if ((fileType === 'txt' || fileType === 'pdf') && !selectedFile) return;

    setIsLoading(true);
    try {
      const token = localStorage.getItem('access_token');
      const formData = new FormData();
      formData.append('title', newCardListTitle);
      formData.append('cards_num', cardsNum.toString());
      formData.append('group_id', selectedGroup.id);

      let url = '/card_lists/upload_text';
      if (fileType === 'text') {
        formData.append('text', newCardListText);
      } else if (fileType === 'txt') {
        url = '/card_lists/upload_txt';
        formData.append('file', selectedFile!);
      } else if (fileType === 'pdf') {
        url = '/card_lists/upload_pdf';
        formData.append('file', selectedFile!);
      }

      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData
      });

      if (response.ok) {
        setNewCardListTitle('');
        setNewCardListText('');
        setSelectedFile(null);
        setCardsNum(5);
        await fetchGroupCardLists(selectedGroup.id);
      }
    } catch (error) {
      console.error('Error adding card list:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', padding: '32px' }}>
      <h1 style={{ fontSize: '24px', marginBottom: '16px' }}>My Groups</h1>
      
      {user?.role === 'manager' && (
        <div style={{ display: 'flex', marginBottom: '24px', gap: '8px' }}>
          <input
            placeholder="New group name"
            value={newGroupName}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setNewGroupName(e.target.value)}
            style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px', flex: 1 }}
          />
          <button 
            onClick={createGroup} 
            style={{ 
              backgroundColor: 'rgb(4,120,87)', 
              color: 'white', 
              padding: '8px 16px', 
              border: 'none', 
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Create
          </button>
        </div>
      )}
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {groups.map(group => (
          <div key={group.id} style={{ padding: '16px', border: '1px solid #ccc', borderRadius: '8px' }}>
            <p style={{ fontWeight: 'bold', margin: '0 0 8px 0' }}>{group.name}</p>
            <p style={{ margin: '0 0 8px 0' }}>Members: {group.members_count || 0}</p>
            <button 
              onClick={() => openManageModal(group)}
              style={{
                padding: '4px 8px',
                backgroundColor: 'rgb(4,120,87)',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Manage
            </button>
          </div>
        ))}
      </div>

      {isOpen && selectedGroup && (
        <div style={{ 
          position: 'fixed', 
          top: 0, 
          left: 0, 
          width: '100%', 
          height: '100%', 
          backgroundColor: 'rgba(0,0,0,0.5)', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{ 
            backgroundColor: 'white', 
            padding: '24px', 
            borderRadius: '8px', 
            maxWidth: '600px', 
            width: '90%',
            maxHeight: '80vh',
            overflowY: 'auto'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h2 style={{ fontSize: '20px', margin: 0 }}>Manage Group: {selectedGroup.name}</h2>
              <button 
                onClick={closeModal}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '18px',
                  cursor: 'pointer',
                  padding: '4px 8px'
                }}
              >
                ✕
              </button>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {/* Members Section */}
              <div>
                <h3 style={{ fontSize: '16px', marginBottom: '8px' }}>Members:</h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {groupUsers.map(u => (
                    <li key={u.id} style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center',
                      padding: '8px',
                      borderBottom: '1px solid #eee'
                    }}>
                      <span>{u.email} ({u.role_in_group})</span>
                      <button 
                        onClick={() => removeUserFromGroup(u.id)}
                        style={{
                          padding: '4px 8px',
                          backgroundColor: '#dc3545',
                          color: 'white',
                          border: 'none',
                          borderRadius: '4px',
                          cursor: 'pointer'
                        }}
                      >
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
                
                <div style={{ display: 'flex', marginTop: '16px', gap: '8px' }}>
                  <input
                    placeholder="User ID"
                    value={newUserId}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setNewUserId(e.target.value)}
                    style={{ 
                      flex: 1,
                      padding: '8px',
                      border: '1px solid #ccc',
                      borderRadius: '4px'
                    }}
                  />
                  <button 
                    onClick={addUserToGroup}
                    style={{
                      padding: '8px 16px',
                      backgroundColor: 'rgb(4,120,87)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer'
                    }}
                  >
                    Add User
                  </button>
                </div>
              </div>

              {/* Card Lists Section */}
              <div>
                <h3 style={{ fontSize: '16px', marginBottom: '8px' }}>Card Lists:</h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {groupCardLists.map(cl => (
                    <li 
                      key={cl.id} 
                      onClick={() => navigate('/cards', { state: { cardListId: cl.id, title: cl.title } })}
                      style={{ 
                        padding: '8px', 
                        borderBottom: '1px solid #eee', 
                        cursor: 'pointer',
                        ':hover': { backgroundColor: '#f5f5f5' }
                      }}
                    >
                      {cl.title} ({cl.cards_count} cards)
                    </li>
                  ))}
                </ul>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '16px' }}>
                  <input
                    placeholder="Card List Title"
                    value={newCardListTitle}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setNewCardListTitle(e.target.value)}
                    style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
                  />
                  <select 
                    value={fileType} 
                    onChange={(e) => setFileType(e.target.value as 'text' | 'txt' | 'pdf')}
                    style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
                  >
                    <option value="text">Text</option>
                    <option value="txt">TXT File</option>
                    <option value="pdf">PDF File</option>
                  </select>
                  {fileType === 'text' && (
                    <textarea
                      placeholder="Text for cards"
                      value={newCardListText}
                      onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setNewCardListText(e.target.value)}
                      style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px', minHeight: '80px' }}
                    />
                  )}
                  {(fileType === 'txt' || fileType === 'pdf') && (
                    <input
                      type="file"
                      accept={fileType === 'txt' ? '.txt' : '.pdf'}
                      onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                      style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
                    />
                  )}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span>Cards number:</span>
                    <input
                      type="number"
                      min="1"
                      max="20"
                      value={cardsNum}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => setCardsNum(parseInt(e.target.value) || 5)}
                      style={{ 
                        width: '80px',
                        padding: '4px',
                        border: '1px solid #ccc',
                        borderRadius: '4px'
                      }}
                    />
                    <button
                      onClick={addCardListToGroup}
                      disabled={isLoading}
                      style={{
                        padding: '8px 16px',
                        backgroundColor: isLoading ? '#ccc' : 'rgb(4,120,87)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: isLoading ? 'not-allowed' : 'pointer'
                      }}
                    >
                      {isLoading ? 'Generating...' : 'Add Card List'}
                    </button>
                  </div>
                  {isLoading && (
                    <div style={{ color: 'blue', fontStyle: 'italic' }}>
                      Generating cards, please wait...
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '24px' }}>
              <button 
                onClick={closeModal}
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#6c757d',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Groups;
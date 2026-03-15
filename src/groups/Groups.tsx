import React, { useState, useEffect } from 'react';
import { Flex, Text, Input, Button, VStack, HStack, Box } from '@chakra-ui/react';
import { useAuth } from '../AuthContext.tsx';
import { Group } from '../types';

const Groups: React.FC = () => {
  const { user } = useAuth();
  const [groups, setGroups] = useState<Group[]>([]);
  const [newGroupName, setNewGroupName] = useState('');

  useEffect(() => {
    fetchGroups();
  }, []);

  const fetchGroups = async () => {
    const token = localStorage.getItem('access_token');
    const response = await fetch('/groups/my', {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const data = await response.json();
    setGroups(data);
  };

  const createGroup = async () => {
    if (!newGroupName.trim()) return;
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
  };

  return (
    <Flex direction="column" p={8}>
      <Text fontSize={24} mb={4}>My Groups</Text>
      {user?.role === 'manager' && (
        <HStack mb={6}>
          <Input 
            placeholder="New group name" 
            value={newGroupName} 
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewGroupName(e.target.value)}
          />
          <Button onClick={createGroup} bg="rgb(4,120,87)" color="white">Create</Button>
        </HStack>
      )}
      <VStack gap={4} align="stretch">
        {groups.map(group => (
          <Box key={group.id} p={4} borderWidth="1px" borderRadius="lg">
            <Text fontWeight="bold">{group.name}</Text>
            <Text>Members: {group.members_count || 0}</Text>
            <Button size="sm" mt={2}>Manage</Button>
          </Box>
        ))}
      </VStack>
    </Flex>
  );
};

export default Groups;
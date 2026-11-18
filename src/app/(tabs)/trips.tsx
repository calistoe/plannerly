import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { Screen, GlassCard, Button, Input, Modal, AvatarStack, Title, Muted } from '@/components/ui';
import { supabase } from '@/lib/supabase';

// Day 1 preview screen: proves the theme, components and database connection work.
export default function Trips() {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState('Not tested yet');
  const people = [{ name: 'Soleil De Castro' }, { name: 'Gehlee' }, { name: 'Jhai' }, { name: 'Reema' }, { name: 'Aldrin' }];

  async function testConnection() {
    setStatus('Testing…');
    const { error } = await supabase.from('trips').select('id').limit(1);
    setStatus(error ? '❌ ' + error.message : '✅ Connected to Supabase');
  }

  return (
    <Screen>
      <Title light>Hey there, Soleil</Title>
      <Muted>Where to escape next?</Muted>
      <View style={{ height: 16 }} />
      <GlassCard>
        <Title>VIETNAM 2027</Title>
        <Muted>Start: 10/20/2027 · End: 10/30/2027</Muted>
        <View style={{ height: 12 }} />
        <AvatarStack people={people} />
      </GlassCard>
      <GlassCard>
        <Text style={{ fontFamily: 'Poppins_500Medium', marginBottom: 12 }}>{status}</Text>
        <Button title="Test database connection" onPress={testConnection} />
        <View style={{ height: 10 }} />
        <Button title="Open trip popup" variant="ghost" onPress={() => setOpen(true)} />
      </GlassCard>
      <Modal visible={open} onClose={() => setOpen(false)} title="Plan your dream trip">
        <Input label="Trip name" placeholder="Vietnam 2027" />
        <Input label="Destination" placeholder="Da Nang" />
        <Button title="Add this trip" onPress={() => setOpen(false)} />
      </Modal>
    </Screen>
  );
}
